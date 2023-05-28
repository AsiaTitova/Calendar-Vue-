<template>
  <ul class="year-filter">
    <li class="year-filter__item" v-for="year in years" :key="year">
      <UiButton
        :title="year"
        :isActive="isActive(year)"
        @handleButton="changeYear(year)"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import moment from "moment";
import UiButton from "@/components/UiComponents/Button/UiButton.vue";
@Component({
  components: {UiButton}
})
export default class YearsFilter extends Vue {
  // props
  @Prop({
    type: String,
    default: moment().format('YYYY')
  })
  year!: string | number;

  // data
  currentYear: string | number | null = null;

  // mounted
  mounted() {
    this.currentYear = this.year;
  }

  // methods
  changeYear(year) {
    this.currentYear = year;
    this.$emit('changeYear', year)
  }

  isActive(current) {
    return this.currentYear === current
  }

  // computed
  get years() {
    return [ '2022', '2023']
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.year-filter {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  margin: 0;
  padding: 0;

  &__item {
    width: 48%;
    margin: 0 0 8px;
  }
}
</style>
