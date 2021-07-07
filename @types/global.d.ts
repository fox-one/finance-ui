declare module '*.css';

declare module '*.less';

declare module '*.scss';

declare module '*.sass';

declare module '*.svg';

declare module '*.png';

declare module '*.jpg';

declare module '*.jpeg';

declare module '*.gif';

declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.vue' {
  import type { VueConstructor } from 'vue';
  import type { defineComponent } from '@vue/composition-api';
  const component: ReturnType<typeof defineComponent> & {
    install(app: VueConstructor<Vue>): void
  };
  export default component;
}

declare module '@foxone/uikit';