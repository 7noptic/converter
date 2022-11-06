<template>
  <v-row>
    <v-carousel>
      <v-carousel-item
          v-for="item in banners"
          :key="item.id"
      >
        <v-sheet
            :color="item.images"
            height="100%"
            tile
        >
          <v-row
              class="fill-height"
              align="center"
              justify="center"
              style="flex-direction: column"
          >

            <div class="text-h2 mb-2">
              {{ item.text }}
            </div>
            <div class="text-h3">
              {{ item.description }}
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BannersTypes from '@/types/banners.types';

export default defineComponent({
  name: 'index',
  data () {
    return {
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange'
      ]
    };
  },
  computed: {
    banners (): BannersTypes[] {
      return this.$store.getters['info/banners'];
    }
  }
});
</script>

<style scoped>

</style>