<template>
  <div class="box"></div>
</template>

<script setup>
const boxWidth = '100px'
</script>

<style lang="scss">
.box {
  height: 100px;
  width: v-bind(boxWidth);
  background-color: red;
}
</style>
