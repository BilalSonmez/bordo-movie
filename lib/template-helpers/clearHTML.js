Template.registerHelper("clearHTML", function (a) {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = a;
  return tmp.innerText;
});
