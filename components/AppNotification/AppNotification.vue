<template>
  <div class="note">
    <transition-group
        name="v-transition-animate"
        class="note-list"
    >
      <div
          v-for="(message, i) in messages"
          :key="`message-${i}`"
          :class="['note-list__item', message.type]"
      >
        <div class="note-list__text" v-html="message.text" />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import IPush from '@/types/ui/push';
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    messages () {
      return this.$store.getters['push/messages'];
    }
  },
  watch: {
    messages () {
      this.hideNote();
    }
  },
  mounted () {
    this.hideNote();
    this.$nuxt.$on('show-push', this.addNote);
  },
  methods: {
    /**
     * Добавление уведомлений
     */
    addNote ({ text, type }: IPush) {
      this.$nuxt.$store.commit('push/addMessage', { text, type });
    },
    /**
     * Удаление уведомлений
     */
    hideNote () {
      const vm = this;
      if (this.$store.getters['push/messages'].length) {
        setTimeout(function () {
          vm.$store.commit('push/removeLastMessage');
        }, 5000);
      }
    }
  }
});
</script>

<style scoped lang="scss">
.note {
  position: fixed;
  bottom: 2vw;
  left: 2vw;
  z-index: 100000;
  //pointer-events: none; // Не добавлять в пушах есть ссылки
  &-list {
    display: flex;
    flex-direction: column-reverse;

    &__item {
      padding: 30px;
      max-width: 30vw;
      height: auto;
      background: rgba(29, 119, 59, .6);
      border: 1px solid #1d773b;
      box-shadow: 0 4px 36px rgba(29, 119, 59, .25);
      border-radius: 4px;
      margin-bottom: 2vh;
      margin-bottom: calc(var(--vh, 1vh) * 2);
      overflow: hidden;
      max-height: 30vh;
      max-height: calc(var(--vh, 1vh) * 30);


      &.warning {
        border: 1px solid #792020;
        box-shadow: 0 4px 36px rgba(121, 32, 32, .25);
        background: rgba(121, 32, 32, .6);
      }

      &.info {
        border: 1px solid #d7a93c;
        box-shadow: 0 4px 36px rgba(215, 169, 60, .25);
        background: rgba(215, 169, 60, .6);
      }
    }

    &__text {
      color: #fff;
      font-size: 1.2vw;
      font-weight: 500;

      &::first-letter {
        text-transform: uppercase;
      }
    }
  }

}


.v-transition-animate {
  &-enter {
    transform: translateX(-120px);
    opacity: 0;
  }

  &-enter-active {
    transition: all .6s ease;
  }

  &-enter-to {
    opacity: 1;
  }

  &-leave {
    height: auto;
    opacity: 1;
  }

  &-leave-active {
    transition: transform .6s ease, opacity .6s, height .6s .2s;

  }

  &-leave-to {
    transform: translateX(-120px);
    opacity: 0;
  }

  &-move {
    transition: transform .6s ease;
  }
}

</style>
