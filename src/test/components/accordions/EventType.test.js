import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import EventType from "components/accordions/EventType";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import defaultState from "constants/defaultState";

beforeEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const props = {group:['test',[{startTime:'2017-09-19T12:16:51.000Z'}]]};

const state = {
  ...defaultState
};
const mockStore = configureMockStore();
const store = mockStore(state);

describe("EventType", () => {
  it("Snapshot matchs", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <EventType {...props} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("EventType should render one [data-testid=eventType]", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <EventType {...props} />
      </Provider>
    );
    const container = getByTestId("eventType");
    expect(container).toBeInTheDocument();
  });
});
