<template>
  <div :class="`task-container ${status}`" @click="toggleDeleteBtn">
    <div
      class="delete"
      v-show="showDeleteBtn"
      @click.stop="deleteSubTask(parentId, id)"
    >
      <ion-icon name="trash-outline" class="trash"></ion-icon>
    </div>
    <div class="desc">{{ desc }}</div>
    <div class="status" @click.stop="$emit('change-status')">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["desc", "id", "status", "parent-id"],
  data() {
    return {
      showDeleteBtn: false,
    };
  },
  computed: {
    text() {
      switch (this.status) {
        case "to-do":
          return "Do zrobiena";
        case "in-progress":
          return "W trakcie pracy";
        default:
          return "zrobione";
      }
    },
  },
  methods: {
    toggleDeleteBtn() {
      this.showDeleteBtn = !this.showDeleteBtn;
    },
    deleteSubTask(activityId, id) {
      this.$store.dispatch("activities/deleteSubTask", { activityId, id });
    },
  },
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
  .delete {
    font-size: 30px;
    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:hover {
      color: $red;
      cursor: pointer;
    }
  }
  .desc {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
  }
  .status {
    min-width: 150px;
    height: 100%;
    border-radius: 20px;
    background-color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
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
