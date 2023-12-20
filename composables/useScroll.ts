import { useState } from '#app';

export const useScroll = ( ) => {
    const fmwLimit = 8000;
    const mwCount = 40;
    const scrollObj = useState('scrollObj',() => { return {
        top:0,
        left:0,
        scrollHeight:0,
        wW:0,
        wH:0
    }});
    const scrollInited = useState('scrollInited',() => { return false });
    let scrollElm: Element | null;
    const scrollListener = () => {
        if(!scrollElm) return
        scrollObj.value.scrollHeight = scrollElm.scrollHeight;
        scrollObj.value.top = scrollElm.scrollTop;
        scrollObj.value.left = scrollElm.scrollLeft;
        scrollObj.value.wH = scrollElm.clientHeight;
        scrollObj.value.wW = scrollElm.clientWidth;
    }
    if(!scrollInited.value && process.client){
        scrollInited.value = true;
        scrollElm = document.scrollingElement;
        scrollListener();
        window.addEventListener('scroll', scrollListener);
        window.addEventListener('resize', scrollListener);
    }
    const mw = ref((w: number) => {
        if(w){
            const refWidth = scrollObj.value.wW <= fmwLimit ? scrollObj.value.wW : fmwLimit;
            return refWidth / mwCount * w;
        }
    })
    return { scrollObj,mw }
}