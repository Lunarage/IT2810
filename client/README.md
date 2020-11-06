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

## Prettier og Stylelint

Sjekk at example.tsx går fra:
```typescript
const ExampleComponent = props => 
{console.log("Hello, World!"); 
if(true){let array = [1,2,3]}
}
```
til (merk 4 spaces som indent):
```typescript
const ExampleComponent = (props) => {
    console.log("Hello, World!");
    if (true) {
        let array = [1, 2, 3];
    }
};
```

Sjekk at example.scss går fra:
```scss
@import "colors";
.class{
  *{
    padding:0;
    margin:0;
  }
font-family: $standard-font;
color: #FFFFFF;}
```
til (merk rekkefølger og spaces):
```scss
@import 'colors';

.class {
  color: #fff;
  font-family: $standard-font;

  * {
    margin: 0;
    padding: 0;
  }
}

```
