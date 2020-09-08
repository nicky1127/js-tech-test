import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Selections from "components/accordions/Selections";
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

describe("Selections", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Selections {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Selections should render one [data-testid=selections]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Selections {...props} />
      </Provider>
    );
    const container = getByTestId("selections");
    expect(container).toBeInTheDocument();
  });
});
