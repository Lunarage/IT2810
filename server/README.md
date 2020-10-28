# REST Server

## Technologies

### Database - Postgresql

### Middleware - Express

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
`/movie/:movieId/:userId`
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
  }
]
```
`/movie?title=string&page=number/:userId`
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
