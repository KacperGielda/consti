<template>
  <div class="activity">
    <header>
      <div class="time-stamps">
        {{ timeStampsText }}
      </div>
      <div class="title" @click="togleTasksVivsibility">
        {{ activity.title }}
      </div>
    </header>
    <section v-show="showTasks">
      <base-task-list :sub-tasks="activity.subTasks" :activity-id="id"></base-task-list>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["title", "id", "time-stamps"],
  data() {
    return {
      showTasks: false,
    };
  },
  computed: {
    ...mapGetters("date", ["today", "displayedDate"]),
    ...mapGetters("activities", ["activityById"]),
    activity() {
      return this.activityById(this.id);
    },
    timeStampsText() {
      let texts = ["", ""];
      this.timeStamps.forEach((element, index) => {
        let decimal = element - Math.floor(element);
        decimal *= 60;
        texts[index] += `${Math.floor(element)}:${
          decimal == 0 ? "00" : decimal
        }`;
      });

      return `${texts[0]}-${texts[1]}`;
    },
  },
  methods: {
    togleTasksVivsibility() {
      this.showTasks = !this.showTasks;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
.activity {
  width: 700px;
  max-width: 90vw;
  margin: 10px;
  border-radius: 20px;
  header {
    border-radius: 20px;
    height: 75px;
    background-color: $white;
    color: $teal-dark;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 2px 2px rgba($black, 0.1);
    .title {
      font-size: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>