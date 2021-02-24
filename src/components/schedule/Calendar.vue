<template>
  <div class="calendar">
    <header>
      <ion-icon
        name="chevron-back-outline"
        class="nav-btn"
        @click="previousMonth()"
      ></ion-icon>
      {{ dateText }}
      <ion-icon
        name="chevron-forward-outline"
        class="nav-btn"
        @click="nextMonth()"
      ></ion-icon>
    </header>
    <section>
      <div class="grid">
        <div class="label">Pon</div>
        <div class="label">Wto</div>
        <div class="label">Śro</div>
        <div class="label">Czw</div>
        <div class="label">Pią</div>
        <div class="label">Sob</div>
        <div class="label">Nie</div>
        <div
          v-for="(day, index) in days"
          :key="index"
          class="calendar-day"
          :class="day.type"
          @click="selectDay({ month: day.type, day: day.content })"
        >
          {{ day.content }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("date", {
      selected: "selected",
      today: "today",
      displayedDate: "displayedDate",
      displayedYear: "displayedYear",
      displayedMonth: "displayedMonth",
      displayedDay: "displayedDay",
      dateText: 'displayedDateText',
    }),

    days() {
      const thisYear = this.displayedYear;
      const thisMonth = this.displayedMonth;

      const previousMonth = thisMonth != 0 ? thisMonth - 1 : 11;
      const nextMonth = thisMonth != 11 ? thisMonth + 1 : 0;

      const canBeSelected = (month, year) => {
        return month === this.selected.month && year === this.selected.year;
      };

      const daysInThisMonth = 32 - new Date(thisYear, thisMonth, 32).getDate();
      const daysInPreviousMonth =
        32 - new Date(thisYear, previousMonth, 32).getDate();
      const firstDay = new Date(thisYear, thisMonth, 0).getDay();

      const days = [];

      const CanBeToday =
        this.today.getMonth() === thisMonth &&
        this.today.getFullYear() === thisYear;

      const currentCanBeSelected = canBeSelected(thisMonth, thisYear);
      for (let i = 1; i <= daysInThisMonth; i++) {
        let type =
          CanBeToday && this.today.getDate() === i ? "today" : "current";

        if (currentCanBeSelected && i === this.selected.day) {
          type += " selected";
        }

        days.push({
          content: i,
          type,
        });
      }

      const previousCanBeSelected = canBeSelected(
        previousMonth,
        thisMonth != 0 ? thisYear : thisYear - 1
      );
      for (
        let i = daysInPreviousMonth;
        i > daysInPreviousMonth - firstDay;
        i--
      ) {
        days.unshift({
          content: i,
          type: `before${
            previousCanBeSelected && i === this.selected.day ? " selected" : ""
          }`,
        });
      }

      const nextCanBeSelected = canBeSelected(
        nextMonth,
        thisMonth != 11 ? thisYear : thisYear + 1
      );
      for (let i = 1; days.length < 42; i++) {
        days.push({
          content: i,
          type: `after${
            nextCanBeSelected && i === this.selected.day ? " selected" : ""
          }`,
        });
      }

      return days;
    },
  },
  methods: {
    nextMonth() {
      this.$store.commit("date/updateDisplayedDate", {
        year: this.displayedYear,
        month: this.displayedMonth + 1,
        day: this.displayedDay,
      });
    },
    previousMonth() {
      this.$store.commit("date/updateDisplayedDate", {
        year: this.displayedYear,
        month: this.displayedMonth - 1,
        day: this.displayedDay,
      });
    },
    selectDay(data) {
      const newSelected = {};
      switch (data.month) {
        case "before":
          if (this.displayedMonth != 0) {
            newSelected.month = this.displayedMonth - 1;
            newSelected.year = this.displayedYear;
          } else {
            newSelected.month = 11;
            newSelected.year = this.displayedYear - 1;
          }
          break;
        case "after":
          if (this.displayedMonth != 11) {
            newSelected.month = this.displayedMonth + 1;
            newSelected.year = this.displayedYear;
          } else {
            newSelected.month = 0;
            newSelected.year = this.displayedYear + 1;
          }
          break;
        default:
          newSelected.month = this.displayedMonth;
          newSelected.year = this.displayedYear;
      }
      newSelected.day = data.day;

    this.$store.commit('date/selectDate', newSelected)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
.calendar {
  width: 400px;
  max-width: 90vw;
  height: 300px;
  background-color: $teal;
  border-radius: 20px;
  overflow: hidden;
  color: $white;
  header {
    height: 50px;
    background-color: $teal-dark;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .nav-btn {
      font-size: 32px;
      transition: all 0.2s ease-in;
      border-radius: 100%;
      &:hover {
        background-color: $white;
        color: $teal;
        cursor: pointer;
      }
    }
  }
  section {
    height: calc(100% - 50px);
    .grid {
      display: grid;
      height: 100%;
      width: 100%;
      margin: auto;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(7, 1fr);
      .label {
        background-color: $white;
        color: $teal;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .calendar-day {
        border: $teal-dark 1px solid;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &.before,
        &.after,
        &.current {
          &::before {
            content: "";
            position: absolute;
            width: 50%;
            padding-bottom: 50%;
            @media (max-width: 600px) {
              width: 70%;
              padding-bottom: 70%;
            }
            background: none;
            border: 2px solid $white;
            left: 50%;
            top: 50%;
            border-radius: 100%;
            transform: translate(-50%, -50%);
            opacity: 0;
          }
          &:hover {
            cursor: pointer;
            &::before {
              opacity: 0.5;
            }
          }
          &.selected::before {
            opacity: 1;
          }
        }
        &.today {
          &::before {
            content: "";
            position: absolute;
            width: 50%;
            padding-bottom: 50%;
            @media (max-width: 600px) {
              width: 70%;
              padding-bottom: 70%;
            }
            background: none;
            border: 2px solid $teal;
            left: 50%;
            top: 50%;
            border-radius: 100%;
            transform: translate(-50%, -50%);
            opacity: 0;
          }
          &:hover {
            cursor: pointer;
            &::before {
              opacity: 0.5;
            }
          }
          &.selected::before {
            opacity: 1;
          }
        }

        &.today {
          background: $white;
          color: $teal-dark;
        }
        &.before,
        &.after {
          background: $teal-dark;
          color: $white-dark;
        }
      }
    }
  }
}
</style>