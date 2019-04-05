import Vue from 'vue';
import h from './helpers';
import moment from 'moment';
import router from './router';
import _ from 'underscore';

// Disable this rule for this file only
/* eslint-disable no-param-reassign */
export default {
  SET_MESSAGE(state, { name, details, type }) {
    state.message.name = name;
    state.message.details = details;
    state.message.type = type;
    state.message.active = true;
  },

  DISMISS_MESSAGE(state) {
    state.message.active = false;
  },

  SET_STATION_SETTINGS(state, data) {
    const settings = data.objects[0];
    state.settings = settings;
    state.settings.role = settings.station_list.find(role => role.station ===
                            state.settings.station_name.toLowerCase());
    const user = settings.username;
    const key = settings.apikey;
    state.apikeyauth = `ApiKey ${user}:${key}`;
    state.navQLinks = `?username=${user}&api_key=${key}`;

    // station options for station selector
    state.settings.stations = [];
    state.settings.station_list.forEach((stationItem) => {
      const stationOpt = {};
      stationOpt.stationTitle = stationItem.station;
      if (stationItem.default_image) {
        stationOpt.defaultImageUrl = stationItem.default_image;
      } else {
        stationOpt.defaultImageUrl = 'https://via.placeholder.com/38';
      }
      state.settings.stations.push(stationOpt);
    });

    // set a current station by default
    state.selectedStationOption = state.settings.stations[0];
  },

  SET_SOCIAL_MEDIA_CONNECTIONS(state, data) {
    state.socialMediaConnections = data.objects;
  },

  SET_USER_LIST(state, data) {
    state.userlist = data.objects;
  },

  SET_PLAYLIST_CATEGORIES(state, data) {
    state.playlistCategories = data.objects;
  },

  // TODO: scroll position is a view-only thing, it should not be here
  SET_SCROLL_POS(state, yPos) {
    state.yScrollPos = yPos;
  },

  SET_DATE_STRING(state) {
    state.dates.currentDateString = h.createDateString(
      state.dates.currentMomentDate,
      state.route.path);
  },

  DECREMENT_CALENDAR(state) {
    if (state.route.path === '/day') {
      state.dates.currentMomentDate = state.dates.currentMomentDate.subtract(1, 'days');
    } else {
      state.dates.currentMomentDate = state.dates.currentMomentDate.subtract(7, 'days');
    }
    state.dates.currentStartOfWeek = moment(state.dates.currentMomentDate).startOf('week');
    state.dates.currentDateString = h.createDateString(
      state.dates.currentMomentDate,
      state.route.path);
  },

  INCREMENT_CALENDAR(state) {
    if (state.route.path === '/day') {
      state.dates.currentMomentDate = state.dates.currentMomentDate.add(1, 'days');
    } else {
      state.dates.currentMomentDate = state.dates.currentMomentDate.add(7, 'days');
    }
    state.dates.currentStartOfWeek = moment(state.dates.currentMomentDate).startOf('week');
    state.dates.currentDateString = h.createDateString(
      state.dates.currentMomentDate,
      state.route.path);
  },

  SET_CALENDAR_DATE(state, data) {
    state.dates.currentMomentDate = moment(data, 'YYYY-MM-DD');
    state.dates.currentStartOfWeek = moment(state.dates.currentMomentDate).startOf('week');
    state.dates.currentDateString = h.createDateString(
      state.dates.currentMomentDate,
      state.route.path);
  },

  SET_CURRENT_SHOW(state, data) {
    state.wizardEvent.show = data.event;
  },

  SET_CURRENT_SCHEDULE(state, data) {
    state.wizardEvent.schedule = data.event;
  },

  SET_DEFAULT_SHOW(state, data) {
    state.defaultShow = data;
    state.defaultShow.schedule = [
      JSON.parse(JSON.stringify(state.emptyEvent.schedule[0])),
    ];
  },

  SET_SHOWS(state, data) {
    state.shows = data;
    let latestZindex = 1;

    const setShowIndex = (show, zindex) => {
      const idStr = show.id.toString();
      if (_.has(state.shows, idStr)) {
        state.shows[idStr].zindex = zindex;
      } else {
        console.log('Could not set zindex for show id', show.id.toString());
      }
    };

    const setFeatureIndex = (show, feature, zindex) => {
      const idStr = show.id.toString();
      const fetStr = feature.id.toString();
      if (_.has(state.shows, idStr) && _.has(state.shows[idStr].features, fetStr)) {
        state.shows[idStr].features[fetStr].zindex = zindex;
      } else {
        console.log('Could not set zindex for feature id', feature.id.toString());
      }
    };

    const sortByEnableDate = (showList) =>
      _.sortBy(showList, (show) => show.schedule[0].enable_date);

    const indexShows = (showList) => {
      const sortedShows = sortByEnableDate(showList);
      let latestDate = sortedShows[0].schedule[0].enable_date;
      while (sortedShows.length > 0) {
        const nextShow = sortedShows.pop();
        if (nextShow.schedule[0].enable_date !== latestDate) {
          latestDate = nextShow.schedule[0].enable_date;
          latestZindex++;
        }
        setShowIndex(nextShow, latestZindex);
        if (nextShow.features) {
          const featuresLen = Object.keys(nextShow.features);
          if (featuresLen > 0) {
            latestZindex++;
            if (featuresLen === 1) {
              setFeatureIndex(nextShow, _.values(nextShow.features)[0], latestZindex);
            } else {
              const sortedFeatures = sortByEnableDate(_.values(nextShow.features));
              while (sortedFeatures.length > 0) {
                const nextFeature = sortedFeatures.pop();
                latestZindex++;
                setFeatureIndex(nextShow, nextFeature, latestZindex);
              }
            }
          }
        }
      }
    };

    const noEndDateShows = [];
    const endDateShows = [];
    for (const show of _.values(state.shows)) {
      // skip default show as it will never display on the calendar
      if (show.schedule) {
        if (show.schedule[0].disable_date) {
          endDateShows.push(show);
        } else {
          noEndDateShows.push(show);
        }
      }
    }
    if (noEndDateShows.length > 0) {
      indexShows(noEndDateShows);
    }
    if (endDateShows.length > 0) {
      indexShows(endDateShows);
    }

    // use this to set zindex of calendar header
    state.maxZindex = latestZindex + 1;
  },

  UPDATE_TAG(state, tag) {
    const matchingTag = state.playlistCategories.find(existingTag => existingTag.id === tag.id);
    matchingTag.name = tag.name;
  },

  DELETE_TAG(state, tag) {
    const matchingTag = state.playlistCategories.find(existingTag => existingTag.id === tag.id);
    const matchingTagIndex = state.playlistCategories.indexOf(matchingTag);

    state.playlistCategories.splice(matchingTagIndex, 1);
  },

  UPDATE_EVENT_TITLE(state, data) {
    state.wizardEvent.title = data;
  },

  UPDATE_EVENT_DESCRIPTION(state, data) {
    state.wizardEvent.description = data;
  },

  UPDATE_GET_USER_LIST(state, data) {
    state.userlist.username = data;
    state.userlist.email = data;
    state.userlist.password = data;
    state.userlist.availablestations = data;
    state.userlist.accesslevel = data;
  },

  // watch for change in available tag names
  // update corresponding tag in wizardEvent.available tags
  // UPDATE_EVENT_TAG(state) {
  //   const event = state.wizardEvent;
  //   const availableTags = state.playlistCategories;

  //   if (event.tags.length) {
  //     const oldTags = event.playlist_categories;

  //     for (let i = oldTags.length - 1; i >= 0; i--) {
  //       const newTag = availableTags.find(tag => tag.id === oldTags[i].id);
  //       oldTags[i].name = newTag.name;
  //     }
  //   }
  // },

  UPDATE_EVENT_TAGS(state, data) {
    const tagList = [];
    data.forEach((tag) => {
      tagList.push(tag.resource_uri);
    });
    state.wizardEvent.playlist_categories = tagList;
  },

  UPDATE_EVENT_ENABLE_DATE(state, data) {
    state.wizardEvent.schedule[0].enable_date = data;
  },

  UPDATE_EVENT_DISABLE_DATE(state, data) {
    state.wizardEvent.schedule[0].disable_date = data;
  },

  UPDATE_EVENT_START_TIME(state, newTime) {
    if (newTime !== 'Invalid date') {
      state.wizardEvent.schedule[0].start_time = newTime;
      state.message.active = false;
    }
  },

  UPDATE_EVENT_END_TIME(state, newTime) {
    if (newTime !== 'Invalid date') {
      state.wizardEvent.schedule[0].end_time = newTime;
      state.message.active = false;
    }
  },

  UPDATE_EVENT_RECURRING_DAYS(state, data) {
    const day = data.target.value;
    state.wizardEvent.schedule[0][`occurs_${day}`] =
      !state.wizardEvent.schedule[0][`occurs_${day}`];
  },

  UPDATE_EVENT_TOGGLE_WEEKDAYS(state, data) {
    let allChecked = true;
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ];

    // We loop through our weekdays to determine whether there are
    // any that aren't checked
    weekdays.forEach((day) => {
      if (state.wizardEvent.schedule[0][`occurs_${day.toLowerCase()}`] === false) {
        allChecked = false;
      }
    });

    // If they are all checked already, then we know that we are
    // supposed to be turning them off, if they aren't, we just
    // fill in the rest of the days
    if (allChecked) {
      weekdays.forEach((day) => {
        state.wizardEvent.schedule[0][`occurs_${day.toLowerCase()}`] = false;
      });
      data.target.classList.remove('btn--grayText--active');
    } else {
      weekdays.forEach((day) => {
        state.wizardEvent.schedule[0][`occurs_${day.toLowerCase()}`] = true;
      });
      data.target.classList.add('btn--grayText--active');
    }
  },

  UPDATE_EVENT_TOGGLE_WEEKEND_DAYS(state, data) {
    let allChecked = true;
    const weekendDays = [
      'Saturday',
      'Sunday',
    ];

    // We loop through our weekend dyas to determine whether there are
    // any that aren't checked
    weekendDays.forEach((day) => {
      if (state.wizardEvent.schedule[0][`occurs_${day.toLowerCase()}`] === false) {
        allChecked = false;
      }
    });

    // If they are all checked already, then we know that we are
    // supposed to be turning them off, if they aren't, we just
    // fill in the rest of the days
    if (allChecked) {
      weekendDays.forEach((day) => {
        state.wizardEvent.schedule[0][`occurs_${day.toLowerCase()}`] = false;
      });
      data.target.classList.remove('btn--grayText--active');
    } else {
      weekendDays.forEach((day) => {
        state.wizardEvent.schedule[0][`occurs_${day.toLowerCase()}`] = true;
      });
      data.target.classList.add('btn--grayText--active');
    }
  },

  SET_DAY_OF_WEEK(state, dateStr) {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const date = moment(dateStr);
    if (date.isValid()) {
      days.forEach((day) => {
        if (day === days[date.day()]) {
          state.wizardEvent.schedule[0][`occurs_${day}`] = true;
        } else {
          state.wizardEvent.schedule[0][`occurs_${day}`] = false;
        }
      });
    }
  },

  SETUP_WIZARD(state, { showId, defaultTime, parentId }) {
    if (showId && showId !== 'new') {
      let show = state.shows[Number(showId)];
      if (showId === '1') {
        show = state.defaultShow;
      }
      state.wizardEvent = JSON.parse(JSON.stringify(show));
    } else {
      // may be better way to make a deep copy of the emptyEvent but
      // this will work for now.
      state.wizardEvent = JSON.parse(JSON.stringify(state.emptyEvent));

      state.wizardEvent.schedule[0].enable_date =
        state.dates.currentMomentDate.format('YYYY-MM-DD');
    }
    if (parentId) {
      state.wizardEvent.parent = parentId;
    }
    if (defaultTime) {
      state.wizardEvent.schedule[0].start_time = defaultTime;
    }
    state.wizardSteps.currentStep = 0;
    state.wizardSteps.steps.forEach((step) => {
      if (step.slug !== 'date-time' && (!showId || showId !== '1')) {
        step.isPreviewable = false;
        step.isAccessible = false;
      } else {
        step.isPreviewable = true;
        step.isAccessible = true;
      }
    });
    if (showId === '1') {
      state.wizardSteps.currentStep = 1;
      state.wizardSteps.steps[0].isPreviewable = false;
      state.wizardSteps.steps[0].isAccessible = false;
      state.wizardSteps.steps[0].isValid = true;
    }
    if (state.wizardEvent.square_image &&
      state.wizardEvent.square_image.indexOf('.thumbnail.') === -1) {
      state.loadedRSSImage = state.wizardEvent.square_image;
      if (state.loadedRSSImage.indexOf('http') === -1) {
        state.loadRSSImage = `https://post.futurimedia.com${state.loadedRSSImage}`;
      }
    }
  },

  CLEAR_WIZARD(state) {
    state.wizardEvent = {};
  },

  UPDATE_PRE_BUMPER(state, data) {
    console.log(data);
    state.wizardEvent.pre_bumper = data.location.replace(/https?:\/\/\w+(\.\w+)*\//, '/');
  },

  DELETE_PRE_BUMPER(state) {
    state.wizardEvent.pre_bumper = null;
  },

  UPDATE_POST_BUMPER(state, data) {
    console.log(data);
    state.wizardEvent.post_bumper = data.location.replace(/https?:\/\/\w+(\.\w+)*\//, '/');
  },

  DELETE_POST_BUMPER(state) {
    state.wizardEvent.post_bumper = null;
  },

  UPDATE_DEFAULT_IMAGE(state, data) {
    state.wizardEvent.rectangle_image = data.location;
  },

  UPDATE_SQUARE_IMAGE(state, data) {
    state.wizardEvent.square_image = data.location;
    if (state.wizardEvent.square_image.indexOf('.thumbnail.') === -1) {
      state.loadedRSSImage = state.wizardEvent.square_image;
      if (state.loadedRSSImage.indexOf('http') === -1) {
        state.loadedRSSImage = `https://post.futurimedia.com${state.loadedRSSImage}`;
      }
    }
  },

  UPDATE_RSS_IMAGE(state, data) {
    state.loadedRSSImage = data.location.replace('.thumbnail.', '.original.');
    if (state.loadedRSSImage.indexOf('http') === -1) {
      state.loadedRSSImage = `https://post.futurimedia.com${state.loadedRSSImage}`;
    }
  },

  SET_RSS_IMAGE(state, data) {
    state.loadedRSSImage = data;
    if (state.loadedRSSImage.indexOf('http') === -1) {
      state.loadedRSSImage = `https://post.futurimedia.com${state.loadedRSSImage}`;
    }
  },

  SET_WIZARD_STEP_VALID(state, stepNum) {
    state.wizardSteps.steps[stepNum].isValid = true;
    if ((stepNum + 1) < state.wizardSteps.steps.length) {
      state.wizardSteps.steps[stepNum + 1].isAccessible = true;
    }
  },

  SET_WIZARD_STEP_INVALID(state, stepNum) {
    state.wizardSteps.steps[stepNum].isValid = false;
    if ((stepNum + 1) < state.wizardSteps.steps.length) {
      state.wizardSteps.steps[stepNum + 1].isAccessible = false;
    }
  },

  INCREMENT_STEP(state) {
    state.wizardSteps.currentStep++;
    state.wizardSteps.steps[state.wizardSteps.currentStep].isPreviewable = true;
    router.go({
      name: state.wizardSteps.steps[state.wizardSteps.currentStep].slug,
    });
  },

  DECREMENT_STEP(state) {
    state.wizardSteps.steps[state.wizardSteps.currentStep].isPreviewable = false;
    state.wizardSteps.currentStep--;
    router.go({
      name: state.wizardSteps.steps[state.wizardSteps.currentStep].slug,
    });
  },

  UPDATE_SHOW(state, data) {
    if (data.id) {
      if (data.id === 1) {
        state.defaultShow = data;
      } else {
        // if show already in show list, copy zindex from there
        // otherwise make zindex = maxZindex and increment maxZindex by one
        const idStr = data.id.toString();
        let newZindex = 0;
        if (_.has(state.shows, idStr)) {
          newZindex = state.shows[idStr].zindex;
        } else {
          newZindex = state.maxZindex;
          state.maxZindex += 1;
        }
        const fullData = _.extend({}, data, { zindex: newZindex });
        Vue.set(state.shows, data.id, fullData);
      }
    } else {
      alert('Fixme: data.id is null!');
    }
    // TODO: go to previous week or day view
    router.go({ name: 'calendar-week' });
  },

  UPDATE_SOCIAL_MEDIA_CONNECTIONS(state, ids) {
    const conns = ids.map(
      (id) => state.socialMediaConnections.find((it) => it.id === id));

    state.wizardEvent.social_media_connections = conns;
  },

  UPDATE_PRE_BUMPER_STATE(state, value) {
    state.wizardEvent.pre_bumper = value;
  },

  UPDATE_POST_BUMPER_STATE(state, value) {
    state.wizardEvent.post_bumper = value;
  },

  UPDATE_SOCIAL_MEDIA_CONNECTION(state, value) {
    for (let index = 0; index < state.socialMediaConnections.length; index++) {
      const nextConn = state.socialMediaConnections[index];
      if (nextConn.id === value.id) {
        const conn = _.extend({}, nextConn, value);
        state.socialMediaConnections.$set(index, conn);
        break;
      }
    }
    for (let index2 = 0; index2 < state.wizardEvent.social_media_connections.length; index2++) {
      const nextConn = state.wizardEvent.social_media_connections[index2];
      if (nextConn.id === value.id) {
        const conn = _.extend({}, nextConn, value);
        state.wizardEvent.social_media_connections.$set(index2, conn);
        break;
      }
    }
  },

  DELETE_SOCIAL_MEDIA_CONNECTION(state, conn) {
    const matchingConn = state.socialMediaConnections.find(
      existingConn => existingConn.id === conn.id);
    if (matchingConn) {
      const matchingConnIndex = state.socialMediaConnections.indexOf(matchingConn);
      state.socialMediaConnections.splice(matchingConnIndex, 1);
    }
  },

  /**
   * TOOLTIPS
   */
  OPEN_TOOLTIP(state, tooltipData) {
    state.tooltipData = tooltipData;
  },

  CLOSE_TOOLTIP(state, event) {
    if (event) {
      event.stopPropagation();
    }
    state.tooltipObject = null;
    state.tooltipData = {};
  },

  LOGOUT(state) {
    state.settings.username = '';
    state.settings.apikey = '';
    state.apikeyauth = '';
    window.location.reload();
  },
};
