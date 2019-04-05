import moment from 'moment';

// custom formatting for am/pm
// only works for english language
// https://github.com/moment/moment/issues/580
moment.updateLocale('en', {
  meridiem: function customMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? 'p' : 'PM';
    }
    return isLower ? 'a' : 'AM';
  },
});
