<template>
  <div class="term-picker">
    <base-checkbox
      :title="title"
      v-model:value="show"
      :status="status"
    ></base-checkbox>
    <div v-show="show" class="time-stamps">
      <base-time-picker
        v-model:value="timeStamps[0]"
        :blockers="blockers"
        :status="status"
      ></base-time-picker>
      <base-time-picker
        v-model:value="timeStamps[1]"
        :blockers="blockers"
        :status="status"
      ></base-time-picker>
    </div>
    <button type="button" v-if="status" @click="undo()">cofnij</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["title", "day-data", "day", "id"],
  data() {
    return {
      timeStamps: this.dayData ? this.dayData.timeStamps : [0, 1],
      default: this.dayData
        ? JSON.parse(JSON.stringify(this.dayData.timeStamps))
        : [0, 1],
      show: this.dayData ? true : false,
      status: "",
    };
  },
  computed: {
    ...mapGetters("activities", ["ocupiedTerms"]),
    blockers() {
      return this.ocupiedTerms(this.id, this.day);
    },
  },
  watch: {
    dayData:{
      deep:true,
      handler(newValue){
        this.timeStamps = newValue ? newValue.timeStamps : [0, 1];
      this.default = newValue
        ? JSON.parse(JSON.stringify(newValue.timeStamps))
        : [0, 1];
      this.show = newValue ? true : false;
      this.status = "";
      }
    },
    timeStamps: {
      deep: true,
      handler(newValue) {
        let isOcupied = false;
        this.blockers.forEach((el) => {
          if (newValue[0] < el[0] && newValue[1] > el[1] - 1) isOcupied = true;
        });
        if (isOcupied || newValue[0] >= newValue[1]) {
          console.log("error");
          this.status = "error";
          return;
        }
        if (JSON.stringify(newValue) !== JSON.stringify(this.default)) {
          this.status = "changed";
        } else {
          this.status = "";
        }
        // console.log(this.status);
      },
    },
    show(newValue) {
      if (this.dayData && newValue == false) this.status = "changed";
      else if (!this.dayData && newValue == true) this.status = "changed";
    },
    status(newValue) {
      this.$emit("update:value", {
        timeStamps: [...this.timeStamps],
        status: newValue,
        show: this.show,
      });
    },
  },
  methods: {
    undo() {
      if (this.dayData) {
        this.timeStamps = this.default.slice();
        console.log(this.default);
        this.status = "";
        console.log(this.status);
        this.show = true;
      } else {
        this.timeStamps = this.default.slice();
        this.status = "";
        this.show = false;
      }
    },
  },
  created() {
    console.log(this.blockers, this.day);
  },
};
</script>

<style lang="scss" scoped>
.term-picker {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.time-stamps {
  display: flex;
}
button {
  border: none;
  margin-left: 20px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
}
</style>