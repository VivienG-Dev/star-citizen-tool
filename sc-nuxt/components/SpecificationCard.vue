<script setup>
const props = defineProps({
  title: String,
  value: Number,
  unit: String,
});
</script>

<template>
  <div>
    <h3 class="text-customTextDetails leading-none">{{ title }}</h3>
    <span>{{ value ?? "-" }}{{ unit }}</span>
  </div>
</template>
