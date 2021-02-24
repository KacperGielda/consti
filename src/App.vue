<template>

  <teleport to="body">  
      <base-dialog>
        <template #actions>
          <base-button @click="hideDialog">OK</base-button>
        </template>
      </base-dialog>
  </teleport>

  <the-header></the-header>
  <div class="background">
  </div>
  <router-view/>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import { mapMutations } from 'vuex'
export default {
  components: { TheHeader },
  methods:{
    ...mapMutations('dialog',['hideDialog']),
  }
};
</script>
<style lang="scss">
@import "./assets/Colors.scss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Ubuntu", sans-serif;
}
#app {
  text-align: center;
  color: $black;
  overflow-x: hidden;
  min-height: 100vh;
}
body{
  width: 100%;
  min-height: calc(100vh - 50px);
  background-image: url("assets/pexels-sami-anas-5137655.jpg");
  background-attachment: fixed;
  background-size: cover;
}
</style>
