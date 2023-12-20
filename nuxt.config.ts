// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
    strict: true
  },
  modules: [
    '@nuxt/image',
    [ '@storyblok/nuxt', { accessToken: process.env.STORYBLOK_API_KEY } ],
    
  ],
  css: ["@/assets/scss/main.scss"],
  vite: {
    optimizeDeps: { 
        exclude: ["fsevents"]
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/vars.scss";\n',
            },
        },
    },
  },
  runtimeConfig: {
    public: {
      env: process.env.ENVIROMENT, 
      storyblokVersion:  process.env.STORYBLOK_API_VERSION,
      STORYBLOK_KEY: process.env.STORYBLOK_API_KEY,
      
    }
  },
  image: {
    storyblok: {
      baseURL: 'https://a.storyblok.com'
    }
  },
  components : {
    global : true,
    dirs : [
        {
            path : '~/components'
        }
    ]
  },
})


