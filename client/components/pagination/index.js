Template.componentPagination.events({ 
  'click .brd-pagination-next': function(event, template) {
    event.preventDefault();
    _tmp = this.stateOBJ.get(this.stateSTR);
    let currentPage = _tmp.options.pagination.currentPage;

    if (currentPage < Math.ceil(_tmp.options.pagination.totalCount / _tmp.options.pagination.pageItems)) {
      currentPage = parseInt(currentPage) + 1;
    }
    _tmp.options.pagination.currentPage = currentPage;
    this.stateOBJ.set(this.stateSTR, _tmp);
  },
  'click .brd-pagination-previous': function(event, template) {
    event.preventDefault();
    _tmp = this.stateOBJ.get(this.stateSTR);
    let currentPage = _tmp.options.pagination.currentPage;

    if (currentPage > 1) {
      currentPage = parseInt(currentPage) - 1;
    }
    _tmp.options.pagination.currentPage = currentPage;
    this.stateOBJ.set(this.stateSTR, _tmp);
  },
  'click .brd-page': function (event, template) {
    event.preventDefault();
    _tmp = template.data.stateOBJ.get(template.data.stateSTR);
    _tmp.options.pagination.currentPage = this.value;
    template.data.stateOBJ.set(template.data.stateSTR, _tmp);
  }
});