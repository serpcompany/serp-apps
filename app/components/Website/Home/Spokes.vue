<template>
  <div class="h-20 w-20 flex items-center justify-center">
    <div
      v-for="n in numberOfSpokes"
      :key="n"
      class="absolute "
      :style="{ transform: `rotate(${(n - 1) * (360 / numberOfSpokes)}deg)` }"
    />
  </div>
</template>

<script lang="ts" setup>
const numberOfSpokes = 12 // You can adjust this number to add more/fewer spokes
</script>

<style scoped>
.spoke {
  position: absolute;
  width: 3px; /* Spoke width */
  height: 15px; /* Spoke length */
  background: #000;
  border-radius: 1px;
  transform-origin: center 50px; /* Half of container height */
}
</style>
