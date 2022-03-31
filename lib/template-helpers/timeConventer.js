Template.registerHelper('timeConventer', function (a, b) {
  let today = new Date(a);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let h = today.getHours();
  let m = today.getMinutes();
  
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  
  today = dd + '/' + mm + '/' + yyyy + ' ' + h + ':' + m;
  return today;
});