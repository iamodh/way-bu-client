import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body {
    margin: 0; line-height: normal;
}

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
}

=======
    body {
      margin: 0; line-height: normal;
    }
:root {

/* fonts */
--l-bold: Inter;
--font-mansalva: Mansalva;

/* font sizes */
--l-bold-size: 20px;
--m-size: 16px;
--font-size-13xl: 32px;
--font-size-lgi: 19px;
--font-size-7xl: 26px;
--s-size: 12px;
--xl-bold-size: 24px;
--font-size-3xl: 22px;
--font-size-11xl: 30px;
--font-size-4xs: 9px;

/* Colors */
--white: #fff;
--light-skyblue: #f4fcff;
--background-skyblue: #edf4f7;
--color-darkslategray: #1b4965;
--color-cornflowerblue-100: #5ba6f3;
--main-blue: #3592f0;
--black: #000;
--gray: #b9b9b9;
--color-gainsboro-100: #dbe3e6;
--color-gainsboro-200: #d9d9d9;
--color-dodgerblue-100: #1c78d6;
--color-dodgerblue-200: rgba(28, 120, 214, 0.09);
--color-gray-100: #878787;
--color-gray-200: rgba(135, 135, 135, 0.09);
--light-sand: #fafaf4;
--main-skyblue: #ceebf3;
--color-lightblue: #a1dbf1;

/* Gaps */
--gap-xl: 20px;
--gap-80xl: 99px;
--gap-6xl: 25px;
--gap-30xl: 49px;
--gap-12xs: 1px;
--gap-21xl: 40px;
--gap-13xl: 32px;
--gap-base: 16px;
--gap-5xs: 8px;
--gap-9xs: 4px;
--gap-27xl: 46px;
--gap-9xs-6: 3.6px;
--gap-3xs: 10px;
--gap-mini-1: 14.1px;
--gap-6xs: 7px;
--gap-6xs-5: 6.5px;
--gap-17xl: 36px;
--gap-lg: 18px;
--gap-8xs: 5px;

/* Paddings */
--padding-45xl: 64px;
--padding-13xl: 32px;
--padding-4xs: 9px;
--padding-lgi-5: 19.5px;
--padding-5xs: 8px;
--padding-mini: 15px;
--padding-xl: 20px;
--padding-7xs: 6px;
--padding-3xl-5: 22.5px;
--padding-5xs-5: 7.5px;
--padding-2xs: 11px;
--padding-59xl: 78px;
--padding-3xs: 10px;
--padding-2xl: 21px;
--padding-10xs: 3px;
--padding-9xs: 4px;
--padding-11xs: 2px;
--padding-6xs: 7px;
--padding-base: 16px;
--padding-35xl-5: 54.5px;
--padding-4xl: 23px;
--padding-16xl: 35px;
--padding-45xl-5: 64.5px;
--padding-5xl: 24px;
--padding-6xs-5: 6.5px;
--padding-31xl: 50px;
--padding-2xs-5: 10.5px;
--padding-23xl: 42px;
--padding-xs: 12px;
--padding-11xs-5: 1.5px;
--padding-41xl: 60px;
--padding-11xl: 30px;
--padding-3xl: 22px;
--padding-smi: 13px;
--padding-lg-5: 18.5px;
--padding-7xs-5: 5.5px;
--padding-4xs-5: 8.5px;
--padding-base-5: 15.5px;
--padding-9xl: 28px;
--padding-12xl-7: 31.7px;
--padding-7xl: 26px;
--padding-12xs: 1px;
--padding-sm: 14px;
--padding-lgi: 19px;
--padding-79xl: 98px;

/* Border radiuses */
--br-xl: 20px;
--br-3xs: 10px;
--br-8xs: 5px;
--br-mini: 15px;

}
`;
