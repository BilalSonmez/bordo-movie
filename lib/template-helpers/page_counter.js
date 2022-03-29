Template.registerHelper('page_counter', function(a, b, c) {
  const page = Math.ceil(a / b);
  const pages = [];
  if (page > 7) {
    const startCount = c - 5 < 0 ? 0 : c - 5
    const endCount = c + 5 > page ? page : c + 5

    if (startCount > 0) {
      pages.push({ value: startCount, text: '...' })
    }
    for (let i = startCount; i < endCount; i++) {
      pages.push({ value: i + 1, text: i + 1 })
    }
    if (endCount < page) {
      pages.push({ value: endCount + 1, text: '...' })
    }
  } else {
    for (let i = 0; i < page; i++) {
      pages.push({ value: i + 1, text: i + 1 })
    }
  }
  return pages;
});