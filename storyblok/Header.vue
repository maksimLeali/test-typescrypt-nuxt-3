<template lang="pug">    
.header
    h1(v-html="blok.title")
    p(v-html="blok.description")
</template>

<script lang="ts" setup>
import type { HeaderStoryblok } from "../generated/componentsTypes";
interface Props {
    blok: HeaderStoryblok;
}



const props = defineProps<Props>();



</script>

<style lang="scss">
.header{
    margin-bottom: mw(2);
}
</style>
