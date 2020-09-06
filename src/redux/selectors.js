import { createCachedSelector } from "re-reselect";

const getAllLiveEvents = state => state.liveEvents;


// selector to filter displayable events
export const filterDisplayableEvents = createCachedSelector(
  getAllLiveEvents,
  events => {
    return events.filter(event => event.status.displayable);
  }
)(
  (state, props) => "displayableLiveEvents"
);

