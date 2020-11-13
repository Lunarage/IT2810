import { Server } from "http";
import supertest, { Response, SuperTest, Test } from "supertest";
import pool from "../DatabaseConnector";
import { stopServer, startServer } from "../Server";
import { Like, Movie, User } from "../DatabaseTypes";

// Set port number of server
const port = 3001;

// Holds the server
let server: Server;
let request: SuperTest<Test>;

// Start the server before tests
beforeAll(async () => {
    await startServer(port)
        .then((promisedServer: Server) => {
            server = promisedServer;
        })
        .catch((error) => {
            console.error("No server 😢:");
            console.error(error.message);
        });
    // Construct test server
    request = supertest(server);
    // Delete test user
    await request.delete("/user/fo");
});

// Close the server when finished
afterAll(async () => {
    // Delete test user
    await request.delete("/user/fo");
    // Stop server
    await stopServer(server, pool);
});

// A movie known to be in the database
const sampleMovie: Movie = {
    genres: "Documentary",
    tconst: "tt9655334",
    start_year: 2018,
    liked: false,
    is_adult: false,
    primary_title: "Fuglane i folketrua",
    original_title: "Fuglane i folketrua",
    end_year: null,
    runtime_minutes: null,
    title_type: "tvMovie",
};

const sampleLikedMovie: Movie = {
    genres: "Documentary",
    tconst: "tt9655334",
    start_year: 2018,
    liked: true,
    is_adult: false,
    primary_title: "Fuglane i folketrua",
    original_title: "Fuglane i folketrua",
    end_year: null,
    runtime_minutes: null,
    title_type: "tvMovie",
};

describe("GET / 👌", () => {
    it("Server Responds with 200 OK", async () => {
        const response = await request.get("/");
        expect(response.status).toEqual(200);
    });
});

describe("Methods on /movie 🗄️ (MovieController)", () => {
    it("Retrieve specific movie (Fuglane i folketrua)", async () => {
        const response: Response = await request.get("/movie/tt9655334");
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0] as Movie).toMatchObject(sampleMovie);
    });
    it("Retrieve some movies and check correct types", async () => {
        const response: Response = await request.get("/movie");
        // Expect the response to be an array
        expect(Array.isArray(response.body)).toBe(true);
        // Expect to get a list of movies longer than 0
        expect((response.body as Movie[]).length > 0).toBe(true);
        // Check movies for correct type
        (response.body as Movie[]).forEach((movie) => {
            expect(movie).toHaveProperty("tconst");
            expect(typeof movie.tconst === "string").toBeTruthy();
            expect(movie).toHaveProperty("title_type");
            expect(typeof movie.title_type === "string").toBeTruthy();
            expect(movie).toHaveProperty("primary_title");
            expect(typeof movie.primary_title === "string").toBeTruthy();
            expect(movie).toHaveProperty("original_title");
            expect(typeof movie.original_title === "string").toBeTruthy();
            expect(movie).toHaveProperty("is_adult");
            expect(typeof movie.is_adult === "boolean").toBeTruthy();
            expect(movie).toHaveProperty("end_year");
            expect(
                typeof movie.end_year === "number" || movie.end_year === null
            ).toBeTruthy();
            expect(movie).toHaveProperty("start_year");
            expect(typeof movie.start_year === "number").toBeTruthy();
            expect(movie).toHaveProperty("runtime_minutes");
            expect(
                typeof movie.runtime_minutes === "number" ||
                    movie.runtime_minutes === null
            ).toBeTruthy();
            expect(movie).toHaveProperty("genres");
            expect(
                typeof movie.genres === "string" || movie.genres === null
            ).toBeTruthy();
            expect(movie).toHaveProperty("liked");
            expect(typeof movie.liked === "boolean").toBeTruthy();
        });
    });
    it("Search for title and check if title contains keyword", async () => {
        const response: Response = await request.get("/movie?title=black");
        expect(Array.isArray(response.body)).toBe(true);
        (response.body as Movie[]).forEach((movie) => {
            expect(movie.primary_title.toLowerCase()).toEqual(
                expect.stringContaining("black")
            );
        });
    });
});

describe("Methods on /user 🧑 (UserController)", () => {
    it("Get non existing user and check for 404", async () => {
        const response: Response = await request.get("/user/fo");
        expect(response.status).toBe(404);
    });
    it("Delete non exsisting user and check for 404", async () => {
        const response: Response = await request.delete("/user/fo");
        expect(response.status).toBe(404);
    });
    it("Create user and check for 200", async () => {
        const response: Response = await request.put("/user/fo");
        expect(response.status).toBe(200);
    });
    it("Get recently created user and check for 200 and username", async () => {
        const response: Response = await request.get("/user/fo");
        expect(response.status).toBe(200);
        expect((response.body as User[])[0].username).toEqual("fo");
    });
    it("Create existing user and check for 409", async () => {
        const response: Response = await request.put("/user/fo");
        expect(response.status).toBe(409);
    });
    it("Delete user and check for 200", async () => {
        const response: Response = await request.delete("/user/fo");
        expect(response.status).toBe(200);
    });
});

describe("Methods on /user/:userId/likedMovies (LikeController)", () => {
    it("Get liked movies for non existing user and check for 404", async () => {
        const response: Response = await request.get("/user/fo/LikedMovies");
        expect(response.status).toBe(404);
    });
    it("Like a movie for a user", async () => {
        await request.put("/user/fo");
        const response: Response = await request.put(
            "/user/fo/LikedMovies/" + sampleLikedMovie.tconst
        );
        expect(response.status).toBe(200);
        expect(response.body as Like[]).toEqual([{ liked: true }]);
    });
    it("Get liked movie for a user", async () => {
        const response: Response = await request.get(
            "/user/fo/LikedMovies/" + sampleLikedMovie.tconst
        );
        expect(response.status).toBe(200);
        expect(response.body as Like[]).toEqual([{ liked: true }]);
    });
    it("Get liked movies for an existing user and check that the liked movie is in the list", async () => {
        const response: Response = await request.get("/user/fo/LikedMovies");
        expect(response.status).toBe(200);
        expect(response.body as Movie[]).toContainEqual(sampleLikedMovie);
    });
});
