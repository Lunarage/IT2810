import fetch from "node-fetch";
import HttpClient from "../../modules/HttpClient";
import { Movie, User, Like } from "../../types/DatabaseTypes";

// Mock the fetch module
jest.mock("node-fetch");
// Use the actual response object supplied by the module
const { Response } = jest.requireActual("node-fetch");
// Mock the fetch function
const fakeFetch = fetch as jest.MockedFunction<typeof fetch>;

beforeEach(() => {
    // Clear out mocked responses between test
    fakeFetch.mockClear();
});

// Define som sample data
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

const sampleUser: User = {
    username: "foo",
};

const sampleLike: Like = {
    liked: true,
};

const sampleUnLike: Like = {
    liked: false,
};

describe("HttpClient Unit Tests", () => {
    it("get<T>", async () => {
        const fakeData = [sampleUser];
        const fakeResponseBody = JSON.stringify(fakeData);
        const fakeResponse = new Response(fakeResponseBody);
        fakeFetch.mockReturnValue(Promise.resolve(fakeResponse));

        await expect(
            HttpClient.get<User[]>("http://localhost:3000/")
        ).resolves.toEqual(fakeData);
    });
    it("put<T>", async () => {
        const fakeData = [sampleUser];
        const fakeResponseBody = JSON.stringify(fakeData);
        const fakeResponse = new Response(fakeResponseBody);
        fakeFetch.mockReturnValue(Promise.resolve(fakeResponse));

        await expect(
            HttpClient.put<User[]>("http://localhost:3000/")
        ).resolves.toEqual(fakeData);
    });
    it("delete<T>", async () => {
        const fakeData = [sampleUser];
        const fakeResponseBody = JSON.stringify(fakeData);
        const fakeResponse = new Response(fakeResponseBody);
        fakeFetch.mockReturnValue(Promise.resolve(fakeResponse));

        await expect(
            HttpClient.delete<User[]>("http://localhost:3000/")
        ).resolves.toEqual(fakeData);
    });
    it("HttpRequestError Test", async () => {
        const fakeResponseInit = {
            status: 404,
        };
        const fakeResponseBody = JSON.stringify([]);
        const fakeResponse = new Response(fakeResponseBody, fakeResponseInit);
        fakeFetch.mockReturnValue(Promise.resolve(fakeResponse));

        await expect(
            HttpClient.get<User[]>("http://localhost:3000/")
        ).rejects.toThrow("Not Found");
    });
    it("getMovie", async () => {
        const fakeData = [sampleMovie];
        const fakeResponseBody = JSON.stringify(fakeData);
        const fakeResponse = new Response(fakeResponseBody);
        fakeFetch.mockReturnValue(Promise.resolve(fakeResponse));

        await expect(HttpClient.getMovie("tt9655334")).resolves.toEqual(
            sampleMovie
        );
    });
    it("likeMovie", async () => {
        const fakeData = [sampleLike];
        const fakeResponseBody = JSON.stringify(fakeData);
        const fakeResponse = new Response(fakeResponseBody);
        fakeFetch.mockReturnValue(Promise.resolve(fakeResponse));

        await expect(HttpClient.likeMovie("tt9655334", "foo")).resolves.toEqual(
            sampleLike
        );
    });
    it("unlikeMovie", async () => {
        const fakeData = [sampleUnLike];
        const fakeResponseBody = JSON.stringify(fakeData);
        const fakeResponse = new Response(fakeResponseBody);
        fakeFetch.mockReturnValue(Promise.resolve(fakeResponse));

        await expect(HttpClient.likeMovie("tt9655334", "foo")).resolves.toEqual(
            sampleUnLike
        );
    });
    it("getLikedMovies", async () => {
        const fakeData = [sampleMovie];
        const fakeResponseBody = JSON.stringify(fakeData);
        const fakeResponse = new Response(fakeResponseBody);
        fakeFetch.mockReturnValue(Promise.resolve(fakeResponse));

        await expect(HttpClient.getLikedMovies("foo")).resolves.toEqual(
            fakeData
        );
    });
    it("loginOrCreateUser when user exists", async () => {
        const fakeData = [sampleUser];
        const fakeResponseBody = JSON.stringify(fakeData);
        const fakeResponse = new Response(fakeResponseBody);
        fakeFetch.mockReturnValue(Promise.resolve(fakeResponse));

        await expect(HttpClient.loginOrCreateUser("foo")).resolves.toEqual(
            sampleUser
        );
    });
    it("loginOrCreateUser when user does not exists", async () => {
        // First fetch
        const fakeResponseInit1 = {
            status: 404,
        };
        const fakeData1: User[] = [];
        const fakeResponseBody1 = JSON.stringify(fakeData1);
        const fakeResponse1 = new Response(
            fakeResponseBody1,
            fakeResponseInit1
        );
        fakeFetch.mockReturnValueOnce(Promise.resolve(fakeResponse1));

        // Second fetch
        const fakeData2 = [sampleUser];
        const fakeResponseBody2 = JSON.stringify(fakeData2);
        const fakeResponse2 = new Response(fakeResponseBody2);
        fakeFetch.mockReturnValueOnce(Promise.resolve(fakeResponse2));

        await expect(HttpClient.loginOrCreateUser("foo")).resolves.toEqual(
            sampleUser
        );
    });
    it("Testing deleteUser", async () => {
        const fakeData = [sampleUser];
        const fakeResponseBody = JSON.stringify(fakeData);
        const fakeResponse = new Response(fakeResponseBody);
        fakeFetch.mockReturnValue(Promise.resolve(fakeResponse));

        await expect(HttpClient.deleteUser("foo")).resolves.toEqual(sampleUser);
    });
});
