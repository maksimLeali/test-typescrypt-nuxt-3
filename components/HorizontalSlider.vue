<template lang="pug">
    section.horizontalSlider( ref="slider" :class="{dragging: isDragging}")
        .wrapper(ref="wrapper")
                slot

        .scrollBar(ref="scrollBar" v-if="scrollBarVisible")
            .bar(ref="bar" :style="{width:barWidth+'px',left:barLeft+'px'}")
    
    
    </template>

<script lang="ts" setup>
interface props { needRefresh : Boolean }

const props = defineProps<props>();
const { mouseX } = useMouse();
const { scrollObj } = useScroll();

const scrollBarVisible = ref(false);
const barWidth = ref(0);
const barLeft = ref(0);
const slider = ref();
const wrapper = ref();
const scrollBar = ref();
const bar = ref();

var isDragging = false;
var isInited = false;
let animationHolder: number | null = null;

const config = useRuntimeConfig();

const storyblokApi = useStoryblokApi();
const articles = ref([]);
const itemsGetted = ref(false);

onMounted(() => {
    init();
});


watch(()=> props.needRefresh, async (v)=> {
    setTimeout(()=>{
        init()
    }, 100)
})


const init = async () => {
    if (animationHolder) cancelAnimationFrame(animationHolder);
    const sliderWidth = slider.value.clientWidth;
    const wrapperWidth = wrapper.value.scrollWidth;
    scrollBarVisible.value = sliderWidth < wrapperWidth;
    if (!scrollBarVisible.value) return;
    await nextTick();

    const scrollBarWidth = scrollBar.value.clientWidth;
    barWidth.value = (sliderWidth * scrollBarWidth) / wrapperWidth;

    bar.value.addEventListener("mousedown", startDragging);
    bar.value.addEventListener("touchmove", startDragging);

    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    animate();
    isInited = true;
};
const scrollClick = () => {
    if (wrapper.value.children[0]) {
        wrapper.value.scrollLeft =
            wrapper.value.scrollLeft + wrapper.value.children[0].clientWidth;
    }
};
const animate = () => {
    if(isDragging){
        const deltaMousePosition = mouseX.value - scrollBar.value.getBoundingClientRect().x - bar.value.clientWidth /2
        const moveLeft = (deltaMousePosition + bar.value.clientWidth > scrollBar.value.clientWidth ? scrollBar.value.clientWidth - bar.value.clientWidth : deltaMousePosition )  
        barLeft.value = moveLeft > 0 ? moveLeft : 0;

        const scrollLeft =  (moveLeft * wrapper.value.scrollWidth) / scrollBar.value.clientWidth
        wrapper.value.scrollLeft = scrollLeft;
    }else{
        barLeft.value = scrollBar.value.clientWidth * wrapper.value.scrollLeft / wrapper.value.scrollWidth
    }

    animationHolder = requestAnimationFrame(() => { animate() })
}
const startDragging = (e: any) => {
    if (e.touches) {
        mouseX.value = e.touches[0].clientX;
    }
    isDragging = true;
};

const stopDragging = () => {
    isDragging = false;
};

onBeforeUnmount(() => {
    if (animationHolder) cancelAnimationFrame(animationHolder);
    if (bar.value) bar.value.removeEventListener("mousedown", startDragging);
    if (bar.value) bar.value.removeEventListener("touchmove", startDragging);

    window.removeEventListener("mouseup", stopDragging);
    window.removeEventListener("touchend", stopDragging);
});
</script>
<style lang="scss">
.horizontalSlider {
    position: relative;
    > .wrapper {
        overflow-x: scroll;
        scroll-snap-type: x proximity;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
        display: flex;
        position: relative;
        gap: mw(1);
        
        
        margin-bottom: mw(1);
        box-sizing: border-box;
    }

    > .scrollBar {
        height: 1px;
        background: $gray;
        position: relative;
        width: mw(14);
        margin-bottom: mw(1);
        

        > .bar {
            position: absolute;
            left: 50%;
            transform: translateY(-50%);
            top: 0;
            height: 5px;
            border-radius: 5px;
            background: $text;
            width: 200px;
            cursor: grab;
            &:hover {
                width: 10px;
            }
        }
    }

    &.dragging {
        > .wrapper {
            scroll-snap-type: none;
        }
    }
}
</style>
