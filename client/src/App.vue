<template>
  <teleport to="body">
    <base-dialog>
      <template v-if="dialogType == 'default'" #actions>
        <base-button @click="hideDialog">OK</base-button>
      </template>
      <template v-else #actions>
        <base-button v-if="dialogType == 'choice-delete'" @click="dialogYesDel">Tak</base-button>
        <base-button v-if="dialogType == 'choice-deactivate'" @click="dialogYesDeactivate">Tak</base-button>
        <base-button @click="hideDialog">Nie</base-button>
      </template>
    </base-dialog>
  </teleport>

  <the-header></the-header>
  <div class="background"></div>
  <router-view v-slot="{ Component }">
    <transition name="routes" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import localForage from "localforage";
// import axios from "axios";
import TheHeader from "./components/layout/TheHeader.vue";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: { TheHeader },
  methods: {
    ...mapMutations("dialog", ["hideDialog"]),
    ...mapActions("dialog", ["dialogYesDel", "dialogYesDeactivate"]),
  },
  computed: {
    ...mapGetters("dialog", ["dialogType"]),
    ...mapGetters("activities", ["activeTasks", "activities"])
  },
  watch: {
    dialogType(value) {
      console.log(value);
    },
  },
  async mounted() {
    const lastModified = await localForage.getItem("lastModified");
    const refreshToken = await localForage.getItem('refreshToken');

    if(refreshToken) this.$store.commit('setRefreshToken', refreshToken);

    if (!lastModified) {
      localForage.setItem("lastModified", new Date());
      localForage.setItem("activities", [
        ...this.activities.active,
        ...this.activities.notActive
      ]);
      localForage.setItem(
        "activeTasks",
        JSON.parse(JSON.stringify(this.activeTasks))
      );
      return;
    }
   
  
      this.$store.dispatch("setDataProvider").then(()=>
        this.$store.dispatch('activities/fetchData')
      );


  
    
  }
};
</script>
<style lang="scss">
@import "./assets/Colors.scss";
@import "./assets/Animations.scss";
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
body {
  width: 100%;
  min-height: calc(100vh - 50px);
  background-image: url("assets/pexels-sami-anas-5137655.jpg");
  background-attachment: fixed;
  background-size: cover;
}
</style>
