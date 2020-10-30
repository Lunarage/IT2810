# Project 3 Group 22

## REST

The REST server runs on `it2810-22.idi.ntnu.no:3000`, and its source code is
found in `/server/`.

The main module used to communicate with the rest server is found in
`src/modules/HttpClient.ts`.
The module uses the npm package `node-fetch` to send requests to the server.

The client module defines a set of generic functions which are used to build
more specific ones.
```typescript
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
```
The return type `Promise` is an object 
that represents the eventual completion (or failure) of an asynchronous
operation.

## gitpod
gitpod ws: https://gitlab.stud.idi.ntnu.no/it2810-h20/team-22/prosjekt-3.git 
