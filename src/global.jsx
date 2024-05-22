import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

* {
    font-family: "Pretendard-Regular";
}

:root {

/* fonts */
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}



/* font sizes */
--font-size-xxl: 32px;
--font-size-xl: 24px;
--font-size-l: 20px;
--font-size-ml: 18px;
--font-size-m: 16px;
--font-size-s: 12px;
--font-size-xs: 8px;

/* Colors */
--color-white: #fff;
--color-gray: #bbb;
--color-black: #000;
--color-blue-main: #3592F0;
--color-blue-vivid: #A1DBF1;
--color-blue-light: #5ba6f3;
--color-blue-bright: #6FCBF4;
--color-blue-dark: #1758b9;
--color-navy: #1B4965;
--color-skyblue-main: #CEEBF3;
--color-skyblue-light: #F4FCFF;
--color-skyblue-background: #EDF4F7;
--color-sand-main: #FFECCC;
--color-sand-bright: #F7EEDD;
--color-sand-lignt: #FAFAF4;
--color-tag-red-back: #FDF1F2;
--color-tag-red-front: #F58E93;
--color-tag-orange-back: #FDF4EA;
--color-tag-orange-front: #F09335;
--color-tag-mint-back: #E7F7F7;
--color-tag-mint-front: #15B5B0;
--color-tag-green-back: #EDF5F1;
--color-tag-green-front: #4C9C78;


/* Gaps */
--gap-9xs: 4px;
--gap-5xs: 8px;
--gap-3xs: 10px;
--gap-base: 16px;
--gap-xl: 20px;
--gap-13xl: 32px;
--gap-17xl: 36px;
--gap-21xl: 40px;

/* Paddings */
--padding-9xs: 4px;
--padding-5xs: 8px;
--padding-3xs: 10px;
--padding-xs: 12px;
--padding-base: 16px;
--padding-xl: 20px;
--padding-5xl: 24px;
--padding-13xl: 32px;
--padding-41xl: 60px;
--padding-45xl: 64px;

/* Border radiuses */
--br-8xs: 5px;
--br-3xs: 10px;
--br-mini: 15px;
--br-xl: 20px;
};

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

body {
    margin: 0; line-height: normal;
}

a {
	text-decoration: none;
	color: inherit;
}
a:visited {
    color: inherit;
} 
`;
