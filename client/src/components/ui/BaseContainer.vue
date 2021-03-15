<template>
  <div class="back">
    <div class="window">
      <header>{{ title }}</header>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"],
};
</script>
<style lang="scss" scoped>
@import "../../assets/Colors.scss";
.back {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 150px;

}
.window {
  background-color: $white;
  width: 400px;
  max-width: 90vw;
  border-radius: 20px;
  box-shadow: 2px 2px rgba($black, 0.1);
  margin: 0 150px;
  header {
    border-radius: 20px 20px 0 0;
    height: 50px;
    width: 100%;
    background-color: $teal-dark;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    color: $white;
  }
  main {
    // height: calc(100% - 50px);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    // background-color: teal;
  }
}
</style>