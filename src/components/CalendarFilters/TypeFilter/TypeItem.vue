<template>
  <li class="type__item">
    <UiButton
    :title="type.name"
    :isActive="isActive"
    @handleButton="changeActiveType(type)"
    />
  </li>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {IType} from "@/store/calendarInterface";
import UiButton from "@/components/UiComponents/Button/UiButton.vue";

@Component({
  components: {UiButton}
})
export default class TypeItem extends Vue {
  @Prop({
    type: Object,
    default: () => null
  })
  type!: IType | null;
  @Prop({
    type: Object,
    default: () => null
  })
  activeType!: IType | null;

  changeActiveType(type) {
    this.$emit('changeActiveType', type)
  }

  get isActive() {
    return this.activeType?.id === this.type?.id;
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.type {
  &__item {
    width: 33%;
  }
}
</style>
