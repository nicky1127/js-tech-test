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
    return events.sort((a, b) => {
      return new Date(a.startTime) - new Date(b.startTime);
    });
  }
)((state, props) => "sortedLiveEvents");

// selector to sort events in a ascending order
export const groupEventsByType = createCachedSelector(
  sortEventsByTime,
  events => {
    const group = {};
    events.forEach(event => {
      const type = event.linkedEventTypeName || event.typeName;

      group[type]
        ? group[type].push(event)
        : Object.defineProperty(group, type, {
            value: [event],
            writable: true,
            enumerable:true
          });
    });
    return Object.entries(group);
  }
)((state, props) => "groupedLiveEvents");

