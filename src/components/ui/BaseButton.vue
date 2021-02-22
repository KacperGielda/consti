<template>
  <button v-if="!link" class='btn' :class="mode">
    <slot />
  </button>
  <router-link v-else :to="to" class='btn' :class="mode">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/Colors.scss";
    .btn{
        background: none;
        border: $teal 2px solid;
        color: $teal;
        padding: 10px 20px;
        border-radius: 20px;
        margin: 10px;
        &:hover,&:active{
            cursor: pointer;
            background-color: $teal-dark;
            color: $white;
        }
    }
</style>
