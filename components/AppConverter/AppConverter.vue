<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Converter {{ type }}</h2>
      </v-col>
      <v-col cols="12">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  md="4"
              >
                <v-file-input
                    v-if="type === 'video'"
                    accept="video/mp4,video/x-m4v,video/"
                    placeholder="Pick an video file"
                    prepend-icon="mdi-video"
                    label="Video"
                    multiple
                    @change="uploadFile"
                />
                <v-file-input
                    v-else-if="type === 'image'"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an image file"
                    prepend-icon="mdi-image-multiple"
                    label="Image"
                    multiple
                    @change="uploadFile"
                />
                <v-file-input
                    v-else-if="type === 'music'"
                    accept=".mp3"
                    placeholder="Pick an music file"
                    prepend-icon="mdi-music-circle"
                    label="Music"
                    multiple
                    @change="uploadFile"
                />
                <v-file-input
                    v-else
                    placeholder="Pick an file"
                    label="File"
                    :value="files"
                    @change="uploadFile"
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                    class="ma-2"
                    :loading="settings.btn.loading"
                    :disabled="settings.btn.loading || settings.btn.state === 'disabled'"
                    :color="settings.btn.condition"
                    @click="convert"
                >
                  {{ settings.btn.text }}
                </v-btn>
              </v-col>

            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ConverterModeTypes from './converter-mode.types';
import { reactive, ref } from 'vue';
import User from '~/types/user/user.type';
import ConverterAddTypes from '~/components/AppConverter/converter-add.types';
import ConverterSettingsTypes from '~/components/AppConverter/converter-settings.types';

export default {
  name: 'AppConverter',
  setup () {
    const settings = reactive<ConverterSettingsTypes>({
      btn: {
        text: 'Convert',
        state: 'disabled',
        condition: 'primary',
        loading: false
      }
    });
    const files = ref<File[]>([]);
    return { settings, files };
  },
  computed: {
    user (): User {
      return this['$store'].getters['user/user'];
    }
  },
  props: {
    type: {
      required: true,
      type: String.toString() as ConverterModeTypes
    }
  },
  methods: {
    uploadFile (file: File[] | null) {
      if (!file) {
        this.settings.btn.state = 'disabled';
      } else {
        this.files = file;
        this.settings.btn.state = '';
      }
    },
    convert () {
      const success = Math.random() > 0.5;
      console.log([...this.files.map(item => item.name)]);
      if (this['user']) {
        this['$API'].addConversionByUserId(this['user'].id, {
          type: this.type,
          success,
          files: [...this.files.map(item => item.name)]
        }, () => {
          this.$nuxt.$emit('update-conversions');
        }, (e) => {
          console.log(e);
        });
        this.isSuccess(success);
      } else {
        this.isSuccess(success);
      }
    },
    isSuccess (success: boolean) {
      success
          ? this['$store'].commit('push/addMessage', { text: 'Файл успешно загружен' })
          : this['$store'].commit('push/addMessage', {
            text: 'Что-то пошло не так, попробуйте еще раз',
            type: 'warning'
          });
    }
  }
};
</script>

<style scoped>

</style>