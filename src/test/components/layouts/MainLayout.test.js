import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import MainLayout from "components/layouts/MainLayout";
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

describe("MainLayout", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MainLayout {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("MainLayout should render one [data-testid=mainLayout]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MainLayout {...props} />
      </Provider>
    );
    const container = getByTestId("mainLayout");
    expect(container).toBeInTheDocument();
  });
});
