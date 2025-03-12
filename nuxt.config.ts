import { apiEndpoint, repositoryName } from "./slicemachine.config.json";

const rem = (px: number) => (px ? `${(px / 16).toFixed(7)}rem` : "0rem");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic", "@nuxtjs/tailwindcss"],

  css: [
    '~/styles/global.css',
  ],

  prismic: {
    endpoint: apiEndpoint || repositoryName
  },

  tailwindcss: {
    config: {
      content: [
        './app/**/*.{js,ts,vue}',
        './slices/**/*.{js,ts,vue}'
      ],
      theme: {
        // fontFamily: {
        //   sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        //   selfish: ['Selfish', 'ui-serif'],
        //   helvetica: ['Helvetica Neue', 'ui-sans-serif'],
        // },
        spacing: {
          xs: rem(25),
          s: rem(75),
          l: rem(120),
          xl: rem(150),
          '1/2xl': rem(200),
          '2xl': rem(300),
          '3xl': rem(400),
          0: 0,
          2: rem(2),
          4: rem(4),
          6: rem(6),
          8: rem(8),
          16: rem(16),
          24: rem(24),
          32: rem(32),
          45: rem(45),
          64: rem(64),
          100: rem(100),
          128: rem(128),
          200: rem(200),
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
        }
      },
    }
  }
})