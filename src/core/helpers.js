import moment from 'moment';

export default {
  createDateString(momentDate, currentPath) {
    const currentMonth = moment(momentDate).startOf('day').format('MMM');
    const currentDay = moment(momentDate).startOf('day').format('DD');
    const startMonth = moment(momentDate).startOf('week').format('MMM');
    const startDay = moment(momentDate).startOf('week').format('DD');
    const endMonth = moment(momentDate).endOf('week').format('MMM');
    const endDay = moment(momentDate).endOf('week').format('DD');

    if (currentPath === '/day') {
      return `${currentMonth} ${currentDay}`;
    }

    return (startMonth === endMonth) ?
      `${startMonth} ${startDay} — ${endDay}` :
      `${startMonth} ${startDay} — ${endMonth} ${endDay}`;
  },

  /**
   * GET POSITION
   * Fired from a click on a show or feature element, loops through
   * the element and all of it's parent elements to calculate an X
   * and Y position for the element.
   */
  getPosition(el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
      if (el.tagName === 'BODY') {
        // deal with browser quirks with body/window/document and page scroll
        const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        const yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      el = el.offsetParent; // eslint-disable-line
    }

    return {
      x: xPos,
      y: yPos,
    };
  },

  pixelAsTime(top, pageY, minuteHeight) {
    const totalminutes = Math.floor((pageY - top) / minuteHeight);
    const hours = Math.floor(totalminutes / 60);
    // round to nearest 15 minutes
    const minutes = Math.floor((totalminutes % 60) / 15) * 15;
    return moment({ hour: hours, minute: minutes }).format('HH:mm');
  },
};
