<template>
  <div>
    <transition name="fade">
    <div v-if="isDialogShowedUp" class="background"></div>
    </transition>
    <transition name="dialog">
      <dialog v-if="isDialogShowedUp" open>
        <header>
          <h2>{{ dialogTitle }}</h2>
        </header>
        <section>
          <p>{{ dialogMsg }}</p>
        </section>
        <menu>
          <slot name="actions"></slot>
        </menu>
      </dialog>
    </transition>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: ["title", "msg"],
  computed: {
    ...mapGetters("dialog", ["isDialogShowedUp", "dialogTitle", "dialogMsg",]),
  },
  methods: {
    ...mapMutations("dialog", ["hideDialog"]),
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/Colors.scss";
@import "../../assets/Animations.scss";

.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba($black, 0.5);
  z-index: 10;
  transform: translate(0) !important;
}
dialog {
  position: fixed;
  background-color: $white;
  width: 400px;
  max-width: 90vw;
  height: fit-content;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  z-index: 11;
  header {
    border-radius: 20px 20px 0 0;
    padding: 5px;
    height: 50px;
    width: 100%;
    background-color: $teal-dark;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    color: $white;
  }
  section {
    text-align: center;
    font-weight: 400;
    padding: 10px;
    text-align: center;
  }
  menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>