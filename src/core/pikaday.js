/* eslint-disable no-unused-vars */
import Vue from 'vue';
import moment from 'moment';
import Pikaday from 'pikaday';

Vue.directive('pikaday', {
  twoWay: true,
  params: ['format', 'trigger'],
  bind() {
    // had to use 'that' for some reason to
    // get this.getMoment to work properly
    const that = this;

    const i18n = {
      previousMonth: 'Last Month',
      nextMonth: 'Next Month',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };

    let $trigger = null;
    if (that.params.trigger === 'true') {
      $trigger = that.el.parentNode;
    }

    that.instance = new Pikaday({
      field: that.el,
      trigger: $trigger,
      i18n,
      format: that.params.format || 'YYYY-MM-DD',
      onSelect: function onSelect() {
        that.set(this.getMoment().format(that.params.format || 'YYYY-MM-DD'));
      },
    });
  },
  update(newVal) {
    this.el.value = newVal;
    this.instance.setDate(moment(newVal));
  },
  unbind() {
    this.instance.destroy();
  },
});
