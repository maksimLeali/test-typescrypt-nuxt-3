<template lang="pug">
#page(v-editable="blok")
    template(v-for="blok in blok.body" :key="blok._uid")
        StoryblokComponent(:blok="blok" v-editable="blok")
        
    </template>

<script setup>
const { blok } = defineProps({ blok: Object });
console.log(blok)
</script>
<style lang="scss">
#page {
    position: relative;
    z-index: 1;
    padding-left: mw(2);
    padding-right:mw(2);
    width: 100% ;
    box-sizing: border-box;
}
</style>
