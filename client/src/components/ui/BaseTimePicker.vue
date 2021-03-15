<template>
  <div class="time-picker">
    <select :class="`${className} hour`" @change="onSelect" v-model="hour">
      <option
        v-for="hour in hours"
        :key="hour.value"
        :value="hour.value"
        :disabled="hour.off"
      >
        {{ hour.value }}
      </option>
    </select>
    <select :class="`${className} minute`" @change="onSelect" v-model="minute">
      <option v-for="minute in minutes" :key="minute" :value="minute">
        {{ minute }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: { value: { default: [0, 0] }, status, blockers: {} },
  data() {
    return {
      hours: [],
      minutes: [],
      hour: "00",
      minute: "00",
      className: "",
    };
  },
  watch: {
    value(v) {
      let hour = Math.floor(v);
      this.hour = hour.toString().length == 1 ? `0${hour}` : hour.toString();
      let minute = v - Math.floor(v);
      minute = Math.round((v - Math.floor(v)) * 60);
      this.minute =
        minute.toString().length == 1 ? `0${minute}` : minute.toString();
    },
    status(v) {
      this.className = v;
    },
  },
  mounted() {
    this.generateOptions();
  },
  methods: {
    onSelect() {
      const time = Number(Number(this.hour) + Number(this.minute) / 60);
      this.$emit("update:value", time);
    },
    generateOptions() {
      for (let i = 0; i <= 23; i++) {
        let value = i.toString().length == 1 ? `0${i}` : i.toString();
        let off = false;

        this.blockers.forEach((el) => {
          if (i > el[0] && i < el[1]) {
            off = true;
          }
        });

        this.hours[i] = { value, off };
      }
      for (let i = 0; i <= 59; i++) {
        // if (this.blockers.includes(i)) continue;
        this.minutes[i] = i.toString().length == 1 ? `0${i}` : i.toString();
      }
      let hour = Math.floor(this.value);
      this.hour = hour.toString().length == 1 ? `0${hour}` : hour.toString();
      let minute = Math.round((this.value - Math.floor(this.value)) * 60);
      this.minute =
        minute.toString().length == 1 ? `0${minute}` : minute.toString();
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
    &.error {
      background-color: $red;
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