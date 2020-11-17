import { render } from '@testing-library/react';
import MyPage from "../components/MyPage"
import React from 'react';
import { Provider } from "react-redux"
import { store } from "../reducers/Reducer"


/*
// in your test:
const renderer = new ShallowRenderer();
renderer.render(<MyPage />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
<span className="my-page-title">{"Min side"}</span>,
  <LikedMoviesTable username="username" />
]);*/


test('Menu renders', () => {
    const {container} = render(
      <Provider store={store}><MyPage/></Provider>);
    expect(container).toMatchSnapshot();
  });
