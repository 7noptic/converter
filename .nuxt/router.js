import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _62bb8d6e = () => interopDefault(import('..\\pages\\image.vue' /* webpackChunkName: "pages/image" */))
const _a3574590 = () => interopDefault(import('..\\pages\\music.vue' /* webpackChunkName: "pages/music" */))
const _69f0c3fc = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _32f32ee4 = () => interopDefault(import('..\\pages\\video.vue' /* webpackChunkName: "pages/video" */))
const _66f17965 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/image",
    component: _62bb8d6e,
    name: "image"
  }, {
    path: "/music",
    component: _a3574590,
    name: "music"
  }, {
    path: "/profile",
    component: _69f0c3fc,
    name: "profile"
  }, {
    path: "/video",
    component: _32f32ee4,
    name: "video"
  }, {
    path: "/",
    component: _66f17965,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
