import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
/* import types */
import type { CreateElement, VNode } from 'vue';

@Component
export class RistInfo extends Vue {
  @Prop({ type: String, default: '' }) private className!: string;

  public render(h: CreateElement): VNode {
    const content = this.$slots.default;
    const classes = classnames({ prefix: 'prefix' });
    return h(
      'div',
      {
        staticClass: classes('ristinfo'),
        class: this.className
      },
      content
    );
  }
}

export default RistInfo;