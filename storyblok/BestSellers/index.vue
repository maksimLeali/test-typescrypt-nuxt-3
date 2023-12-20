<template lang="pug">    
    .bestSellers.items
        h4(v-html="blok.title")
        .container(v-if="products")
            horizontalSlider( :needRefresh="needRefresh" )
                component(is="bestSellersItem" :key="product._uid" :blok="product" v-for=" product of products")

</template>

<script lang="ts" setup>
import type {
    BestSellersStoryblok,
    ProdottoStoryblok,
} from "../../generated/componentsTypes";
interface Props {
    blok: BestSellersStoryblok;
}

const products: Ref<ProdottoStoryblok[]> = ref([]);
const props = defineProps<Props>();
console.log("best sellers", props.blok);
const storyblokApi = useStoryblokApi();
const needRefresh = ref(false)
const config = useRuntimeConfig();

const getIProducts = async () => {
    const { data } = await storyblokApi.get("cdn/stories", {
        starts_with: "prodotti/",
        version: "published",
        filter_query: {
            top_seller: {
                is: true,
            },
        },
    });

    products.value = data.stories;
    await nextTick();
    needRefresh.value = true;
    
};

getIProducts();
</script>

<style lang="scss">
.bestSellers.items {
    margin-bottom: mw(2);
    .container {
        padding: mw(0.5) mw(1);
        width: 100%;
        box-sizing: border-box;
        background-color: $white;
        border-radius: 12px;
    }
}
</style>
