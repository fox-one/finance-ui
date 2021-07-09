<template>
  <div :class="classes()">
    <vue-slider
      v-model="_value"
      :height="8"
      :min="0"
      :max="100"
      :interval="0.01"
      :lazy="true"
      tooltip="none"
      :contained="true"
      :disabled="disabled"
      :rail-style="{
        'background': `linear-gradient(to right, ${color().low} 0% ${getScaleRatio('low') * 100}%, ${color().mid} ${getScaleRatio('low') * 100}% ${(getScaleRatio('low') + getScaleRatio('mid')) * 100}%, ${color().high} ${(getScaleRatio('low') + getScaleRatio('mid')) * 100}% 100%)`
      }"
    />
    <slot name="default">
      <div :class="classes('tips', 'f-greyscale-3 f-caption')">
        <span>{{ tips.tip }}</span>
        <span :class="classes('tips-highlight', 'font-weight-bold')" :style="{ color: color[currentScale] }">{{ tips.highlight }}</span>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  onMounted
} from '@vue/composition-api';
import classnames from '@utils/classnames';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export type SCALE = {
  low: number;
  mid: number;
  high: number;
};

export type TIPS = {
  tip?: string;
  highlight?: string;
}

export default defineComponent({
  name: 'RiskSlider',
  components: {
    VueSlider
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    scale: {
      type: Object as PropType<SCALE>,
      default: () => ({
        low: 0.7,
        mid: 0.15,
        high: 0.15
      })
    },
    tips: {
      type: Object as PropType<TIPS>,
      default: () => ({})
    },
  },
  setup() {
    const classes = classnames('risk-slider');
    const colors = {
        dark: {
          low: '#56D471',
          mid: '#F79F4D',
          high: '#F67070'
        },
        light: {
          low: '#2CC94E',
          mid: '#F58721',
          high: '#F44C4C'
        }
      };
    onMounted(() => {
      console.info('RiskSlider mounted!');
    });

    return { classes, colors };
  },
  computed: {
    _value: {
      get (): string | number {
        return this.value;
      },
      set (val) {
        this.$emit('change', val);
      }
    },
    isDark(): boolean {
      return this.$vuetify?.theme?.dark;
    },
    currentScale() {
      const val = +this.value / 100;
      if (val <= this.getScaleRatio('low')) {
        return 'low';
      } else if (val <= (this.getScaleRatio('low') + this.getScaleRatio('mid'))) {
        return 'mid';
      } else {
        return 'high';
      }
    }
  },
  methods: {
    color() {
      return this.colors[this.isDark ? 'dark' : 'light']; 
    },
    getScaleRatio(scale: keyof SCALE) {
      const { low, mid, high } = this.scale;
      const total = low + mid + high;
      return this.scale[scale] / total;
    }
  }
});
</script>