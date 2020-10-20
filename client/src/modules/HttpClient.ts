import fetch from "node-fetch";
import { Movie } from "../types/DatabaseTypes";

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public get<T>(url: string): Promise<T> {
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        return res as T;
      });
  }

  public getMovie(movieId: string): Promise<Movie> {
    return this.get<Movie[]>(this.baseURL + "/movies/" + movieId).then(
      (response) => {
        return response[0];
      }
    );
  }

  public searchMovies(searchString: string, page: number): Promise<Movie[]> {
    const searchURL =
      this.baseURL + "/movie?title=" + searchString + "&page=" + page;
    return this.get<Movie[]>(searchURL).then((response) => {
      return response;
    });
  }
}

export default HttpClient;

//Example

//Initialize client
const baseURL = "http://it2810-22.idi.ntnu.no:3000";
const client = new HttpClient(baseURL);

//Ask for movie
const movie = client.getMovie("tt0000001");
movie.then((response) => {
  console.log(response);
});

//Search for movies with title containing "Black"
const search = client.searchMovies("Black", 1);
search.then((response) => {
  console.log(response);
});
