import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import comments from './modules/comments';

export default new Vuex.Store({
	modules: {
		comments
	}
});