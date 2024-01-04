<script setup lang="ts">
import { ref } from "vue";
import { Ship } from "@/types/ship";

const router = useRouter();

interface ApiResponse {
  message: string;
  data: Ship[];
}

interface ApiError {
  message: string;
}

const searchQuery = ref("");
const perPage = ref(10);
const totalPages = ref(0);
const { currentPage } = usePagination();
let apiUrl = ref(`https://api.starcitizen-api.com/${import.meta.env.VITE_API_KEY}/v1/cache/ships`);

const {
  data: responseData,
  pending,
  error,
  refresh,
} = useFetch<ApiResponse>(() => apiUrl.value, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  immediate: true,
});

const data = ref<ApiResponse | null>(null);

watch(
  responseData,
  (newData) => {
    if (newData) {
      data.value = newData;
      totalPages.value = Math.ceil(newData.data.length / perPage.value);
    }
  },
  { immediate: true }
);

watch(
  searchQuery,
  (newValue) => {
    apiUrl.value = `https://api.starcitizen-api.com/${import.meta.env.VITE_API_KEY}/v1/cache/ships${
      newValue ? `?name=${encodeURIComponent(newValue)}` : ""
    }`;
    currentPage.value = 1;
    refresh();

    // Update the URL without reloading the page
    router.replace({ query: newValue ? { name: newValue } : {} }).catch((err) => {
      console.log(err);
    });
  },
  { immediate: true }
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return data.value?.data.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

const isSreenSizeMobile = () => {
  return window.innerWidth < 768;
};

const displayedPages = computed(() => {
  let range = 0;
  isSreenSizeMobile() ? (range = 1) : (range = 2);
  const minPage = Math.max(1, currentPage.value - range);
  let maxPage = Math.min(totalPages.value, currentPage.value + range);

  let pages = Array.from({ length: maxPage - minPage + 1 }, (_, i) => minPage + i);

  if (totalPages.value > maxPage) {
    pages = [...pages, totalPages.value];
  }

  if (minPage > 1) {
    pages = [1, ...pages];
  }

  return pages;
});

const truncateDescription = (text: string, maxLength: number = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const removeAfterBreakTag = (description: string | null | undefined) => {
  if (!description) return "";

  const parts = description.split("<br /><br />");
  return truncateDescription(parts[0], 210);
};

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = "/star-citizen-banner.webp";
};
</script>

<template>
  <div>
    <div class="relative w-full">
      <input
        v-model="searchQuery"
        type="text"
        class="w-full py-2 pl-10 pr-3 rounded-full bg-customPrimary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        placeholder="Search a ship by his name..."
      />
      <button v-if="searchQuery" @click="searchQuery = ''" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          class="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.873-4.873" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.5 10.5a5 5 0 11-10 0 5 5 0 0110 0z" />
        </svg>
      </div>
    </div>

    <div v-if="pending" class="my-10 gap-8 columns-1">
      <div
        class="flex flex-col md:flex-row rounded-lg bg-customPrimary p-2 md:mb-5 h-auto md:h-64 gap-2 md:gap-6 border-2 border-transparent transition duration-300 ease-in-out"
      >
        <div class="flex w-full md:w-1/2 gap-2">
          <div class="object-cover h-36 w-full md:h-auto rounded-lg bg-gray-300 animate-pulse"></div>
        </div>
        <div class="flex flex-col w-full md:w-1/2 justify-center">
          <div class="flex justify-center gap-5 md:mb-4">
            <div class="h-6 w-24 bg-gray-300 animate-pulse"></div>
          </div>
          <div class="hidden md:flex md:flex-row justify-center gap-10 mb-4">
            <div>
              <div class="h-4 w-32 bg-gray-300 animate-pulse"></div>
              <div class="h-4 w-32 bg-gray-300 animate-pulse mt-2"></div>
            </div>
            <div>
              <div class="h-4 w-32 bg-gray-300 animate-pulse"></div>
              <div class="h-4 w-32 bg-gray-300 animate-pulse mt-2"></div>
            </div>
            <div>
              <div class="h-4 w-32 bg-gray-300 animate-pulse"></div>
              <div class="h-4 w-32 bg-gray-300 animate-pulse mt-2"></div>
            </div>
          </div>
          <div class="text-left hidden md:block">
            <div class="h-4 w-full bg-gray-300 animate-pulse"></div>
            <div class="h-4 w-2/3 bg-gray-300 animate-pulse mt-2"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="flex justify-center items-center text-white bg-red-500 p-4 my-10 rounded">
      An error occurred: {{ error.message }}
    </div>
    <div v-else>
      <div class="flex justify-center items-center space-x-3 my-10">
        <Button v-if="currentPage !== 1" :next="true" text="Prev" @click="prevPage" :disabled="currentPage === 1" />

        <div class="flex space-x-2">
          <button
            v-for="page in displayedPages"
            :key="page"
            class="h-10 w-10 px-2 py-1 text-white hover:bg-customAccent hover:text-white border border-customAccent transition duration-300 ease-in-out"
            @click="goToPage(page)"
            :class="{ 'bg-customAccent text-white': currentPage === page, 'bg-customPrimary': currentPage !== page }"
          >
            {{ page }}
          </button>
        </div>

        <Button
          v-if="currentPage !== totalPages"
          :next="true"
          text="Next"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        />
      </div>

      <div class="my-10 gap-8 columns-1" v-for="ship in paginatedData" :key="ship?.id">
        <div
          class="flex flex-col md:flex-row rounded-lg bg-customPrimary p-2 md:mb-5 h-auto md:h-64 gap-2 md:gap-6 border-2 border-transparent hover:border-customAccent transition duration-300 ease-in-out"
        >
          <nuxt-link v-if="ship && ship.id" :to="`/ships/${ship.id}`" class="flex w-full md:w-1/2 gap-2">
            <nuxt-img
              :src="ship.media[0].source_url"
              :alt="ship.name"
              class="object-cover h-36 w-full md:h-auto rounded-lg"
              @error="onImageError"
            />
          </nuxt-link>
          <div class="flex flex-col w-full md:w-1/2 justify-center">
            <div class="flex justify-center gap-5 md:mb-4">
              <nuxt-link :to="`/ships/${ship?.id}`">
                <h2 class="text-xl">{{ ship?.name }}</h2>
              </nuxt-link>
            </div>
            <div class="hidden md:flex md:flex-row justify-center gap-10 mb-4">
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
            <p class="text-left hidden md:block">
              {{ removeAfterBreakTag(ship?.description) }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center space-x-4 my-10">
        <Button :next="true" text="Prev" @click="prevPage" :disabled="currentPage === 1" />

        <div class="flex space-x-2">
          <button
            v-for="page in displayedPages"
            :key="page"
            class="h-10 w-10 px-2 py-1 text-white hover:bg-customAccent hover:text-white border border-customAccent transition duration-300 ease-in-out"
            @click="goToPage(page)"
            :class="{ 'bg-customAccent text-white': currentPage === page, 'bg-customPrimary': currentPage !== page }"
          >
            {{ page }}
          </button>
        </div>

        <Button :next="true" text="Next" @click="nextPage" :disabled="currentPage === totalPages" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
} */
</style>
