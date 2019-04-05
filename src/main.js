import App from './views/App';
import router from './core/router';
import store from './core/store'; // vuex store instance
import { sync } from 'vuex-router-sync';
import './core/filters';
import './core/moment';
import './core/pikaday';

sync(store, router);

router.start(App, '#app');
