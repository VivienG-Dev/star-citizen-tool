<template>
  <div>
    <nuxt-link
      class="btn-container relative flex justify-center items-center"
      :class="{ 'btn-container-next': props.next }"
      :href="props.link"
    >
      <div @click="onClick" class="btn-border absolute bg-customAccent py-3 px-5" :class="{ 'btn-border-next': props.next }" />
      <button
        @click="onClick"
        class="btn flex justify-center items-center bg-customPrimary hover:bg-customAccent py-3 px-4"
        :class="{ 'btn-next': props.next }"
      >
        {{ props.text }}
      </button>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  next: {
    type: Boolean,
    required: false,
    default: false,
  },
  text: {
    type: String,
    required: false,
    default: "",
  },
  link: {
    type: String,
    required: false,
    default: "",
  },
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    default: undefined,
  },
});
</script>

<style scoped>
/* custom css because of the special form of the clip-path */
.btn-container {
  width: 100px;
  height: 40px;
}

.btn-container-next {
  width: 50px;
  height: 40px;
}

.btn {
  width: 100px;
  transition: all 0.3s ease-in-out;
  height: 40px;
  clip-path: polygon(0 30%, 13% 0, 100% 0%, 100% 70%, 87% 100%, 0 100%);
}

.btn-next {
  width: 50px;
  transition: all 0.3s ease-in-out;
  height: 40px;
  clip-path: polygon(0 30%, 13% 0, 100% 0%, 100% 70%, 87% 100%, 0 100%);
}

.btn-border {
  width: 102px;
  height: 42px;
  transition: all 0.3s ease-in-out;
  clip-path: polygon(0 30%, 13% 0, 100% 0%, 100% 70%, 87% 100%, 0 100%);
}

.btn-border-next {
  width: 52px;
  height: 42px;
  transition: all 0.3s ease-in-out;
  clip-path: polygon(0 30%, 13% 0, 100% 0%, 100% 70%, 87% 100%, 0 100%);
}
</style>
