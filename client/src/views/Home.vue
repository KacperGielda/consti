<template>
  <div class="home">
  
    <transition name="right-to-left" mode="out-in">
      <component
        :is="currentComponent"
        @changeMode="changeCurrentComponent"
      ></component>
    </transition>
  </div>
</template>

<script>
import Login from "../components/home/Login";
import Register from "../components/home/Register";

export default {
  components: { Login, Register },
  data() {
    return {
      currentComponent: "Login",
    };
  },
  methods: {
    changeCurrentComponent() {
      if (this.currentComponent == "Login") {
        this.currentComponent = "Register";
      } else {
        this.currentComponent = "Login";
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/Animations.scss";
.home {
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>