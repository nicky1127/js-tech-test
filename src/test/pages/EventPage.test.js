import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import EventPage from "pages/EventPage";
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

describe("EventPage", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <EventPage {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("EventPage should render one [data-testid=eventPage]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <EventPage {...props} />
      </Provider>
    );
    const container = getByTestId("eventPage");
    expect(container).toBeInTheDocument();
  });
});
