import fetch, { Response } from "node-fetch";
import { Like, Movie, User } from "../types/DatabaseTypes";

/**
 * A custom error for response codes that are not 2xx
 *
 * @extends Error
 */
class HttpRequestError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.name = "HttpRequestError";
        this.message = message;
        this.statusCode = statusCode;
    }
}

// Object containing search parameters
// See README for more information
type SearchParameters = {
    title?: string;
    titleType?: string;
    minYear?: number;
    maxYear?: number;
    username?: string;
    page?: number;
    orderBy?: string;
    orderDir?: string;
};

class HttpClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    // Helper Functions
    /**
     * Checks the response code and throws an error if it is not 2xx.
     * Otherwise it just returns the response.
     *
     * @param {Response} response - Object that represents the HTTP response
     * @throws {HttpRequestError} - Error Object
     */
    public checkStatus(response: Response) {
        if (response.ok) {
            return response;
        } else {
            throw new HttpRequestError(response.status, response.statusText);
        }
    }

    // Generic Functions
    /**
     * Sends a get request to the specified url
     * and returns a promise of a result
     * with the expected type.
     * Throws an error if the url can't be reached
     * or the response code is not 2xx
     *
     * @template T - The expected type of the response
     * @param {string} url - The url to send the request to
     * @return {Promise<T>} The promise of a response
     */
    public get<T>(url: string): Promise<T> {
        return fetch(url, { method: "GET" })
            .then(this.checkStatus)
            .then((response) => response.json())
            .then((response) => {
                return response as T;
            });
    }

    /**
     * Sends a delete request to the specified url
     * and returns a promise of a result
     * with the expected type.
     * Throws an error if the url can't be reached
     * or the response code is not 2xx
     *
     * @template T - The expected type of the response
     * @param {string} url - The url to send the request to
     * @return {Promise<T>} The promise of a response
     */
    public delete<T>(url: string): Promise<T> {
        return fetch(url, { method: "DELETE" })
            .then(this.checkStatus)
            .then((response) => response.json())
            .then((response) => {
                return response as T;
            });
    }

    /**
     * Sends a put request to the specified url
     * and returns a promise of a result
     * with the expected type.
     * Throws an error if the url can't be reached
     * or the response code is not 2xx
     *
     * @template T - The expected type of the response
     * @param {string} url - The url to send the request to
     * @return {Promise<T>} The promise of a response
     */
    public put<T>(url: string): Promise<T> {
        return fetch(url, { method: "PUT" })
            .then(this.checkStatus)
            .then((response) => response.json())
            .then((response) => {
                return response as T;
            });
    }

    // Specific functions

    /**
     * Gets a spesific movie.
     *
     * @param {string} movieId - The id of the movie. e.g "tt9655334"
     * @param {string} [username] - Optionally supply a username to get liked status
     * @return {Promise<Movie>} The promise of a Movie
     */
    public getMovie(movieId: string, username?: string): Promise<Movie> {
        let searchURL = this.baseURL + "/movie/" + movieId;
        if (username) {
            searchURL += "?username=" + username;
        }
        return this.get<Movie[]>(searchURL).then((response) => {
            return (response as Movie[])[0];
        });
    }

    /**
     * Searches for Movies
     *
     * @param {SearchParameters} args - Arguments for the search. See README for more information.
     * @return {Promise<Movie[]>} The promise of a list of movies
     */
    public searchMovies(args: SearchParameters): Promise<Movie[]> {
        // Build query from arguments
        let searchURL = this.baseURL + "/movie";
        let delimiter = "?";
        if (args.title) {
            searchURL += delimiter + "title=" + args.title;
            delimiter = "&";
        }
        if (args.titleType) {
            searchURL += delimiter + "titleType=" + args.titleType;
            delimiter = "&";
        }
        if (args.minYear) {
            searchURL += delimiter + "minYear=" + args.minYear;
            delimiter = "&";
        }
        if (args.maxYear) {
            searchURL += delimiter + "maxYear=" + args.maxYear;
            delimiter = "&";
        }
        if (args.orderBy) {
            searchURL += delimiter + "orderBy=" + args.orderBy;
            delimiter = "&";
        }
        if (args.orderDir) {
            searchURL += delimiter + "orderDir=" + args.orderDir;
            delimiter = "&";
        }
        if (args.page) {
            searchURL += delimiter + "page=" + args.page;
            delimiter = "&";
        }
        if (args.username) {
            searchURL += delimiter + "username=" + args.username;
        }
        // Send query and return response
        return this.get<Movie[]>(searchURL).then((response) => {
            return response as Movie[];
        });
    }

    /**
     * Likes a movie for a user.
     * Returns the updated status.
     *
     * @param {string} movieId - Id of the movie to like. e.g "tt9655334"
     * @param {string} username - The user to like the movie for
     * @return {Promise<Like>} Promise of a response with the updated like status
     */
    public likeMovie(movieId: string, username: string): Promise<Like> {
        return this.put<Like[]>(
            this.baseURL + "/user/" + username + "/LikedMovies/" + movieId
        ).then((response) => {
            return (response as Like[])[0];
        });
    }

    /**
     * Unlikes a movie for a user.
     * Returns the updated status.
     *
     * @param {string} movieId - Id of the movie to unlike. e.g "tt9655334"
     * @param {string} username - The user to unlike the movie for
     * @return {Promise<Like>} Promise of a response with the updated like status
     */
    public unlikeMovie(movieId: string, username: string): Promise<Like> {
        return this.delete<Like[]>(
            this.baseURL + "/user/" + username + "/LikedMovies/" + movieId
        ).then((response) => {
            return (response as Like[])[0];
        });
    }

    /**
     * Gets a list with all the liked movies for a user.
     *
     * @param {string} username - The user to get liked moves for
     * @return {Promise<Movie[]>} The promise of a list of the liked movies
     */
    public getLikedMovies(username: string): Promise<Movie[]> {
        return this.get<Movie[]>(
            this.baseURL + "/user/" + username + "/LikedMovies/"
        ).then((response) => {
            return response as Movie[];
        });
    }

    /**
     * Checks if the username already exists on the server.
     * If the username doesn't exist, request to create the user.
     * Return the user on success.
     *
     * @param {string} username - The username to check/create
     * @return {Promise<User>} The promise of a user
     */
    public loginOrCreateUser(username: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.get<User[]>(this.baseURL + "/user/" + username)
                .then((users) => resolve(users[0] as User))
                .catch((error) => {
                    this.put<User[]>(this.baseURL + "/user/" + username)
                        .then((users) => {
                            resolve(users[0] as User);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
        });
    }

    /**
     * Deletes a user.
     * Throws HttpRequestError if the user doesn't exist.
     * Returns the deleted user on success.
     *
     * @param {string} username - The username to delete
     * @return {Promise<User>} The promise of a deleted user
     */
    public deleteUser(username: string): Promise<User> {
        return this.delete<User[]>(this.baseURL + "/user/" + username).then(
            (response) => {
                return response[0] as User;
            }
        );
    }
}

// The url of the server
const baseURL = "http://it2810-22.idi.ntnu.no:3000";

// Construct and export the client
export default new HttpClient(baseURL);
