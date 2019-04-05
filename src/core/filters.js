import Vue from 'vue';
import moment from 'moment';

// truncate the value passed to our function
// by the length specified
// Ex {{ 'Here is a string' | truncate '3' }}
Vue.filter('truncate', (value, length) => value.substring(0, length));

// calculate our day label based off of the
// beginning of the week and the index of
// our v-for loop and format appropriately
// the $index arg is optional
// Ex {{ dayLabel | calcDayLabel $index }}
Vue.filter('calcDayLabel', (value) => value.substring(0, 3));

// calculate our day number based off of the
// beginning of the week and the index of
// our v-for loop and format appropriately
// the $index arg is optional
// Ex {{ dayNumber | calcDayNumber $index }}
Vue.filter('calcDayNumber', (value, index) => moment(value).add(index, 'days').format('D'));
