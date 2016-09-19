//usage: {{dateFormat birthday 'YYYY MM DD'}}
Handlebars.registerHelper('dateFormat', function(date, format) {
    if (window.moment) {
        return moment(date).format(format);
    }else{
        return date.toString();
    }
});
