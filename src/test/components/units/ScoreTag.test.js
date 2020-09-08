import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import ScoreTag from "components/units/ScoreTag";
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

describe("ScoreTag", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ScoreTag {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("ScoreTag should render one [data-testid=scoreTag]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ScoreTag {...props} />
      </Provider>
    );
    const container = getByTestId("scoreTag");
    expect(container).toBeInTheDocument();
  });
});
