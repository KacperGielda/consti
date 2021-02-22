<template>
  <div class="schedule">
    <div></div>
    <calendar /> 
  </div>
  <task/>
</template>

<style lang="scss" scoped>
</style>

<script>
import Calendar from "../components/schedule/Calendar";
import Task from "../components/schedule/Task";
export default {
  components: {
    Calendar,
    Task,
  },
  data() {
    return {
      
    };
  },
  computed:{
  },
  methods: {
      
  },
};
</script>