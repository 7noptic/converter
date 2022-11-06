export default function ({ $axios, store }) {
    $axios.setToken(store.getters['user.ts/token'], 'Bearer');
}
