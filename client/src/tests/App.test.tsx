import App from "../App"
import { Provider } from "react-redux"
import { store } from "../reducers/Reducer"
import React from "react";
import { render } from "@testing-library/react";

it('App renders', () => {
  const {container} = render(
    <Provider store={store}><App/></Provider>);
  expect(container).toMatchSnapshot();
});