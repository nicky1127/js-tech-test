import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import NoSeleciotn from "components/units/NoSelection";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import defaultState from "constants/defaultState"; 

beforeEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const props = {};

const state = {
  ...defaultState
};
const mockStore = configureMockStore();
const store = mockStore(state);

describe("NoSeleciotn", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NoSeleciotn {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("NoSeleciotn should render one [data-testid=noSelection]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NoSeleciotn {...props} />
      </Provider>
    );
    const container = getByTestId("noSelection");  
    expect(container).toBeInTheDocument();
  });
});
