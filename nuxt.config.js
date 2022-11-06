import { resolve } from 'path';

export default {
    env: {
        PROXY: process.env.PROXY || '',
        isDev: process.env.NODE_ENV === 'development'
    },
    server: process.env.NODE_ENV === 'development'
        ? { host: '0.0.0.0' }
        : {},
    ssr: false,
    target: 'static',
    alias: {
        'style': resolve(__dirname, './assets/style')
    },
    dev: process.env.NODE_ENV !== 'production',
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/style-resources',
        [
            'nuxt-vuex-localstorage',
            {
                mode: process.env.NODE_ENV !== 'production' ? 'debug' : 'auto',
                // localStorage: ["user"] //  If not entered, “localStorage” is the default value
                sessionStorage: ['user'] //  If not entered, “sessionStorage” is the default value
            }
        ]
    ],
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/vuetify'
    ],
    plugins: [
        {
            'src': '~/plugins/api.js',
            'ssr': false
        },
        {
            'src': '~/plugins/axios.js',
            'ssr': false
        }
    ],
    components: true,
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'https://6363ed228a3337d9a2ec9f69.mockapi.io'
    },

    proxy: process.env.PROXY
        ? {
            '/server': {
                target: process.env.PROXY
                // pathRewrite: { "^/server": "/" }
            },
            '/socket.io': {
                target: process.env.PROXY
                // pathRewrite: { "^/socket.io": "/" }
            },
            '/api': {
                target: process.env.PROXY
                // pathRewrite: { "^/api": "/" }
            }
        }
        : {},

    vue: {
        config: {
            devtools: process.env.NODE_ENV === 'development'
        }
    }
};