# Project 3 Group 22

## Moldules

### HttpClient

The REST server runs on `it2810-22.idi.ntnu.no:3000`, and its source code is
found in `/server/`.

The main module used to communicate with the rest server is found in
`src/modules/HttpClient.ts`.
The module uses the npm package `node-fetch` to send requests to the server.

The client module defines a set of generic functions which are used to build
more specific ones.

Example of a generic function:

```typescript
get<T>(url: string): Promise<T> {
  return fetch(url, { method: "GET" })
    .then(this.checkStatus)
    .then((response) => res.json())
    .then((response) => {
      return res as T;
    });
}
```

The return type `Promise` is an object
that represents the eventual completion (or failure)
of an asynchronous operation.

[Read more about Promises on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

#### How to use

First import the client like so:

```typescript
import HttpClient from "HttpClient";
```

Then call some method and handle the response.

```typescript
HttpClient.getMovie("tt9655334").then((result) => {
    console.log(result);
}).catch((error) => {
  console.error(error);
};
```

Searching for movies is done by using the method `searchMovies(args: SearchParameters)`.

The search parameters are defined with the following type:

```typescript
type SearchParameters = {
    title?: string;
    titleType?: string;
    minYear?: number;
    maxYear?: number;
    orderBy?: string;
    orderDir?: string;
    username?: string;
    page?: number;
};
```

Possible values are:

-   `title` - title of the movies contains this case insensitive string
-   `titleType` - one of `{movie, tvMovie, short, tvMiniSeries, tvSeries}`
-   `minYear` - minimum starting year inclusive
-   `maxYear` - maximum starting year inclusive
-   `orderBy` - one of `{title_type, primary_title, start_year}`
-   `orederDir` - either `ASC` for ascending order or `DESC` for descending order
-   `username` - if included, get liked status for this user
-   `page` - what page of the query we want returned.
    Each page holds 20 movies.
    Assumes page 1 if omitted.

E.g.
Search for movies with title containing "Black"
and year between 2000 and 2010
order by year descending
Returning page 1 (20 entries per page)

```typescript
HttpClient.searchMovies({
    title: "Black",
    minYear: 2000,
    maxYear: 2010,
    orderBy: "start_year",
    orderDir: "DESC",
}).then((response) => {
    console.log(response);
}).catch((error) => {
  console.error(error);
};
```

### Storage

This module is a wrapper for Session Storage an Local Storage

[Read more about Session Storage on
MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

[Read more about Local Storage on
MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

The two wrappers in this module has identical methods:

```typescript
set(key: string, item: string): void
get(key: string): string | null
keyExists(key: string): boolean
remove(key: string): void
clear(): void
```

#### How to use

First import a wrapper like so:

```typescript
import LocalStorage from "Storage";
```

Then call some method:

```typescript
const username = LocalStorage.get("username");
```
