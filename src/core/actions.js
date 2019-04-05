import Vue from 'vue';
import VueResource from 'vue-resource';
import store from './store';
// import urls from './urls';

Vue.use(VueResource);

function makeAction(type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
}

// ajax request actions
function handleAjax({ request, dispatch, mutation, errmsg, modify, callback }) {
  request.then((resp) => {
    let data = resp.data;

    // fix this here instead of everywhere else. Sometimes the data
    // is a string and it shouldn't be. This is probably because the
    // headers from the server are not saying application/json properly.
    if (typeof data === 'string') {
      if (data !== '') {
        data = JSON.parse(data);
      } else {
        data = null;
      }
    }

    if (mutation) {
      dispatch(mutation, modify ? modify(data) : data);
    }

    if (callback) {
      callback(null, data, resp);
    }
  }).catch((error) => {
    // redirect to login on unauthorized errors
    if (error.status === 401) {
      window.location = '/';
    }
    // error here can be either a javascript Error object or an http response
    // object...
    if (error.body && error.status) { // is a response?
      // convert response to an Error object
      if (typeof error.data === 'string') {
        console.log(`Error from server: ${error.data}`);
        try {
          // eslint-disable-next-line no-param-reassign
          error.data = JSON.parse(error.data);
        } catch (e) {
          // not a JSON object
          if (error.data.length < 40) {
            // short enough to display
            // eslint-disable-next-line no-param-reassign
            error.data = { error_message: error.data };
          }
        }
      }
      // TODO: process other kinds of errors
      let message = `${error.status}: ${error.statusText}`;
      if (error.data.error_message) {
        message = `${error.status}: ${error.data.error_message}`;
      }
      // ugh, django can produce two different json formats for error
      // messages... most annoying
      if (error.data.error) {
        message = `${error.status}: ${error.data.error}`;
      }
      // eslint-disable-next-line no-param-reassign
      error = new Error(message);
    }

    if (errmsg) {
      dispatch('SET_MESSAGE', {
        name: errmsg,
        details: `Server Error: ${error}`,
        type: 'error',
      });
    }

    if (callback) {
      callback(error, null, null);
    }
  });
}

function getQueryParameterByName(inName, inUrl) {
  let url = inUrl;
  if (!inUrl) url = window.location.href;
  const name = inName.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

Vue.http.interceptors.push((request, next) => {
  if (store.state.apikeyauth !== '') {
    Vue.http.headers.common.Authorization = store.state.apikeyauth;
  } else {
    const user = getQueryParameterByName('username');
    const api = getQueryParameterByName('api_key');
    if (user && api) {
      Vue.http.headers.common.Authorization = `ApiKey ${user}:${api}`;
    }
  }
  next();
});

// generic actions
export const setMessage = makeAction('SET_MESSAGE');
export const dismissMessage = makeAction('DISMISS_MESSAGE');
export const setScrollPos = makeAction('SET_SCROLL_POS');
export const setDateString = makeAction('SET_DATE_STRING');
export const decrementCalendar = makeAction('DECREMENT_CALENDAR');
export const incrementCalendar = makeAction('INCREMENT_CALENDAR');
export const setWeekRange = makeAction('SET_WEEK_RANGE');
export const setCalendarDate = makeAction('SET_CALENDAR_DATE');
export const openTooltip = makeAction('OPEN_TOOLTIP');
export const closeTooltip = makeAction('CLOSE_TOOLTIP');

// event wizard actions
export const setupWizard = makeAction('SETUP_WIZARD');
export const clearWizardData = ({ dispatch, state }) => {
  if (state.wizardEvent) {
    dispatch('CLEAR_WIZARD');
  }
};
export const setWizardStepValid = makeAction('SET_WIZARD_STEP_VALID');
export const setWizardStepInvalid = makeAction('SET_WIZARD_STEP_INVALID');
export const incrementStep = makeAction('INCREMENT_STEP');
export const decrementStep = makeAction('DECREMENT_STEP');
export const gotoStep = makeAction('GOTO_STEP');
export const updateEventTitle = makeAction('UPDATE_EVENT_TITLE');
export const updateEventDescription = makeAction('UPDATE_EVENT_DESCRIPTION');
export const updateEventTag = makeAction('UPDATE_EVENT_TAG');
export const updateEventTags = makeAction('UPDATE_EVENT_TAGS');
export const updateEventImage = makeAction('UPDATE_EVENT_IMAGE');
export const updateEventSquareImage = makeAction('UPDATE_EVENT_SQUARE_IMAGE');
export const updateEventEnableDate = makeAction('UPDATE_EVENT_ENABLE_DATE');
export const updateEventDisableDate = makeAction('UPDATE_EVENT_DISABLE_DATE');
export const updateEventRecurringDays = makeAction('UPDATE_EVENT_RECURRING_DAYS');
export const setRSSImage = makeAction('SET_RSS_IMAGE');
export const setDayOfWeek = makeAction('SET_DAY_OF_WEEK');
export const updateEventStartTime = makeAction('UPDATE_EVENT_START_TIME');
export const updateEventEndTime = makeAction('UPDATE_EVENT_END_TIME');
export const updateEventToggleWeekdays = makeAction('UPDATE_EVENT_TOGGLE_WEEKDAYS');
export const updateEventToggleWeekendDays = makeAction('UPDATE_EVENT_TOGGLE_WEEKEND_DAYS');
export const updateSocialMediaConnections = makeAction('UPDATE_SOCIAL_MEDIA_CONNECTIONS');
export const deletePreBumper = makeAction('DELETE_PRE_BUMPER');
export const deletePostBumper = makeAction('DELETE_POST_BUMPER');
export const setCroppingData = makeAction('SET_CROPPING_DATA');
export const updateUserList = makeAction('UPDATE_USER_LIST');

/**
 * FETCH SHOWS
 * This grabs a JSON list for *all* of the shows that
 * appear on the programming calendar.
 */
export const fetchShowsData = ({ dispatch }) => {
  handleAjax({
    request: Vue.http.get('api/v1/show/all.json'),
    dispatch,
    mutation: 'SET_SHOWS',
    errmsg: 'Unable to talk to server to get events for the week',
  });
};

/**
 * EVENT ACTIONS
 * Events can be a "show" or a "feature"
 */

export const fetchShowData = ({ dispatch }, showId) => {
  handleAjax({
    request: Vue.http.get(`api/v1/show/${showId}/`),
    dispatch,
    mutation: 'SET_CURRENT_SHOW',
    errmsg: 'Unable to talk to server to get requested show',
  });
};

export const fetchScheduleData = ({ dispatch }, eventId) => {
  handleAjax({
    request: Vue.http.get(`api/v1/schedule/${eventId}/`),
    dispatch,
    mutation: 'SET_CURRENT_SCHEDULE',
    errmsg: 'Unable to talk to server to get requested schedule',
  });
};

export const saveEvent = ({ dispatch, state }, event) => {
  // make a clone -- not allowed to modify event outside mutation
  const newEvent = JSON.parse(JSON.stringify(event));

  // convert parent property into a URI
  if (!state.settings || !state.settings.station_name) {
    throw new Error('Settings not loaded!');
  }
  const luser = state.settings.station_name.toLowerCase();
  const parent = newEvent.parent; // save for later
  if (parent) {
    newEvent.parent = `/${luser}/api/v1/show/${parent}/`;
  }

  // POST to create, PATCH to update
  let req = null;
  if (newEvent.id) {
    req = Vue.http.patch(`api/v1/show/${event.id}/`, newEvent);
  } else {
    req = Vue.http.post('api/v1/show/', newEvent);
  }

  handleAjax({
    request: req,
    dispatch,
    errmsg: 'Unable to talk to server to update an event',
    callback(err, show) {
      if (err) {
        return;
      }

      newEvent.parent = parent; // de-URI-ify parent
      newEvent.id = show.id;

      if (newEvent.id === 1) {
        // this is the default show, it has no schedule
        dispatch('UPDATE_SHOW', newEvent);
        return;
      }


      newEvent.schedule[0].show = show.resource_uri;

      // POST to create, PATCH to update
      let schedreq = null;
      if (newEvent.schedule[0].id) {
        schedreq = Vue.http.patch(
          `api/v1/schedule/${newEvent.schedule[0].id}/`,
          newEvent.schedule[0]);
      } else {
        schedreq = Vue.http.post('api/v1/schedule/', newEvent.schedule[0]);
      }

      handleAjax({
        request: schedreq,
        dispatch,
        mutation: 'UPDATE_SHOW',
        errmsg: 'Unable to save schedule for event',
        modify(schedule) {
          newEvent.schedule[0].id = schedule.id;
          newEvent.schedule[0].show = show.id;

          // give newEvent to UPDATE_SHOW
          return newEvent;
        },
      });
    },
  });
};

export const uploadFile = ({ dispatch }, field, file) => {
  const urls = {
    pre_bumper: 'event/upload.html',
    post_bumper: 'event/upload.html',
    default_image: 'api/v1/playlist/upload/image.html',
    square_image: 'api/v1/playlist/upload/image.html',
    rss_image: 'api/v1/playlist/upload/image.html',
  };
  const formdata = new FormData();
  if (field.indexOf('_bumper') > -1) {
    formdata.append('title', `${field} ${new Date()}`);
  }
  formdata.append('file', file);
  dispatch('SET_MESSAGE', {
    name: 'Uploading...',
    details: 'Sending data to the server...',
    type: 'success',
  });

  const req = Vue.http.post(urls[field], formdata);

  // TODO: Replace this with a progress bar or something like that
  let lastUpdate = Date.now();
  req.progress = (ev) => {
    if (ev.lengthComputable && (Date.now() - lastUpdate) > 100) {
      lastUpdate = Date.now();
      const percent = Math.floor(ev.loaded / ev.total);
      dispatch('SET_MESSAGE', {
        name: 'Uploading...',
        details: `Sending data to the server: ${percent}%`,
        type: 'success',
      });
    }
  };

  handleAjax({
    request: req,
    dispatch,
    errmsg: 'Unable to upload file to server',
    callback(err, data) {
      if (err) {
        return;
      }

      dispatch('SET_MESSAGE', {
        name: 'Uploading...',
        details: 'Waiting for server to finish processing...',
        type: 'success',
      });

      // The following will try performing a request periodically
      // until the request is successful. At which point it goes ahead
      // and triggers the mutation to update the field.
      function retry() {
        let checkReq = null;
        if (field.indexOf('image') > -1) {
          const imageUrl = data.location;
          // make sure original image available if rss image uploaded
          if (field.indexOf('rss') > -1) {
            imageUrl.replace('.thumbnail.', '.original.');
          }
          checkReq = Vue.http.head(imageUrl);
        } else {
          checkReq = Vue.http.get(
            data.location.replace(/https?:\/\/\w+(\.\w+)*\//, '/'));
        }

        handleAjax({
          request: checkReq,
          dispatch,
          mutation: `UPDATE_${field.toUpperCase()}`,
          modify() { return data; },
          callback(err2) {
            if (!err2) {
              // remove uploading message
              dispatch('DISMISS_MESSAGE');
            } else {
              // try again soon
              setTimeout(retry, 250);
            }
          },
        });
      }

      setTimeout(retry, 250);
    },
  });
};

export const getSettings = ({ dispatch }) => {
  handleAjax({
    request: Vue.http.get('api/v1/settings/'),
    dispatch,
    mutation: 'SET_STATION_SETTINGS',
    errmsg: 'Unable to fetch settings from the server',
  });
};

export const getSocialMediaConnections = ({ dispatch }) => {
  handleAjax({
    request: Vue.http.get('api/v1/socialmediaconnection/'),
    dispatch,
    mutation: 'SET_SOCIAL_MEDIA_CONNECTIONS',
    errmsg: 'Unable to fetch social media connections from the server',
  });
};

export const getPlaylistCategories = ({ dispatch }) => {
  handleAjax({
    request: Vue.http.get('api/v1/playlistcategory/'),
    dispatch,
    mutation: 'SET_PLAYLIST_CATEGORIES',
    errmsg: 'Unable to fetch playlist categories from the server',
  });
};

export const getDefaultShow = ({ dispatch }) => {
  handleAjax({
    request: Vue.http.get('api/v1/show/1/'),
    dispatch,
    mutation: 'SET_DEFAULT_SHOW',
    errmsg: 'Unable to talk to server to fetch the default show',
  });
};

export const deleteEvent = ({ dispatch }, showId) => {
  handleAjax({
    request: Vue.http.delete(`api/v1/show/${showId}/`),
    dispatch,
    callback() { fetchShowsData({ dispatch }); },
    errmsg: 'Unable to talk to server to delete an event',
  });
};

// ajax post actions
export const createTag = ({ dispatch }, tag) => {
  handleAjax({
    request: Vue.http.post('api/v1/playlistcategory/', tag),
    dispatch,
    errmsg: 'Unable to talk to server to create a tag',
    callback(err) {
      // unfortunately the server returns junk when creating new categories
      if (!err) {
        getPlaylistCategories({ dispatch });
      }
    },
  });
};

// ajax put actions
export const updateTag = ({ dispatch }, tag) => {
  handleAjax({
    request: Vue.http.patch(`api/v1/playlistcategory/${tag.id}/`),
    dispatch,
    mutation: 'UPDATE_TAG',
    modify() { return tag; },
    errmsg: 'Unable to talk to server to update a tag',
  });
};

// ajax delete actions
export const deleteTag = ({ dispatch }, tag) => {
  if (!window.confirm(`Are you sure you want to delete the tag '${tag.name}'?`)) {
    return;
  }

  handleAjax({
    request: Vue.http.delete(`api/v1/playlistcategory/${tag.id}/`),
    dispatch,
    mutation: 'DELETE_TAG',
    modify() { return tag; },
    errmsg: 'Unable to talk to server to delete a tag',
  });
};

export const addSocialMediaConnection = ({ dispatch }, conn) => {
  handleAjax({
    request: Vue.http.post('api/v1/socialmediaconnection/', conn),
    dispatch,
    errmsg: 'Unable to talk to server to add social media connection',
    callback(err) {
      if (!err) {
        getSocialMediaConnections({ dispatch });
      }
    },
  });
};

export const editSocialMediaConnection = ({ dispatch }, conn) => {
  handleAjax({
    request: Vue.http.patch(`api/v1/socialmediaconnection/${conn.id}/`, conn),
    dispatch,
    mutation: 'UPDATE_SOCIAL_MEDIA_CONNECTION',
    modify() { return conn; },
    errmsg: 'Unable to talk to server to update a social media connection',
  });
};

// ajax delete actions
export const deleteSocialMediaConnection = ({ dispatch }, conn) => {
  if (!window.confirm(`Are you sure you want to delete the connection '${conn.title}'?`)) {
    return;
  }

  handleAjax({
    request: Vue.http.delete(`api/v1/socialmediaconnection/${conn.id}/`),
    dispatch,
    mutation: 'DELETE_SOCIAL_MEDIA_CONNECTION',
    modify() { return conn; },
    errmsg: 'Unable to talk to server to delete a social media connection',
  });
};

export const getUserList = ({ dispatch }) => {
  handleAjax({
    request: Vue.http.get('api/v1/user'),
    dispatch,
    mutation: 'SET_USER_LIST',
    errmsg: 'Unable to fetch user list from the server',
  });
};

// export const getStationRoles = ({ dispatch }) => {
//   handleAjax({
//     request: Vue.http.get('api/v1/stationroles'),
//     dispatch,
//     mutation: 'SET_STATION_ROLES',
//     errmsg: 'Unable to fetch station roles from the server',
//   });
// };

export const addUserList = ({ dispatch }, conn) => {
  handleAjax({
    request: Vue.http.post('', conn),
    dispatch,
    errmsg: 'Unable to talk to server to add social media connection',
    callback(err) {
      if (!err) {
        getUserList({ dispatch });
      }
    },
  });
};

export const editUserList = ({ dispatch }, conn) => {
  handleAjax({
    request: Vue.http.patch('', conn),
    dispatch,
    mutation: 'UPDATE_USER_LIST',
    modify() { return conn; },
    errmsg: 'Unable to talk to server to update the user',
  });
};

export const badLogin = ({ dispatch }) => {
  let url = window.location.href;
  url = url.replace('post.futurimedia.com', 'bogususername:boguspassword@post.futurimedia.com');
  url = url.replace('calendar.html', 'api/v1/settings');
  handleAjax({
    request: Vue.http.get(url, {}, {}),
    dispatch,
    callback() {
      dispatch('LOGOUT');
    },
  });
};

export const logOut = ({ dispatch }) => {
  handleAjax({
    request: Vue.http.get('api/v1/logout/'),
    dispatch,
    callback() {
      badLogin({ dispatch });
    },
  });
};

export const cropSquareImage = ({ dispatch }, cropData) => {
  const event = { image: store.state.wizardEvent.square_image,
                  croppings: cropData.croppings, square: true };
  dispatch('SET_MESSAGE', {
    name: 'Processing image...',
    details: 'Sending cropping data to the server...',
    type: 'success',
  });
  handleAjax({
    request: Vue.http.post('api/v1/show/crop_image.json', event),
    dispatch,
    mutation: 'UPDATE_SQUARE_IMAGE',
    errmsg: 'Unable to talk to server to modify image',
    callback(err) {
      if (!err) {
        dispatch('DISMISS_MESSAGE');
      }
    },
  });
};

export const cropRectangleImage = ({ dispatch }, cropData) => {
  const event = { image: store.state.wizardEvent.rectangle_image,
                  croppings: cropData.croppings, square: false };
  dispatch('SET_MESSAGE', {
    name: 'Processing image...',
    details: 'Sending cropping data to the server...',
    type: 'success',
  });
  handleAjax({
    request: Vue.http.post('api/v1/show/crop_image.json', event),
    dispatch,
    mutation: 'UPDATE_DEFAULT_IMAGE',
    errmsg: 'Unable to talk to server to modify image',
    callback(err) {
      if (!err) {
        dispatch('DISMISS_MESSAGE');
      }
    },
  });
};

export const cropImage = ({ dispatch }, cropData) => {
  if (cropData.id === 'rectangle_photo') {
    cropRectangleImage({ dispatch }, cropData);
  } else {
    cropSquareImage({ dispatch }, cropData);
  }
};
