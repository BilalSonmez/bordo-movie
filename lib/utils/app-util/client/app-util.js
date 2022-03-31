AppUtil = {
  temp: new ReactiveDict(null, {}),
  refreshTokens: new ReactiveDict(null, {})
};

Template.registerHelper('appUtil', function () {
  return AppUtil;
});

fetchOptionSetup = function(pageItems, sortField = "createdAt", sortOrder = "desc") {
  return {
    pagination: {
      currentPage: 1,
      pageItems: pageItems,
      totalCount: 0,
      totalPages: 0
    },
    sorting: {
      sortField: sortField,
      sortOrder: sortOrder
    },
    filtering: {}
  };
};