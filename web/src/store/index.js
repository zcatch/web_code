import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            loading: false,
        };
    },
    mutations: {
        SET_LOADING(state, payload) {
            state.loading = payload;
        },
    },
    actions: {},
    modules: {},
});
