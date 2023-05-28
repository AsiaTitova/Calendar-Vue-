<template>
  <ul class="type">
    <TypeItem
      v-for="type in types"
      :key="type.id"
      :type="type"
      :activeType="activeType"
      @changeActiveType="changeActiveType"
    />
  </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {IType} from "@/store/calendarInterface";
import TypeItem from "@/components/CalendarFilters/TypeFilter/TypeItem.vue";
@Component({
  components: {TypeItem}
})
export default class TypeFilter extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  types!: Array<IType>;

  @Prop({
    type: Object,
    default: () => null
  })
  activeType!: IType | null;

  changeActiveType(type) {
    this.$emit('changeActiveType', type);
  }


}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.type {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  list-style: none;
  background: $system-primary-bg;
  border-radius: 8px;
}
</style>
