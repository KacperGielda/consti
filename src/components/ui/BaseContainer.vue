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
  display: block;
}
.window {
  background-color: $white;
  position: absolute;
  width: 400px;
  max-width: 90vw;
  height: fit-content;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 2px 2px rgba($black, 0.1);
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