import Vue from 'vue';
import Vuetify, {
  VApp,
  VBtn,
  VCard,
  VCardActions,
  VCardTitle,
  VCardText,
  VCol,
  VContainer,
  VMain,
  VDialog,
  VDivider,
  VIcon,
  VImg,
  VList,
  VListItem,
  VListItemAvatar,
  VListItemContent,
  VListItemIcon,
  VListItemTitle,
  VNavigationDrawer,
  VRow,
  VSheet,
  VSnackbar,
  VSparkline,
  VToolbar,
  VLayout
} from 'vuetify/lib';
import Uikit from '@foxone/uikit';

import zh from 'vuetify/es5/locale/zh-Hans';
import en from 'vuetify/es5/locale/en';
import ja from 'vuetify/es5/locale/ja';
import enUikit from '@foxone/uikit/src/locales/en';
import jaUikit from "@foxone/uikit/src/locales/ja";
import zhUikit from "@foxone/uikit/src/locales/zh-Hans";

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VCardActions,
    VCardTitle,
    VCardText,
    VCol,
    VContainer,
    VMain,
    VDialog,
    VDivider,
    VIcon,
    VImg,
    VList,
    VListItem,
    VListItemAvatar,
    VListItemContent,
    VListItemIcon,
    VListItemTitle,
    VNavigationDrawer,
    VRow,
    VSheet,
    VSnackbar,
    VSparkline,
    VToolbar,
    VLayout,
  }
});
Vue.use(Uikit);

export default function () {
  const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

  return new Vuetify({
    icons: {
      iconfont: "mdiSvg",
      values: {
        iconNavMe: {
          component: "icon-nav-me",
        },
      },
    },
    theme: {
      dark: isDark,
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: "#1ea0ff",
          // legacy color names
          secondary: "#777777",
          accent: "#169CFE",
          minor: "#EDEDED",
          // greyscale
          greyscale_1: "#000000",
          greyscale_2: "#333333",
          greyscale_3: "#666666",
          greyscale_4: "#cccccc",
          greyscale_5: "#ebebeb",
          greyscale_6: "#f5f5f5",
          // error & warning
          error: "#f44c4c",
          success: "#00c7af",
          warning: "#FC8A22",
          // subject color
          ocean: "#1ea0ff",
          pink: "#ee4596",
          chives: "#00c7af",
          // general color
          yellow: "#fadf8b",
          purple: "#c699e6",
          blue: "#7cadfa",
          gray: "#b9b9bc",
          green: "#00D1C5",
          red: "#F44C4C",
        },
        dark: {
          primary: "#4bb3ff",
          // legacy color names
          secondary: "#6F767C",
          minor: "#4B4B4B",
          // greyscale
          greyscale_1: "#ffffff",
          greyscale_2: "#d2d3d3",
          greyscale_3: "#9b9c9d",
          greyscale_4: "#636466",
          greyscale_5: "#36383b",
          greyscale_6: "#191919",
          // error & warning
          error: "#f67070",
          success: "#33d2bf",
          warning: "#FC8A22",
          // subject color
          ocean: "#4bb3ff",
          pink: "#f16aab",
          chives: "#33d2bf",
          // general color
          yellow: "#d8ba44",
          purple: "#9d5bcb",
          blue: "#3476d6",
          gray: "#87868a",
          green: "#33DAD1",
          red: "#F67070",
        },
      },
    },
    lang: {
      locales: {
        zh: {
          ...zh,
          ...zhUikit
        },
        en: {
          ...en,
          ...enUikit
        },
        ja: {
          ...ja,
          ...jaUikit
        },
      },
    },
  });
}
