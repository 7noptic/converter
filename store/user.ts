import User from '~/types/user/user.type';
import ConversionsTypes from '~/types/conversions.types';

export const state = () => ({
    user: null,
    userConversions: [],
    allUsers: []
});

export const mutations = {
    login (state, data: User) {
        state.user = data;
    },
    logout (state) {
        state.user = null;
        state.userConversions = null;
    },
    setConversionsByUserId (state, data: ConversionsTypes) {
        state.userConversions = data;
    },
    setUsers (state, data: User[]) {
        state.allUsers = data;
    }
};

export const actions = {};

export const getters = {
    user: s => s.user,
    allUsers: s => s.allUsers,
    userConversions: s => s.userConversions
};