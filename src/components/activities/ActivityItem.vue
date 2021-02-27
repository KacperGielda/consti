<template>
  <div>
    <div v-if="activity" class="activity" @click="goToActivity">
      <div class="title">
        {{ activity.title }}
      </div>
      <div class="progress">{{ activity.progress }}%</div>
    </div>
    <div v-else class="activity none">
      <div class="title">brak</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activity"],
  methods:{
      goToActivity(){
          this.$router.push(`/activities/${this.activity.id}`);
      }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
.activity {
  width: 600px;
  max-width: 85vw;
  height: 50px;
  margin: 10px;
  border-radius: 20px;
  background-color: $white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  box-shadow: 2px 2px rgba($black, 0.1);
  color: $teal-dark;
  &.none {
    justify-content: center;
    .title{
        margin:0;
    }
  }
  .title {
    margin-right: auto;
  }
}
</style>