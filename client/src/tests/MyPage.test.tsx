import { render, RenderResult } from "@testing-library/react";
import MyPage from "../components/MyPage";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../reducers/Reducer";
import LikedMovieTable from "../components/LikedMoviesTable";
import HttpClient from "../modules/HttpClient";
import configureStore, {
    MockStoreCreator,
    MockStoreEnhanced,
} from "redux-mock-store";
import { act } from "react-dom/test-utils";

//Creates mock values when asking HTTP client for data
jest.mock("../modules/HttpClient");
const fakeHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;
//Mocking request for getLikedMovies
fakeHttpClient.getLikedMovies.mockReturnValue(
    Promise.resolve([
        {
            tconst: "1",
            title_type: "Movie",
            primary_title: "Avengers",
            original_title: "Avengers",
            is_adult: true,
            end_year: null,
            start_year: 2012,
            runtime_minutes: 156,
            genres: "Action",
            liked: true,
        },
    ])
);
//Mocking request for getMovie
fakeHttpClient.getMovie.mockReturnValue(Promise.resolve({
  tconst: "1",
  title_type: "Movie",
  primary_title: "Avengers",
  original_title: "Avengers",
  is_adult: true,
  end_year: null,
  start_year: 2012,
  runtime_minutes: 156,
  genres: "Action",
  liked: true,
}))
//Checking if myPage renders
test("MyPage renders", () => {
    const { container } = render(
        <Provider store={store}>
            <MyPage />
        </Provider>
    );
    expect(container).toMatchSnapshot();
});
//Configure mockStore to be used later
const mockStore: MockStoreCreator = configureStore([]);

describe("MyPage", () => {
    let component: RenderResult;
    let store: MockStoreEnhanced;
    //run beforeEach test to insure correct state and component 
    beforeEach(() => {
        // Initialize mockStore with initial state
        store = mockStore({
            LoggedIn: true,
            userName: "testUser123",
        });

        component = render(
            <Provider store={store}>
                <MyPage />
            </Provider>
        );
    });

    it("should contain MyPage text", async () => {
        const MinSide = component.getByText("My page");
        expect(MinSide).toBeVisible()
    });
    
});
