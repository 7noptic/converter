export const state = () => ({
    banners: []
});

export const mutations = {
    setBanners (state, data) {
        state.banners = data;
    }
};

export const actions = {};

export const getters = {
    banners: s => s.banners
};