<template>
  <div class="term-picker">
    <base-checkbox
      :title="title"
      v-model:value="show"
      :status="status"
    ></base-checkbox>
    <div v-if="show" class="time-stamps">
      <base-time-picker
        v-model:value="timeStamps[0]"
        :status="status"
      ></base-time-picker>
      <base-time-picker
        v-model:value="timeStamps[1]"
        :status="status"
      ></base-time-picker>
    </div>
    <button type="button" v-if="status" @click="undo()">cofnij</button>
  </div>
</template>

<script>
export default {
  props: ["title", "day-data"],
  data() {
    return {
      timeStamps: this.dayData ? this.dayData.timeStamps : [0, 0],
      default: null,
      show: this.dayData ? true : false,
      status: "",
    };
  },
  computed: {
    stausMsg() {
      switch (this.status) {
        case "changed":
          return "Zmieniono";
        case "ocupied":
          return "Wybrany termin jest już zajęty";
        default:
          return "";
      }
    },
  },
  watch: {
    timeStamps: {
      deep: true,
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
        if (!this.default) this.default = oldValue;
        if (this.dayData) {
          if (newValue != this.dayData.timeStamps) {
            this.status = "changed";
          }
        } else {
          this.status = "changed";
        }
      },
    },
    show(newValue) {
      if (
        (this.dayData && newValue == false) ||
        (!this.dayData && newValue == true)
      )
        this.status = "changed";
      else this.status = "";
    },
  },
  methods:{
    undo(){
      console.log('dupa')
      if (this.dayData){
        this.timeStamps = this.default;
        console.log(this.default);
        this.status = true;
      }
      else {
        this.timeStamps = [0,0];
        this.status = false;
      }
    }
  }
  // mounted() {
  //     if (this.dayData){
  //         this.timeStamps = this.dayData.timeStamps;
  //         this.show = true;
  //     }
  // },
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
button{
  border: none;
  margin-left: 20px;
  text-decoration: underline;
  &:hover{
    cursor: pointer;
  }
}
</style>