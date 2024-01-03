<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Ship, Component } from "@/types/ship";

interface ApiResponse {
  data: Ship[];
}

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const {
  data: apiResponse,
  pending,
  error,
  refresh,
} = useFetch<ApiResponse>(`https://api.starcitizen-api.com/${import.meta.env.VITE_API_KEY}/v1/cache/ships?id=${id}`);

const ship = ref<Ship | null>(null);
let componentTypes: { title: string; components: Component[] }[] = [];
let weaponTypes: { title: string; components: Component[] }[] = [];

watch(
  () => apiResponse.value?.data,
  (newData) => {
    if (newData) {
      ship.value = newData[0];
      console.log(ship.value);

      componentTypes = [
        { title: "Computer", components: ship.value.compiled?.RSIAvionic?.computers },
        { title: "Radar", components: ship.value.compiled?.RSIAvionic?.radar },
        { title: "Coolers", components: ship.value.compiled?.RSIModular?.coolers },
        { title: "Power plants", components: ship.value.compiled?.RSIModular?.power_plants },
        { title: "Shields", components: ship.value.compiled?.RSIModular?.shield_generators },
      ];

      weaponTypes = [
        { title: "Weapons", components: ship.value.compiled?.RSIWeapon?.weapons },
        { title: "Turrets", components: ship.value.compiled?.RSIWeapon?.turrets },
        { title: "Missiles", components: ship.value.compiled?.RSIWeapon?.missiles },
      ];
    }
  },
  { immediate: true }
);

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = "/star-citizen-banner.webp";
};

const removeAfterBreakTag = (description: string | null | undefined) => {
  if (!description) return "";

  const parts = description.split("<br /><br />");
  return parts[0];
};

const goBack = () => {
  router.go(-1);
};

const truncateDescription = (text: string, maxLength: number = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

useHead({
  title: `${ship?.value?.name} | Star Citizen Tool`,
  meta: [
    {
      name: "description",
      content: truncateDescription(ship?.value?.description || "", 160),
    },
    {
      name: "keywords",
      content: `${ship?.value?.name}, Star Citizen, API, Ships, Vehicles, Game Data`,
    },
    {
      property: "og:title",
      content: `${ship?.value?.name} | Star Citizen Tool`,
    },
    {
      property: "og:description",
      content: truncateDescription(ship?.value?.description || "", 160),
    },
    {
      property: "og:image",
      content: `${ship?.value?.media[0]?.source_url}`,
    },
    // {
    //   property: "og:url",
    //   content: "URL_TO_YOUR_PAGE",
    // },
  ],
});
</script>

<template>
  <div class="text-gray-100">
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">An error occurred: {{ error }}</div>
    <div v-else>
      <Button class="my-10" text="Go back" @click="goBack" />

      <div>
        <h1 class="text-center text-4xl mb-5">{{ ship?.name }}</h1>
      </div>

      <div class="flex flex-col md:flex-row rounded-lg bg-customPrimary p-4 md:mb-5 h-auto md:h-auto gap-4 md:gap-6 mb-4">
        <div class="flex flex-col w-full md:w-1/2 justify-center gap-4">
          <div class="flex md:flex md:flex-row justify-center gap-10">
            <div>
              <h3 class="text-customTextDetails">Manufacturer</h3>
              <span>{{ ship?.manufacturer?.name }}</span>
            </div>
            <div>
              <h3 class="text-customTextDetails">Role</h3>
              <span>{{ ship?.focus }}</span>
            </div>
            <div>
              <h3 class="text-customTextDetails">Size</h3>
              <span>{{ ship?.size }}</span>
            </div>
          </div>
          <p class="text-left">
            {{ removeAfterBreakTag(ship?.description) }}
          </p>
        </div>
        <div class="relative md:w-1/2">
          <nuxt-img
            v-if="ship?.media[0]?.source_url"
            :src="ship?.media[0]?.source_url"
            :alt="ship?.name"
            class="object-cover h-auto w-full rounded-lg"
            @error="onImageError"
          />
          <p
            class="absolute top-2 left-2 text-white p-2 rounded-full"
            :class="{
              'bg-customAccent': ship?.production_status === 'flight-ready',
              'bg-red-500': ship?.production_status === 'in-concept',
            }"
          >
            {{ ship?.production_status === "flight-ready" ? "Flight ready" : "In concept" }}
          </p>
        </div>
      </div>

      <div class="grid gap-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-customPrimary h-68 w-full rounded flex flex-col md:col-span-2 p-4 gap-4">
            <h3 class="w-full">Specifications</h3>
            <div class="grid grid-cols-3 gap-4">
              <SpecificationCard title="Length" :value="ship?.length" unit="m" />
              <SpecificationCard title="Height" :value="ship?.height" unit="m" />
              <SpecificationCard title="Mass" :value="ship?.mass" unit="kg" />
            </div>
            <div class="grid grid-cols-3 gap-4">
              <SpecificationCard title="SCM Speed" :value="ship?.scm_speed" unit="m/s" />
              <SpecificationCard title="Afterburner Speed" :value="ship?.afterburner_speed" unit="m/s" />
            </div>
            <div class="grid grid-cols-3 gap-4">
              <SpecificationCard title="Pitch Max" :value="ship?.pitch_max" unit="deg/s" />
              <SpecificationCard title="Roll Max" :value="ship?.roll_max" unit="m/s" />
              <SpecificationCard title="Yaw Max" :value="ship?.yaw_max" unit="deg/s" />
            </div>
            <div class="grid grid-cols-3 gap-4">
              <SpecificationCard title="X-Axis Acceleration" :value="ship?.xaxis_acceleration" unit="deg/s" />
              <SpecificationCard title="Y-Axis Acceleration" :value="ship?.yaxis_acceleration" unit="deg/s" />
              <SpecificationCard title="Z-Axis Acceleration" :value="ship?.zaxis_acceleration" unit="deg/s" />
            </div>
          </div>
          <div class="bg-customPrimary h-68 w-full rounded flex flex-col p-4 gap-4">
            <h3 class="w-full">Capacity</h3>
            <div class="grid grid-cols-2 gap-4">
              <SpecificationCard title="Min Crew" :value="ship?.min_crew" unit="" />
              <SpecificationCard title="Max Crew" :value="ship?.max_crew" unit="" />
              <SpecificationCard title="Cargo" :value="ship?.cargocapacity" unit="scu" />
            </div>
          </div>
          <div class="bg-customPrimary h-68 w-full rounded flex flex-col p-4 gap-4">
            <h3 class="w-full">Buy in game</h3>
            <div class="grid grid-cols-1 gap-4">
              <SpecificationCard title="Pledge (real money)" :value="ship?.price" unit="$" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-customPrimary h-auto w-full rounded flex flex-col p-4 gap-4 md:col-span-2">
            <h3 class="w-full">Weaponry</h3>
            <div class="grid grid-cols-1 gap-4" v-for="weaponType in weaponTypes" :key="weaponType.title">
              <div v-for="(weapon, index) in weaponType.components" :key="index">
                <ComponentCard
                  v-if="weapon.name"
                  :title="index === 0 ? weaponType.title : ''"
                  :mounts="`${weapon.mounts}x`"
                  :size="`S${weapon.size}`"
                  :weaponName="weapon.name"
                  :quantity="`(${Number(weapon.quantity) * Number(weapon.mounts)})`"
                />
              </div>
            </div>
          </div>

          <div class="bg-customPrimary h-auto w-full rounded flex flex-col p-4 gap-4 md:col-span-2">
            <h3 class="w-full">Avionics/Systems</h3>
            <div v-for="componentType in componentTypes" :key="componentType.title">
              <div v-for="(component, index) in componentType.components" :key="index">
                <ComponentCard
                  v-if="component?.name"
                  :title="index === 0 ? componentType.title : ''"
                  :mounts="`${component?.mounts}x`"
                  :size="component?.size"
                  :weaponName="component?.name"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
