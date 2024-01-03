<script setup>
useHead({
  title: "API | Star Citizen Tool",
  meta: [
    {
      name: "description",
      content:
        "Star Citizen Tool and his external API provides data about various aspects of the Star Citizen game, including information about ships, vehicles and more.",
    },
    {
      name: "keywords",
      content: "Star Citizen, API, Ships, Vehicles, Game Data",
    },
    {
      property: "og:title",
      content: "API | Star Citizen Tool",
    },
    {
      property: "og:description",
      content:
        "Star Citizen Tool and his external API provides data about various aspects of the Star Citizen game, including information about ships, vehicles and more.",
    },
    {
      property: "og:image",
      content: "/star-citizen-banner.webp",
    },
    // {
    //   property: "og:url",
    //   content: "URL_TO_YOUR_PAGE",
    // },
  ],
});
</script>

<template>
  <div class="text-gray-100 p-4 bg-customPrimary rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Star Citizen API</h1>
    <p class="mb-2">This website uses the external Star Citizen API for fetching data.</p>
    <p class="mb-2">
      The API is available at:
      <a
        href="https://starcitizen-api.com/startup.php"
        class="text-customSecondary hover:text-customAccent transition-colors duration-200"
        >https://starcitizen-api.com/startup.php</a
      >
    </p>
    <p>
      The API provides data about various aspects of the Star Citizen game, including information about ships, vehicles and more.
    </p>
  </div>
</template>
