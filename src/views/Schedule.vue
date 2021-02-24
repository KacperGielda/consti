<template>
  <div class="schedule">
    <div class="controls-container">
      <header>
        <h2>{{ dateText }}</h2>
        <div class="controls-btn" @click="toggleCalendarVisibility">
          <ion-icon name="calendar-outline"></ion-icon>
        </div>
      </header>
      <transition name="slide">
        <section v-show="showCalendar">
          <calendar />
        </section>
      </transition>
    </div>
    <activity v-for="activity in selectedDayActivities" :key="activity.id" :time-stamps="activity.timeStamps" :id="activity.id" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Calendar from "../components/schedule/Calendar";
import Activity from "../components/schedule/Activity";
export default {
  components: {
    Calendar,
    Activity
  },
  data() {
    return {
      showCalendar: false,
    };
  },
  computed: {
    ...mapGetters("date", {
      dateText: "selectedDateText",
      selectedDay: "selectedDateWeekDay",
    }),
    ...mapGetters("activities", ["activeTasks"]),
    selectedDayActivities() {
      return this.activeTasks[this.selectedDay];
    },
  },
  methods: {
    toggleCalendarVisibility() {
      this.showCalendar = !this.showCalendar;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/Colors.scss";
@import "../assets/Animations.scss";

.schedule {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  margin-top: 50px;
}
.controls-container {
  width: 700px;
  max-width: 90vw;
  margin: 20px;
  overflow: hidden;
  header {
    background: rgba($black, 0.5);
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    h2,
    .controls-btn {
      color: $white;
      font-size: 30px;
    }
    h2 {
      margin-left: auto;
    }
    .controls-btn {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      margin-right: 10px;
      &:hover {
        cursor: pointer;
        color: $teal;
      }
    }
  }
  section {
    padding-top: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>