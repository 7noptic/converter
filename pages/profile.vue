<template>
  <v-row>
    <v-col
        cols="12"
        md="6"
        xl="4"
    >
      <v-card
          class="ma-3"
          tile
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Your conversion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
            v-for="item in conversions"
            :key="`conversion-${user.id}-${item.id}`"
        >
          <v-list-item-content>
            <v-card class="pa-3" :color="item.success ? 'green' : 'red'">
              <v-icon v-if="item.type === 'video'">mdi-video</v-icon>
              <v-icon v-else-if="item.type === 'image'">mdi-image-multiple</v-icon>
              <v-icon v-else-if="item.type === 'music'">mdi-music-circle</v-icon>
              <v-icon v-else>mdi-file</v-icon>
              <span><v-icon>mdi-file</v-icon> - {{ item.files.length }}</span>
            </v-card>
          </v-list-item-content>
        </v-list-item>

      </v-card>


    </v-col>
    <v-col
        cols="12"
        md="6"
        xl="4"
    >
      <v-card
          class="ma-3"
          tile
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>your data</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Name</v-list-item-title>
            <v-list-item-subtitle>{{ user.name }} {{ user.last_name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-icon
          large
          color="orange darken-2"
          class="ma-3 pa-2"
          @click="logout"
      >
        mdi-account-arrow-right
      </v-icon>
    </v-col>

  </v-row>

</template>

<script lang="ts">
import User from '@/types/user/user.type';
import { defineComponent } from 'vue';
import ConversionsTypes from '~/types/conversions.types';

export default defineComponent({
  name: 'profile',
  data () {
    return {
      triggerCount: 0 as number
    };
  },
  computed: {
    user (): User {
      return this['$store'].getters['user/user'];
    },
    conversions (): ConversionsTypes {
      let trigger = this.triggerCount;
      return this['$store'].getters['user/userConversions'];
    }
  },
  mounted () {
    if (!this.user) {
      this.$router.push('/');
    } else {
      this.$nuxt.$on('update-conversions-ui', this.updateTrigger);
    }
  },
  methods: {
    updateTrigger () {
      this.triggerCount += 1;
    },
    logout () {
      this.$store.commit('user/logout');
      this.$router.push('/');
    }
  }
});
</script>

<style scoped lang="scss">

</style>