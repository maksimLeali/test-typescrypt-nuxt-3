import type { ISbRichtext } from "storyblok-js-client";

export default () => {
    const richText = (data : ISbRichtext)  => { 
        var str = renderRichText(data);
        return str;
    };
    return { richText }
}