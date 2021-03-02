<template>
  <div class="activity">
    <header>
      <div v-if="!titleEditMode" class="title" @click="changeTitle">
        {{ title }}
      </div>
      <input
        v-if="titleEditMode"
        type="text"
        v-model="newTitle"
        @keypress.enter="changeTitle"
        :placeholder="placeholder"
      />
      <div class="progress">{{ activity.progress }}% <base-button @click="resetSubTasks(id)">Resetuj</base-button></div>
      <div class="options">
        <ion-icon name="calendar-outline" class="calendar"></ion-icon>
      </div>
    </header>
    <form @submit.prevent="save">
      <term-picker
        v-for="(day, index) in weekDays"
        :key="index"
        :title="day"
        :day-data="terms[index]"
        :day="index"
        :id="id"
        v-model:value="pickedTerms[index]"
      ></term-picker>
      <base-button v-if="allowToSave">Zapisz</base-button>
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
import { mapGetters, mapActions } from "vuex";
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
      pickedTerms: [],
      titleEditMode: false,
      newTitle: "",
      placeholder: "",
      title: "",
      allowToSave: false,
    };
  },
  computed: {
    ...mapGetters("activities", ["activityById", "termsById"]),
    activity() {
      return this.activityById(Number(this.id));
    },
    terms() {
      console.log('dupa');
      return JSON.parse(JSON.stringify(this.termsById(Number(this.id))));
    },
  },
  watch: {
    activityTitle(newValue) {
      this.newTitle = newValue;
    },
    pickedTerms: {
      deep: true,
      handler(value) {
        console.log(value);
        if (value.findIndex((el) => el.status == "error") != -1)
          this.allowToSave = false;
        else if (value.findIndex((el) => el.status == "changed") != -1)
          this.allowToSave = true;
        else this.allowToSave = false;
        // else this.allowToSave = true;
      },
    },
  },
  mounted() {
    // console.log(this.terms);
    this.newTitle = this.activity.title;
    this.title =
      this.activity.title !== ""
        ? this.activity.title
        : "Kliknij aby dodać tytuł";

    for (let i = 0; i < 7; i++) {
      this.pickedTerms.push({
        timeStamps: null,
        el: "",
      });
    }
  },
  methods: {
    ...mapActions('activities',['resetSubTasks']),
    changeTitle() {
      console.log("ada");
      if (this.titleEditMode) {
        this.title = this.newTitle;
        this.activity.title = this.newTitle;
      }
      this.titleEditMode = !this.titleEditMode;
    },
    save() {
      const changedTermsIndexes = [];
      this.pickedTerms.forEach((el, index) => {
        console.log(el);
        if (el.status == "changed") changedTermsIndexes.push(index);
      });

      console.log(changedTermsIndexes);
      changedTermsIndexes.forEach((el) => {
        this.$store.dispatch("activities/updateActiveTasks", {
          id: Number(this.id),
          weekDay: el,
          timeStamps: this.pickedTerms[el].timeStamps,
          show: this.pickedTerms[el].show,
        });
      });

      //   }
      // }
    },
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
      font-size: 18px;
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
    input {
      margin-right: 20px;
      font-size: 18px;
      background: none;
      color: $white;
      border: none;
      border-bottom: solid $teal 1px;
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