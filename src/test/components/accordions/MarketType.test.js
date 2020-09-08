import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import MarketType from "components/accordions/MarketType";
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

describe("MarketType", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MarketType {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("MarketType should render one [data-testid=marketType]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MarketType {...props} />
      </Provider>
    );
    const container = getByTestId("marketType");
    expect(container).toBeInTheDocument();
  });
});
