<template>
  <div :class="`task-container ${status}`">
    <div class="desc">{{ desc }}</div>
    <div class="status" @click="$emit('change-status')">
      {{ status }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["desc", "id", "status"],
};
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
.task-container {
  width: 680px;
  max-width: 85vw;
  height: 50px;
  margin-top: 10px;
  background-color: $teal;
  border-radius: 20px;
  display: flex;
  overflow: hidden;
  color: white;
  box-shadow: 2px 2px rgba($black, 0.1);
  .desc {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
  }
  .status {
    width: 200px;
    height: 100%;
    border-radius: 20px;
    background-color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      cursor: pointer;
    }
  }
  &.done {
    background-color: rgba($teal, 0.7);
    text-decoration: line-through;
    .status {
      background-color: rgba($teal-dark, 0.7);
    }
  }
  &.to-do {
    background-color: $teal;
    .status {
      color: $teal;
    }
  }
  &.in-progress {
    background-color: $yellow;
    .status {
      color: $yellow;
    }
  }
}
</style>
