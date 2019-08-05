const checkIfCatalogued = (events, ids) => {
  if (ids === null) {
    return events.map(event => ({
      ...event,
      isCatalogued: false
    }));
  }
  return events.map(event => ({
    ...event,
    isCatalogued: ids.includes(event._id)
  }));
};

export default checkIfCatalogued;
