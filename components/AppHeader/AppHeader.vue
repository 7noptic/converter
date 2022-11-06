<template>
  <v-navigation-drawer
      app
      class="pt-4"
      color="grey lighten-3"
      fixed
      mini-variant
      permanent
      disable-route-watcher
  >
    <AppHeaderAuthModal />
    <v-list
        nav
        dense
    >
      <v-list-item
          v-for="(item, key) in navLinks"
          :key="`nav-link-${key}`"
          :to="item.url"
          link
      >
        <v-list-item-icon>
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="header-list-item__title">{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ILinksIcon from '~/types/links/links-icon.types';
import AppHeaderAuthModal from '~/components/AppHeader/AppHeaderAuthModal.vue';

export default defineComponent({
  name: 'App',
  setup () {
    const navLinks = ref<ILinksIcon[]>([
      { name: 'video', url: '/video', icon: 'video' },
      { name: 'images', url: '/image', icon: 'image-multiple' },
      { name: 'music', url: '/music', icon: 'music-circle' }
    ]);

    return { navLinks };
  },
  components: { AppHeaderAuthModal }
});
</script>

<style scoped lang="scss">
.header {
  &-list {
    &-item {
      &__title {
        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>