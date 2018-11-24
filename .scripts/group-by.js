// simple, one-level deep grouping, accepts collection and then executes
const simpleGroupBy = (subReducer, getInitial) =>
  (collection, key) => collection.reduce(
    (groupedItems, item) => {
      if (!groupedItems[item[key]]) {
        groupedItems[item[key]] = getInitial();
      }
      groupedItems[item[key]] = subReducer(groupedItems[item[key]], item)
      return groupedItems;
    }, {});

// collection-agnostic, returns reducer, doesn't execute yet (see `groupBy` below)
const groupReducer = (subReducer, getInitial, getKey) => {
  if (typeof getKey === 'string') {
    const key = getKey
    getKey = (item) => item[key]
  }

  return (groupedItems, item) => {
    if (!groupedItems[getKey(item)]) {
      groupedItems[getKey(item)] = getInitial()
    }
    groupedItems[getKey(item)] = subReducer(groupedItems[getKey(item)], item)
    return groupedItems
  }
}

// accepts collection and grouping reducer (`groupReducer` above), executes grouping
const groupBy = (groupper, collection) => collection.reduce(groupper, {});

// multiple-step grouping reducer
// first 3 parameters define the final (bottom) level, other optional parameters form upper grouping levels
// example: composedGroupReducer(countReducer, () => 0, 'nationality', 'contractType', 'departmentId')
// would result in: { 3: { 'permanent': { 'PL': 123, ... }, ... }, ... }
const composedGroupReducer = (finalReducer, getInitial, finalGroup, ...groups) => {
  groups = [...groups]
  const final = groupReducer(finalReducer, getInitial, finalGroup)
  return groups.reduce((aggrFn, groupFn) => groupReducer(aggrFn, () => ({}), groupFn), final)
}

module.exports = {
  simpleGroupBy,
  groupReducer,
  groupBy,
  composedGroupReducer
}
