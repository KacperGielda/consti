<template>
  <div class="activity">
    <header>
      <div class="title">
        {{ activity.title }}
      </div>
      <div class="progress">{{ activity.progress }}%</div>
      <div class="options">
        <ion-icon name="calendar-outline" class="calendar"></ion-icon>
      </div>
    </header>
    <form>
      <term-picker v-for="(day, index) in weekDays" :key="index" :title="day" :day-data="terms[index]" :day="index" :id="id" v-model:error='error'></term-picker>
      <base-button v-if="!error">Zapisz</base-button>
    </form>
    <section>
      <base-task-list
        :sub-tasks="activity.subTasks"
        :activity-id="Number(id)"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TermPicker from "../components/activity/TermPicker";
export default {
  props: ["id"],
  components: {
    TermPicker,
  },
  data() {
    return {
      weekDays: [
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
        "Niedziela",
      ],
      error: null,
    };
  },
  computed: {
    ...mapGetters("activities", ["activityById", "termsById"]),
    activity() {
      return this.activityById(Number(this.id));
    },
    terms() {
      return this.termsById(Number(this.id));
    },
  },
  mounted() {
    // console.log(this.terms);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/Colors.scss";
.activity {
  padding-top: 75px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  header {
    width: 900px;
    max-width: 95vw;
    background: rgba($black, 0.5);
    box-shadow: 2px 2px rgba($black, 0.1);
    color: $white;
    height: 75px;
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    .title {
      margin-right: 50px;
    }
    .progress {
      margin-right: auto;
    }
    .options {
      .calendar {
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
  }
  form {
    background-color: $white;
    width: 800px;
    max-width: 90vw;
    margin: 10px;
    border-radius: 20px;
    box-shadow: 2px 2px rgba($black, 0.1);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding: 20px;
  }
}
</style>