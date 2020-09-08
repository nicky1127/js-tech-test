import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import SelectionUnit from "components/units/SelectionUnit";
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

describe("SelectionUnit", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SelectionUnit {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("SelectionUnit should render one [data-testid=SelectionUnit]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SelectionUnit {...props} />
      </Provider>
    );
    const container = getByTestId("selectionUnit");
    expect(container).toBeInTheDocument();
  });
});
