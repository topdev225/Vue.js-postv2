import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import createLogger from 'vuex/logger';
import mutations from './mutations';
import moment from 'moment';

Vue.use(Vuex);
Vue.use(VueResource);

const debug = process.env.NODE_ENV !== 'production';
Vue.config.debug = debug;

export default new Vuex.Store({
  state: {
    // logger segments
    logger: {

      // searching for radio segments
      segmentSearchSpan: {
        startDate: {
          year: '',
          month: '',
          day: '',
          hour: '', // military time
          minute: '',
        },
        endDate: {
          year: '',
          month: '',
          day: '',
          hour: '', // military time
          minute: '',
        },
      },
      segmentSearchTerms: {
        originalSearchText: '',
        tokenizedSearchTerms: '',
      },
      segmentsSearchResults: {},
      segmentsToBeCompiled: {},
    },

    exampleList: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
    ],

    route: {},

    // system messages that can notify the user about
    // successful actions, or error, like when an
    // ajax call fails
    message: {
      active: false, // when true, display, otherwise hide
      name: 'User friendly (but vague) description',
      details: 'Scary technical details',
      type: 'success', // 'error' or 'success'
    },

    // Track what day the user has currently highlighted, and
    // when system intializes, create a moment object with the
    // current day's date/time
    dates: {
      currentMomentDate: moment(),
      currentStartOfWeek: moment().startOf('week'),
      currentDateString: '', // Jul 03, or if week displayed: Jul 03 - 09
    },

    // The logged in user's station settings
    settings: {},

    // The logged in user's apikey auth header
    apikeyauth: '',

    // query param to pass creds to nav button hrefs
    navQLinks: '',

    // The list of shows for the currently active week
    shows: {},

    // Top of the browser window
    yScrollPos: 0,

    maxZindex: 0,

    // The list of available tags
    tags: [],

    // Social media connections available
    socialMediaConnections: [],

    // Playlist categories available
    playlistCategories: [],

    // get the  userlist
    userlist: [],

    // Used to track (or limit) the user's progress
    // within the Wizard
    wizardSteps: {
      currentStep: 0,
      // the slugs and titles here will need to be adjusted
      // if the wizard sub-routes are ever changed
      steps: [{
        slug: 'date-time',
        title: 'Audio',
        isAccessible: false,
        isPreviewable: false,
        isValid: false,
        icon: {
          type: String,
          default: '',
        },
      },
      {
        slug: 'default-text',
        title: 'Information',
        isAccessible: false,
        isPreviewable: false,
        isValid: false,
        icon: true,
      },
      {
        slug: 'default-photo',
        title: 'Image',
        isAccessible: false,
        isPreviewable: false,
        isValid: false,
      },
      {
        slug: 'post-options',
        title: 'Publish',
        isAccessible: false,
        isPreviewable: false,
        isValid: false,
        rectangle_image: true,
      }],
    },

    // Event that is being edited/created in the wizard
    // See emptyEvent for fields
    wizardEvent: null,

    loadedRSSImage: '',

    // this is some test data for the currentEvent object
    emptyEvent: {
      social_media_connections: [],
      description: '',
      title: '',
      playlist_categories: [],
      post_bumper: null,
      schedule: [{
        occurs_monday: false,
        show_id: null,
        occurs_tuesday: false,
        occurs_friday: false,
        disable_date: null,
        occurs_saturday: false,
        enable_date: null,
        occurs_wednesday: false,
        occurs_thursday: false,
        id: null,
        occurs_sunday: false,
        end_time: null, // format: 05H:59M
        start_time: null, // format: 05H:59M
      }],
      id: null,
      rectangle_image: '',
      square_image: '',
      pre_bumper: null,
      parent: null,
    },

    // track the tooltip information
    tooltipData: {
      isOpen: false,
      isShow: false,
      xPos: 0,
      yPos: 0,
      defaultTime: null,
      startTime: null,
      endTime: null,
      showId: 0,
      showTitle: null,
      type: 'show',
    },
  },
  mutations,
  strict: debug,
  middlewares: debug ? [createLogger()] : [],
});
