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

decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();