import { createCachedSelector } from "re-reselect";

const getAllLiveEvents = state => state.liveEvents;

// selector to filter displayable events
export const filterDisplayableEvents = createCachedSelector(
  getAllLiveEvents,
  events => {
    return events.filter(event => event.status.displayable);
  }
)((state, props) => "displayableLiveEvents");

// selector to sort events in a ascending order
export const sortEventsByTime = createCachedSelector(
  filterDisplayableEvents,
  events => {
    return events.sort(function(a, b) {
      return new Date(a.startTime) - new Date(b.startTime);
    });
  }
)((state, props) => "sortedLiveEvents");
