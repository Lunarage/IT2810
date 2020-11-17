import { render } from '@testing-library/react';
import Menu from "../components/Menu"
import React from 'react';
import { Provider } from "react-redux"
import { store } from "../reducers/Reducer"

test('Menu renders', () => {
    const {container} = render(
      <Provider store={store}><Menu/></Provider>);
    expect(container).toMatchSnapshot();
  });
