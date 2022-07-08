<template>
  <button
    :class="['button', {'button_active': isActive}]"
    type="button"
    @click="handleButton"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class UiButton extends Vue {
  @Prop({
    type: String,
    default: 'Кнопка'
  })
  title!: string;
  @Prop({
    type: Boolean,
    default: false
  })
  isActive!: string;

  handleButton() {
    this.$emit('handleButton')
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.button {
  width: 100%;
  padding: 8px 0;
  background: $system-primary-bg;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $system-text;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;

  &_active {
    color: $system-white;
    background: $system-primary;
  }

  &:hover {
    color: $system-text;
    background: $system-primary-light;
  }
}

</style>
