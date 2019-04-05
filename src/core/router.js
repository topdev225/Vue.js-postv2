import Vue from 'vue';
import VueRouter from 'vue-router';

import Shows from '../views/Shows';
import ShowDetails from '../views/ShowDetails';

import EditEpisodeAudio from '../views/EditEpisodeAudio';
import EditEpisodeBuildAudio from '../views/EditEpisodeBuildAudio';
import EditEpisodeInformation from '../views/EditEpisodeInformation';
import EditEpisodeImage from '../views/EditEpisodeImage';
import EditEpisodePublish from '../views/EditEpisodePublish';

import Logger from '../views/Logger';

import SettingsUserManagement from '../views/SettingsUserManagement';

// import analytics from '../components/Analytics';
// import logger from '../components/Logger';

// import settings from '../views/Settings';

// import CalendarView from '../views/CalendarView';
// import WizardView from '../views/WizardView';
// import WizardDateTime from '../components/WizardDateTime';
// import WizardDefaultText from '../components/WizardDefaultText';
// import WizardDefaultPhoto from '../components/WizardDefaultPhoto';
// import WizardPostOptions from '../components/WizardPostOptions';
// import CalendarWeek from '../components/CalendarWeek';
// import CalendarDay from '../components/CalendarDay';

/* eslint-disable no-use-before-define vars-on-top */

Vue.use(VueRouter);
const router = new VueRouter({
  // disable history api because we do not need it
  abstract: true,

  // make sure transitions trigger on initial page load
  transitionOnLoad: true,
});

router.map({
  '/': {
    name: 'shows',
    component: Shows,
    title: 'POST Shows',
  },
  '/shows': {
    name: 'shows',
    component: Shows,
    title: 'POST Shows',
  },
  '/show-details': {
    name: 'show-details',
    component: ShowDetails,
  },
  '/edit-episode-audio': {
    name: 'edit-episode-audio',
    component: EditEpisodeAudio,
    title: 'POST Edit Episode - Audio',
  },
  '/edit-episode-build-audio': {
    name: 'edit-episode-build-audio',
    component: EditEpisodeBuildAudio,
    title: 'POST Edit Episode - Build Audio',
  },
  '/edit-episode-information': {
    name: 'edit-episode-information',
    component: EditEpisodeInformation,
    title: 'POST Edit Episode - Information',
  },
  '/edit-episode-image': {
    name: 'edit-episode-image',
    component: EditEpisodeImage,
    title: 'POST Edit Episode - Image',
  },
  '/edit-episode-publish': {
    name: 'edit-episode-publish',
    component: EditEpisodePublish,
    title: 'POST Edit Episode - Publish',
  },
  '/logger': {
    name: 'logger',
    component: Logger,
    title: 'POST PPM Encoded Logger',
  },
  '/settings-user-management': {
    name: 'settings-user-management',
    component: SettingsUserManagement,
    title: 'POST Settings - User Management',
  },
});

// Show calendar-week when first starting up
router.redirect({
// '/': '/',
});

// Scroll to top upon changing a route
router.beforeEach(() => {
  window.scrollTo(0, 0);
});

export default router;
