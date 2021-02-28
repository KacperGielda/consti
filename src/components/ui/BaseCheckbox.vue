<template>
  <div :class="`${status}`">
    <input
      type="checkbox"
      :id="title"
      class="checkbox"
      :checked="value"
      @change="$emit('update:value', $event.target.checked)"
    />
    <div class="box"></div>
    <label :for="title">
      {{ title }}
    </label>
  </div>
</template>
<script>
export default {
  props: ["title", "value", "status"],
};
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
div {
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type="checkbox"] {
  display: none;
}

label,
.box {
  color: $teal;
  cursor: pointer;
  margin: 2px;
}

input[type="checkbox"] + label:last-child {
  margin-bottom: 0;
}

.box {
  display: block;
  width: 0.7em;
  height: 0.7em;
  border: 2px solid $teal-dark;
  position: relative;
}

input[type="checkbox"]:checked + .box::before {
  display: block;
  content: "";
  width: 50%;
  height: 50%;
  position: absolute;
  border-radius: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: $teal-dark;
}
.changed {
  label,
  .box {
    color: $yellow !important;
  }
  .box {
    border-color: $yellow;
  }
  input[type="checkbox"]:checked + .box::before {
    background-color: $yellow;
  }
}
.error {
  label,
  .box {
    color: $red !important;
  }
  .box {
    border-color: $red;
  }
  input[type="checkbox"]:checked + .box::before {
    background-color: $red;
  }
}
</style>