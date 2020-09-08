import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import BetSlipPanel from "components/layouts/BetSlipPanel";
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

describe("BetSlipPanel", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BetSlipPanel {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("BetSlipPanel should render one [data-testid=betSlipPanel]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BetSlipPanel {...props} />
      </Provider>
    );
    const container = getByTestId("betSlipPanel");
    expect(container).toBeInTheDocument();
  });
});
