<template lang="pug">
StoryblokComponent(v-if="story" :blok="story.content" :first_published_at="story.first_published_at" :created_at="story.created_at")
</template>

<script lang="ts" setup>
import type { PageStoryblok } from "~/generated/componentsTypes"


const config = useRuntimeConfig()
const stories   = ref(undefined)
const story = ref(undefined)
const { data: res , error } = await useAsyncData(
    'pageAsyncData',
    () => {
        return useStoryblokApi().get("cdn/stories/page", { version: config.public.storyblokVersion == 'published' ? 'published' : 'draft', })
    }
)

if(error.value || !res.value ) throw createError({ statusCode: 404, statusMessage: "error", fatal: true });
console.log(res.value)
// stories.value = res.value.data.stories
story.value = res.value.data.story


</script>

<style lang="scss">

</style>