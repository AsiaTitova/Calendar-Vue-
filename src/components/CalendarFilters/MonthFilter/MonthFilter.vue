<template>
  <ul class="month-filter">
    <li
      class="month-filter__item"
      v-for="month in months"
      :key="month.id"
    >
      <UiButton
        :title="month.name"
        :isActive="isActive(month)"
        @handleButton="changeMonth(month)"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import moment from "moment";
import UiButton from "@/components/UiComponents/Button/UiButton.vue";
import calendarModule from "@/store/calendarModule";
@Component({
  components: {UiButton}
})
export default class MonthFilter extends Vue {
  // props
  @Prop({
    type: String,
    default: moment().format('YYYY')
  })
  year!: any;

  // data
  currentMonth: string | number | null = null;

  // methods
  changeMonth(month) {
    this.currentMonth = month;
    this.$emit('changeMonth', month)
  }

  isActive(month) {
    return month.id === calendarModule.currentMonth
  }

  // computed
  get months() {
    return [
      {
        id: `${this.year}-01`,
        name: 'Январь'
      },
      {
        id: `${this.year}-02`,
        name: 'Февраль'
      },
      {
        id: `${this.year}-03`,
        name: 'Март'
      },
      {
        id: `${this.year}-04`,
        name: 'Апрель'
      },
      {
        id: `${this.year}-05`,
        name: 'Май'
      },
      {
        id: `${this.year}-06`,
        name: 'Июнь'
      },
      {
        id: `${this.year}-07`,
        name: 'Июль'
      },
      {
        id: `${this.year}-08`,
        name: 'Август'
      },
      {
        id: `${this.year}-09`,
        name: 'Сентябрь'
      },
      {
        id: `${this.year}-10`,
        name: 'Октябрь'
      },
      {
        id: `${this.year}-11`,
        name: 'Ноябрь'
      },
      {
        id: `${this.year}-12`,
        name: 'Декабрь'
      },
    ]
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.month-filter {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  padding: 0;

  &__item {
    width: 30%;
    margin: 0 0 8px;
  }
}
</style>
