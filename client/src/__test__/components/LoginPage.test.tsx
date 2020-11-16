import React from "react";
import renderer from "react-test-renderer";
import LoginPage from "../../components/LoginPage";

it("renders correctly", () => {
    const tree = renderer.create(<LoginPage />);
});
