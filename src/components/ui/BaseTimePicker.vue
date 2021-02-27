<template>
  <div class="time-picker">
    <select :class="`${status} hour`" @change="onSelect" v-model="hour">
      <option v-for="hour in hours" :key="hour" :value="hour">
        {{ hour }}
      </option>
    </select>
    <select :class="`${status} minute`" @change="onSelect" v-model="minute">
      <option v-for="minute in minutes" :key="minute" :value="minute">
        {{ minute }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: { value: { default: [0, 0] }, status },
  data() {
    return {
      hours: [],
      minutes: [],
      // hour: "00",
      // minute: "00",
    };
  },
  computed: {
    hour() {
      let hour = Math.floor(this.value);
      return hour.toString().length == 1 ? `0${hour}` : hour.toString();
    },
    minute() {
      let minute = this.value - Math.floor(this.value);
      return minute.toString().length == 1 ? `0${minute}` : minute.toString();
    },
  },
  // watch:{
  //  value(v){
  //     let hour = Math.floor(v)
  //     this.hour = hour.toString().length == 1 ? `0${hour}` : hour.toString();
  //     let minute = v - Math.floor(v);
  //     this.minute = minute.toString().length == 1 ? `0${minute}` : minute.toString();
  //  }
  // },
  mounted() {
    for (let i = 0; i <= 23; i++) {
      this.hours[i] = i.toString().length == 1 ? `0${i}` : i.toString();
    }
    for (let i = 0; i <= 59; i++) {
      this.minutes[i] = i.toString().length == 1 ? `0${i}` : i.toString();
    }
  },
  methods: {
    onSelect() {
      const time = Number(Number(this.hour) + Number(this.minute) / 60);
      this.$emit("update:value", time);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/Colors.scss";
.time-picker {
  margin: 5px;
  display: flex;
  select {
    color: $white;
    background-color: $teal;
    border: $white;
    outline: none;
    font-size: 20px;
    &.changed {
      background-color: $yellow;
    }
    &:first-child {
      border: none;
    }
  }
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: $teal-dark;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $white;
    border-radius: 3px;
    max-width: 6px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: $teal;
  }
}
</style>