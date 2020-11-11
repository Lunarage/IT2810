import { Server } from "http";
import supertest, { Response, SuperTest, Test } from "supertest";
import pool from "../dbconfig";
import { closeServer, startServer } from "../Server";

// Set port number of server
const port = 3001;

// Holds the server
let server: Server;
let testServer: SuperTest<Test>;

// Type of movies
type Movie = {
    tconst: string;
    title_type: string;
    primary_title: string;
    original_title: string;
    is_adult: boolean;
    end_year: number | null;
    start_year: number;
    runtime_minutes: number | null;
    genres: string | null;
    liked: boolean;
};

// Start the server
beforeAll(async () => {
    await startServer(port)
        .then((promisedServer: Server) => {
            server = promisedServer;
        })
        .catch((error) => {
            console.log("No server 😢:");
            console.log(error.message);
        });
    // Construct test server
    testServer = supertest(server);
});

// Close the server when finished
afterAll(async () => {
    await closeServer(server, pool);
});

describe("GET /", () => {
    it("Server Responds with 200", async () => {
        const response = await testServer.get("/");
        expect(response.text).toEqual("Welcome!");
        expect(response.status).toEqual(200);
    });
});

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

describe("GET /movie/tt9655334", () => {
    it("Retrieve specific movie (Fuglane i folketrua)", async () => {
        const response: Response = await testServer.get("/movie/tt9655334");
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0] as Movie).toMatchObject(sampleMovie);
    });
});

describe("GET /movie", () => {
    it("Retrieve some movies and check correct types", async () => {
        const response: Response = await testServer.get("/movie");
        expect(Array.isArray(response.body)).toBe(true);
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
        const response: Response = await testServer.get("/movie?title=Black");
        expect(Array.isArray(response.body)).toBe(true);
        (response.body as Movie[]).forEach((movie) => {
            expect(movie.primary_title).toEqual(
                expect.stringContaining("Black")
            );
        });
    });
});


