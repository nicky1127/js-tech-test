import { createCachedSelector } from "re-reselect";

const getAllLiveEvents = state => state.liveEvents;
const getMarkets = state => state.markets;

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

// selector to group events by type
export const groupEventsByType = createCachedSelector(
  sortEventsByTime,
  events => {
    const group = {};
    Object.defineProperty(group, "Football Live", {
      value: [],
      writable: true,
      enumerable: true
    });
    events.forEach(event => {
      const type = event.linkedEventTypeName || event.typeName;

      group[type]
        ? group[type].push(event)
        : Object.defineProperty(group, type, {
            value: [event],
            writable: true,
            enumerable: true
          });
    });
    return Object.entries(group);
  }
)((state, props) => "groupedLiveEvents");

// selector to convert markets in to array of values
export const convertMarketsIntoArray = createCachedSelector(
  getMarkets,
  markets => {
    return Object.values(markets);
  }
)((state, props) => "convertedMertketsArray");

// selector to sort events in a ascending order by displayOrder
export const sortMarketsByOrder = createCachedSelector(
  convertMarketsIntoArray,
  markets => {
    return markets.sort((a, b) => {
      return a.displayOrder - b.displayOrder;
    });
  }
)((state, props) => "sortedMarketsByOrder");

// selector to sort events in a ascending order by name
export const sortMarketsByName = createCachedSelector(
  sortMarketsByOrder,
  markets => {
    return markets.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());;
    });
  }
)((state, props) => "sortedMarketsByName");
