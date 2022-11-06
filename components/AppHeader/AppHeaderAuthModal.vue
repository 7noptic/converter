<template>
  <div>
    <v-dialog
        v-model="authModal"
        persistent
        max-width="600px"
        @click:outside="toggleModal"
    >
      <v-card>
        <v-tabs
            v-model="modalTabs"
            background-color="deep-purple accent-4"
            centered
            dark
            icons-and-text
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-login" @click="replaceState('login')">
            Login
            <v-icon>mdi-login</v-icon>
          </v-tab>

          <v-tab href="#tab-register" @click="replaceState('register')">
            Register
            <v-icon>mdi-account-plus</v-icon>
          </v-tab>


        </v-tabs>

        <v-tabs-items v-model="modalTabs">
          <v-tab-item
              value="tab-login"
          >
            <v-card flat>
              <v-card-text>
                <template>
                  <v-form v-model="authForm.valid">
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                              v-model="authForm.inputs.email"
                              label="E-mail"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                              v-model="authForm.inputs.password"
                              name="input-10-2"
                              label="Password"
                              hint="At least 8 characters"
                              counter
                          ></v-text-field>
                        </v-col>
                      </v-row>

                    </v-container>
                  </v-form>
                </template>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item
              value="tab-register"
          >
            <v-card flat>
              <v-card-text>
                <v-row>
                  <v-col
                      cols="12"
                      md="6"
                  >
                    <v-text-field
                        v-model="authForm.inputs.firstname"
                        :counter="10"
                        label="First name"
                        required
                    ></v-text-field>
                  </v-col>

                  <v-col
                      cols="12"
                      md="6"
                  >
                    <v-text-field
                        v-model="authForm.inputs.lastname"
                        :counter="10"
                        label="Last name"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      md="6"
                  >
                    <v-text-field
                        v-model="authForm.inputs.email"
                        label="E-mail"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      md="6"
                  >
                    <v-text-field
                        v-model="authForm.inputs.password"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                    ></v-text-field>
                  </v-col>

                </v-row>

              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

        <v-card-actions>
          <v-alert
              v-for="(item, key) in errors"
              :key="`auth-error-${key}`"
              color="red darken-1"
              class="ma-1 pa-3"
              dark
          >
            {{ item }}
          </v-alert>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="toggleModal"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="auth"
          >
            {{ authForm.mode === 'login' ? 'Log in' : 'Register' }}
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar v-if="user" @click="$router.push('/profile')" style="cursor:pointer;">
          <v-img :src="`https://randomuser.me/api/portraits/men/${user.id}.jpg`"></v-img>
        </v-list-item-avatar>
        <v-avatar
            v-else
            color="red darken"
            size="36"
            class="d-block text-center"
            style="cursor: pointer"
            @click="toggleModal"
        ></v-avatar>
      </v-list-item>
    </v-list>


    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { ref } from 'vue';
import IAuthForm from '~/components/AppHeader/auth-form.types';
import User from '~/types/user/user.type';
import AuthModalState from './auth-modal.state';


export default defineComponent({
  name: 'AppHeaderAuthModal',
  setup () {
    const authModal = ref<Boolean>(false);
    const modalTabs = ref<null>(null);
    const authForm = reactive<IAuthForm>({
      valid: false,
      mode: 'login',
      inputs: {
        firstname: '',
        lastname: '',
        email: 'email 1',
        password: 'password 1'
      }
    });
    const errors = ref<string[]>([]);

    return { authModal, modalTabs, authForm, errors };
  },
  computed: {
    user (): User {
      return this.$store.getters['user/user'];
    }
  },
  methods: {
    auth () {
      switch (this.authForm.mode) {
        case 'register':
          this.register();
          break;
        case 'login':
          this.login();
          break;
      }
    },
    async login () {
      this.errors.length = 0;
      if (!this.authForm.inputs.email || !this.authForm.inputs.password) {
        this.errors.push('Все поля обязательны для заполнения');
        return;
      }
      try {
        const id = await this.getIdByEmailPassword();

        if (id) {
          this['$API'].getUserById(id, (data) => {
            this.$store.commit('user/login', data);
            this.$nuxt.$emit('update-conversions');
            this.toggleModal();
            this.$nuxt.$emit('show-push', {
              text: 'Пользователь успешно авторизован'
            });
            this.$router.push('/');
          }, (e) => {
            this.errors.push('Что-то пошло не так, попробуйте обновить страницу');
          });
        } else {
          this.errors.push('Не правильный логин или пароль');
        }
      } catch (e) {
        console.log(e);
      }
    },
    getIdByEmailPassword (): Pick<User, 'id'> | undefined {
      return this.$store.getters['user/allUsers'].find((item: User) => item.email === this.authForm.inputs.email && item.password === this.authForm.inputs.password)?.id;
    },
    async register () {
      this.errors.length = 0;
      if (!this.authForm.inputs.firstname || !this.authForm.inputs.lastname || !this.authForm.inputs.email || !this.authForm.inputs.password) {
        this.errors.push('Все поля обязательны для заполнения');
        return;
      }
      try {
        await this['$API'].registerUser({
          name: this.authForm.inputs.firstname,
          last_name: this.authForm.inputs.lastname,
          email: this.authForm.inputs.email,
          password: this.authForm.inputs.password
        }, () => {
          this.$nuxt.$emit('update-users');
          this.$nuxt.$emit('update-conversions');
          this.toggleModal();
          this.$store.commit('push/addMessage', {
            text: 'Вы успешно зарегистрированы'
          });
        }, (e) => {
          console.log(e);
        });
      } catch (e) {
        console.log(e);
      }
    },

    replaceState (state: AuthModalState) {
      this.errors.length = 0;
      this.authForm.mode = state;
    },
    toggleModal () {
      this.authModal = !this.authModal;
    }
  }
});
</script>

<style scoped>

</style>