<template>
  <div :class="validation ? 'invalid' : ' '">
    <label :for="id">{{ label }}:</label>
    <input
      :type="type"
      :id="id"
      :value="value"
      :required="required"
      @input="$emit('update:value', $event.target.value)"
      autocomplete="off"
    />
    <p>{{ validation }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    validation: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
div {
  width: 300px;
  max-width: 80vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  label {
    color: $teal;
    font-weight: 400;
    font-size: 1em;
    transition: all 0.1s ease-in-out;
    margin-left: 5px;
  }
  input {
    border: none;
    width: 100%;
    border-bottom: $teal 2px solid;
    font-size: 1.25em;
    background-color: $white;
    color: $teal-dark;
    outline: none;
    padding: 5px;
    transition: all 0.1s ease-in-out;
    &:focus,
    &:active {
      color: $black;
      background-color: $white-dark;
    }
  }
  p {
    margin-bottom: 5px;

    width: 100%;
    height: 20px;
    color: $red;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: 400;
    font-size: 0.75em;
  }
}
div.invalid {
  label {
    color: $red;
  }
  input {
    color: $red;
    border-color: $red;
  }
}
</style>