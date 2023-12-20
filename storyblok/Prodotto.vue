<template lang="pug">
.product(v-editable="true")
    .imageBox(ref="$el")
        NuxtImg(provider="storyblok" format="webp" :src="blok.mainImage.filename" :width="imageWidth" :height="imageHeight" v-if="blok.mainImage") 
    .text
        p(v-html="blok.name")
</template>

<script lang="ts" setup>
import type { ProdottoStoryblok } from "../generated/componentsTypes";
interface Props {
    blok: ProdottoStoryblok;
}

const $el = ref();
const imageWidth = ref();
const imageHeight = ref();
const props = defineProps<Props>();

onMounted(() => {
    if ($el.value) {
        if ($el.value.clientWidth) imageWidth.value = $el.value.clientWidth;
        if ($el.value.clientHeight) imageWidth.value = $el.value.clientHeight;
    }
});

console.log('prodotto', props.blok);
</script>

<style lang="scss">
.product {
    display: flex;
    padding: mw(0.5);
    width: mw(12);

    border-radius: 12px;

    background-color: $lightGray;
    margin-bottom: mw(1);
    .imageBox {
        width: mw(3);
        aspect-ratio: 1;
        > img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}
</style>
