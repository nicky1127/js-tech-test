import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Loading from "components/layouts/Loading";
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

describe("Loading", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Loading {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Loading should render one [data-testid=loading]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Loading {...props} />
      </Provider>
    );
    const container = getByTestId("loading");
    expect(container).toBeInTheDocument();
  });
});
