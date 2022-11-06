// Персонажи пользователя
import IPush from '~/types/ui/push';

export const state = () => ({
    messages: []
});

export const mutations = {
    addMessage (state, data: IPush) {
        state.messages.unshift(data);
    },
    removeLastMessage (state) {
        state.messages.splice(state.messages.length - 1, 1);
    },
};

export const actions = {};

export const getters = {
    messages: s => s.messages
};
