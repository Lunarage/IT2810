# REST Server

## Technologies

The server is implemented using node, typescript, express and postgreSQL.

### Express

The server is split into different modules:
* Server - Configures and initiates the express app.
* Routers - Handles what controller to use based on URI.
* Controllers - Connects to the database and does logic.

### PostgreSQL

PostgreSQL is an object-relational database.

Our data is stored in three tables:
* title_basics: Contains basic information on titles (movies etc.)
* users: Contains users
* title_likes: Contains what titles users like.

The SQL for the tables is found in `server/sql`

## REST API

Specific movie (GET):
`/movie/:movieId`
```json
[
  {
    "tconst": string,
    "title_type": string,
    "primary_title": string,
    "original_title": string,
    "is_adult": boolean,
    "start_year": number,
    "end_year": number,
    "runtime_minutes": number,
    "genres": string
  }
]
```
`/movie/:movieId?username=string`
```json
[
  {
    "tconst": string,
    "title_type": string,
    "primary_title": string,
    "original_title": string,
    "is_adult": boolean,
    "start_year": number,
    "end_year": number,
    "runtime_minutes": number,
    "genres": string,
    "liked": boolean
  }
]
```

Search for movies (GET):
`/movie?title=string&page=number`
```json
[
  {
    "tconst": string,
    "title_type": string,
    "primary_title": string,
    "original_title": string,
    "is_adult": boolean,
    "start_year": number,
    "end_year": number,
    "runtime_minutes": number,
    "genres": string
    "liked": boolean
  }
]
```

User with specific username (GET, PUT, DELETE):
`/user/:userId`
```json
[
  {
    "username": string
  }
]
```

Liked movies for user (GET):
`/user/:userId/likedMovies/`
```json
[
  {
    "tconst": string,
    "title_type": string,
    "primary_title": string,
    "original_title": string,
    "is_adult": boolean,
    "start_year": number,
    "end_year": number,
    "runtime_minutes": number,
    "genres": string
    "liked": boolean
  }
]
```

Specific liked movie for user (GET, PUT, DELETE):
`/user/:userId/likedMovies/:movieId`
```json
[
  {
    "liked": boolean
  }
]
```

## Sources
* [Setup tutorial for express and postgresql](https://medium.com/nsoft/building-and-running-nodejs-typescript-postgresql-application-with-docker-3878240a2f73)
* [Dataset from IMDb](https://www.imdb.com/interfaces/)
