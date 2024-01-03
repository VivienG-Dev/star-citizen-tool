<script setup>
const props = defineProps({
  title: String,
  mounts: String,
  size: String,
  weaponName: String,
  quantity: String,
});
</script>

<template>
  <div class="">
    <h3 class="text-customTextDetails">{{ title }}</h3>
    <div class="flex items-center border border-gray-200 p-4 rounded-lg bg-customPrimaryLight shadow">
      <div class="flex flex-col border-r border-gray-200 pr-4 mr-4 items-center">
        <span class="text-lg">{{ mounts }}</span>
        <span class="text-lg">{{ size }}</span>
      </div>
      <div class="text-lg">{{ weaponName }} {{ quantity }}</div>
    </div>
  </div>
</template>
