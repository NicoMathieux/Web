import { apiEndpoint, repositoryName } from "./slicemachine.config.json";

const rem = (px: number) => (px ? `${(px / 16).toFixed(7)}rem` : "0rem");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic", "@nuxtjs/tailwindcss", "vue3-carousel-nuxt", '@nuxtjs/device'],

  mapbox: {
    accessToken: 'pk.eyJ1IjoiZXZhbm1hcnRpaW4iLCJhIjoiY21hcGZqbWl0MGZ5eTJqcXRxd244NXBmbiJ9.kMMXB_B33VtEUTD3aGUvzA'
  },

  runtimeConfig: {
    gmailUser: process.env.GMAIL_USER,
    gmailPass: process.env.GMAIL_PASS,
  },

  nitro: {
    preset: 'netlify'
  },

  app: {
    head: {
      title: 'Nico Mathieux',
      htmlAttrs: {
        lang: 'fr',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },

  css: [
    '~/styles/global.css',
  ],

  prismic: {
    endpoint: apiEndpoint || repositoryName,
    clientConfig: {
      routes: [
        {
          type: 'page',
          path: '/:uid',
        },
        {
          type: 'consulting',
          path: '/consulting',
        },
        {
          type: 'contact',
          path: '/contact',
        },
        {
          type: 'expedition',
          path: '/expedition/:uid',
        },
        {
          type: 'expeditions',
          path: '/expeditions',
        },
        {
          type: 'shop',
          path: '/boutique',
        },
        {
          type: 'product',
          path: '/boutique/:uid',
        },
        {
          type: 'home',
          path: '/',
        },
      ]
    }
  },

  tailwindcss: {
    config: {
      content: [
        './app/**/*.{js,ts,vue}',
        './slices/**/*.{js,ts,vue}'
      ],
      theme: {
        fontFamily: {
          sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          vermin: ['Vermin', 'ui-sans-serif'],
          slussen: ['Slussen', 'ui-sans-serif'],
          rader: ['Rader', 'ui-sans-serif'],
        },
        spacing: {
          xs: rem(25),
          s: rem(75),
          l: rem(120),
          xl: rem(150),
          '1/2xl': rem(200),
          '2xl': rem(300),
          '3xl': rem(400),
          0: 0,
          12: rem(12),
          60: rem(60),
        },
        boxShadow: {
          'l': '0 4px 16px rgba(0, 0, 0, 0.15)',
          'xl': '0 45px 80px rgba(0, 10, 33, 0.05)',
          'none': '0 0 #0000'
        },
        borderRadius: {
          'lg': '0.5rem',
          'xl': '0.75rem',
          '3xl': '1.5rem',
          '4xl': '3rem',
          'full': '9999px',
        },
        fontSize: {
          '2xs': rem(14),
          xs: rem(16),
          s: rem(18),
          m: rem(20),
          l: rem(32),
          xl: rem(48),
          '2xl': rem(90),
          '3xl': rem(224)
        },
        colors: {
          forest: "#3A441E",
          snow: "#FFFFFF",
          coal: "#242424",
        }
      },
    }
  }
})