import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import EventListPage from "pages/EventListPage";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import defaultState from "constants/defaultState";

beforeEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const props = { location: { pathname: "test" } };

const state = {
  ...defaultState
};
const mockStore = configureMockStore();
const store = mockStore(state);

describe("EventListPage", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <EventListPage {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("EventListPage should render one [data-testid=eventListPage]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <EventListPage {...props} />
      </Provider>
    );
    const container = getByTestId("eventListPage");
    expect(container).toBeInTheDocument();
  });
});
