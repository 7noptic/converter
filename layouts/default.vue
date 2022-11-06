<template>
  <v-app>
    <AppHeader />
    <AppNotification />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="app__title mt-5 pa-5">{{ $route.name }}</h1>
          </v-col>
        </v-row>
        <Nuxt />

      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import AppHeader from '~/components/AppHeader/AppHeader.vue';
import AppNotification from '@/components/AppNotification/AppNotification.vue';
import User from '@/types/user/user.type';
import { defineComponent } from 'vue';
import converterModeTypes from '~/components/AppConverter/converter-mode.types';
import BannersTypes from '@/types/banners.types';

export default defineComponent({
  name: 'default',
  components: { AppHeader, AppNotification },
  mounted () {
    this.getUsers();
    this.getConversionsByUserId();
    this.getBanners();
    this.$nuxt.$on('update-users', this.getUsers);
    this.$nuxt.$on('update-conversions', this.getConversionsByUserId);
  },
  computed: {
    user (): User {
      return this.$store.getters['user/user'];
    }
  },
  methods: {
    getBanners () {
      this['$API'].getBanners((data: BannersTypes[]) => {
        this['$store'].commit('info/setBanners', data);
      }, (e: any) => {
        console.log('aaa');
      });
    },
    getUsers () {
      this['$API'].getUsers((data: User[]) => {
        this['$store'].commit('user/setUsers', data);
      }, (e: any) => {
        console.log('aaa');
      });
    },
    getConversionsByUserId () {
      if (this.user?.id) {
        this['$API'].getConversionsByUserId(this.user.id, (data: converterModeTypes) => {
          this['$store'].commit('user/setConversionsByUserId', data);
          this.$nuxt.$emit('update-conversions-ui');
        }, (e: any) => {
          console.log('aaa');
        });
      }
    }
  }
});
</script>

<style scoped lang="scss">
.app {
  &__title {
    &:first-letter {
      text-transform: uppercase;
    }
  }
}

</style>