<template>
  <div class="activities">
    <h2>Aktywne</h2>
    <ul v-if="activeExist">
      <li v-for="activity in activities.active" :key="activity.id">
        <activity-item :activity="activity"></activity-item>
      </li>
    </ul>
    <h3 v-else><activity-item :activity="null"></activity-item></h3>

    <h2>Nie Aktywne</h2>
    <ul v-if="notActiveExist">
      <li v-for="activity in activities.notActive" :key="activity.id">
        <activity-item :activity="activity"></activity-item>
      </li>
    </ul>
    <h3 v-else><activity-item :activity="null"></activity-item></h3>
    <teleport to="body">
      <div class="add" @click="createActivity">
        <ion-icon name="add-circle-outline"></ion-icon>
      </div>
    </teleport>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ActivityItem from "../components/activities/ActivityItem";
export default {
  components: {
    ActivityItem,
  },
  computed: {
    ...mapGetters("activities", ["activities"]),
    activeExist() {
      return this.activities.active.length > 0;
    },
    notActiveExist() {
      return this.activities.notActive.length > 0;
    },
  },
  methods: {
    createActivity() {
      this.$store
        .dispatch("activities/createActivity")
        .then((res) => this.$router.push({ path: `/activities/${res}` }));
    },
  },
  mounted(){
    this.activities.active.forEach(el => {
      if (el.title == '') this.$store.dispatch('activities/deleteActivity', el.id);
    });
    this.activities.notActive.forEach(el => {
      if (el.title == '') this.$store.dispatch('activities/deleteActivity', el.id);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/Colors.scss";
.activities {
  padding-top: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
ul {
  list-style: none;
}
h2 {
  background-color: $teal;
  width: 700px;
  max-width: 90vw;
  padding: 20px 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: $white;
}
.add {
  position: fixed;
  background-color: $teal;
  width: 100px;
  height: 100px;
  right: 50px;
  bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  font-size: 70px;
  color: white;
  @media (max-width: 500px) {
    width: 75px;
    height: 75px;
    right: 25px;
    bottom: 25px;
    font-size: 50px;
  }
  &:hover {
    background-color: $teal-dark;
    cursor: pointer;
  }
}
</style>