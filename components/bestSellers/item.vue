<template lang="pug">    
    .bestSellers.item
        .imageBox(ref="$el")
            NuxtImg(provider="storyblok" format="webp" :src="blok.content.mainImage.filename" :width="imageWidth" :height="imageHeight" v-if="blok.content.mainImage") 


        p.price
            span.euro(v-html="priceEuro")
            span.captureEvents(v-html="priceCents")

</template>

<script lang="ts" setup>
import type { ProdottoStoryblok } from "~/generated/componentsTypes";


interface Props {
    blok:ProdottoStoryblok ;
}

const props = defineProps<Props>();
console.log(props.blok)


const $el = ref();
const imageWidth = ref();
const imageHeight = ref();

onMounted(() => {
    if ($el.value) {
        if ($el.value.clientWidth) imageWidth.value = $el.value.clientWidth;
        if ($el.value.clientHeight) imageWidth.value = $el.value.clientHeight;
    }
});

const priceEuro = computed(() : string=> {
    console.log(props.blok.content.price)
    return `${props.blok.content.price}`.split('.')[0]
    
})
const priceCents = computed(() : string=> {
    const cents= `${props.blok.content.price}`.split('.')[1]; 

    return `,${cents?? '00'}`

})

console.log(priceEuro.value,',',priceCents.value)
</script>

<style lang="scss">
.bestSellers.item {
    flex: 0 0 mw(5);
    width: mw(5);
    
    .imageBox{
        width: 100%;
        aspect-ratio: 1;
        > img {
            width: 100%;
            height: 100%;
            display: block;
        }
        
    }
    .price{
        .euro{
            font-size: 2.6rem;
        }
        .cents{
            font-size: 1.3rem;
        }
    }
}
</style>
