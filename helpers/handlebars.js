const Handlebars = require('handlebars');

Handlebars.registerHelper('format_date', function (date) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
});

Handlebars.registerHelper('unlessCond', function (v1, v2, options) {
  if (v1 !== v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = Handlebars.helpers;
