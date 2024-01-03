// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  app: {
    head: {
      title: 'Star Citizen Tool',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'In Star Citizen Tool you can find all the information about the ships in Star Citizen.' },
        { name: 'keywords', content: 'Star Citizen, Ships, Information' },
        { property: 'og:title', content: 'Star Citizen Tool' },
        { property: 'og:description', content: 'In Star Citizen Tool you can find all the information about the ships in Star Citizen.' },
        { property: 'og:image', content: '/star-citizen-banner.webp' },
        // { property: 'og:url', content: 'URL_TO_YOUR_PAGE' },
        { name: 'twitter:card', content: 'All the information about the ships in Star Citizen.' },
        { name: 'twitter:site', content: '@vivieng_webdev' },
        { name: 'twitter:title', content: 'Star Citizen Tool' },
        { name: 'twitter:description', content: 'In Star Citizen Tool you can find all the information about the ships in Star Citizen.' },
        { name: 'twitter:image', content: 'https://www.yourwebsite.com/star-citizen-banner.webp' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600&display=swap' },
      ],
    },
  },
})
