import fetch from "node-fetch";
import { Movie, User, Like } from "../types/DatabaseTypes";

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Generic Functions
  public get<T>(url: string): Promise<T | null> {
    return fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        return res as T;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  public delete<T>(url: string): Promise<T | null> {
    return fetch(url, { method: "DELETE" })
      .then((res) => res.json())
      .then((res) => {
        return res as T;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  public put<T>(url: string): Promise<T | null> {
    return fetch(url, { method: "PUT" })
      .then((res) => res.json())
      .then((res) => {
        return res as T;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  // Spesific functions
  // Optionally supply a username to get liked status for said user
  public getMovie(movieId: string, username?: string): Promise<Movie> {
    let searchURL = this.baseURL + "/movie/" + movieId;
    if (username) {
      searchURL += "?" + username;
    }
    return this.get<Movie[]>(searchURL).then((response) => {
      return (response as Movie[])[0];
    });
  }

  // Argument is an object
  public searchMovies(args: {
    title?: string;
    genre?: string;
    minYear?: number;
    maxYear?: number;
    username?: string;
    page?: number;
    orderBy?:
      | "tconst"
      | "title_type"
      | "primary_title"
      | "original_title"
      | "is_adult"
      | "start_year"
      | "end_year"
      | "runtime_minutes"
      | "genres";
    orderDir?: "DESC" | "ASC";
  }): Promise<Movie[]> {
    let searchURL = this.baseURL + "/movie";
    let delimiter = "?";
    if (args.title) {
      searchURL += delimiter + "title=" + args.title;
      delimiter = "&";
    }
    if (args.genre) {
      searchURL += delimiter + "genre=" + args.genre;
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
      searchURL += delimiter + "orderBy" + args.orderBy;
      delimiter = "&";
    }
    if (args.orderDir) {
      searchURL += delimiter + "orderDir" + args.orderDir;
      delimiter = "&";
    }
    if (args.page) {
      searchURL += delimiter + "page=" + args.page;
      delimiter = "&";
    }
    if (args.username) {
      searchURL += delimiter + "userId=" + args.username;
    }
    return this.get<Movie[]>(searchURL).then((response) => {
      return response as Movie[];
    });
  }

  public likeMovie(movieId: string, username: string) {
    return this.put<Like[]>(
      this.baseURL + "/user/" + username + "/LikedMovies/" + movieId
    ).then((response) => {
      return (response as Like[])[0];
    });
  }

  public unlikeMovie(movieId: string, username: string) {
    return this.delete<Like[]>(
      this.baseURL + "/user/" + username + "/LikedMovies/" + movieId
    ).then((response) => {
      return (response as Like[])[0];
    });
  }

  public createUser(username: string) {
    return this.put<User[]>(this.baseURL + "/user/" + username).then(
      (response) => {
        return (response as User[])[0];
      }
    );
  }

  public deleteUser(username: string) {
    return this.delete<User[]>(this.baseURL + "/user/" + username).then(
      (response) => {
        return (response as User[])[0];
      }
    );
  }
}

export default HttpClient;

//Examples

//Initialize client
const baseURL = "http://it2810-22.idi.ntnu.no:3000";
const client = new HttpClient(baseURL);

//Create user
client.createUser("testUser");

//Like a movie
client.likeMovie("tt0000001", "testUser");

//Ask for movie
const movie = client.getMovie("tt0000001", "testUser");
movie.then((response) => {
  console.log(response);
});

//Search for movies with title containing "Black"
//and year between 2000 and 2010
//order by year descending
//Returning page 1 (20 entries per page)
const search = client.searchMovies({
  title: "Black",
  minYear: 2000,
  maxYear: 2010,
  orderBy: "start_year",
  orderDir: "DESC",
});
search.then((response) => {
  console.log(response);
});

client.deleteUser("testUser");
