<template>
  <div class="calendar__filters filters">
    <h3 class="filters__label">Тип календаря</h3>
    <TypeFilter :types="types" :activeType="gridType" @changeActiveType="setGridType" />
    <h3 class="filters__label" v-if="!isWeek">{{ isFilterLabel }}</h3>
    <YearsFilter v-if="isYear" @changeYear="changeYear" />
    <MonthFilter v-if="isMonth" :year="currentYear" @changeMonth="changeMonth" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {IType} from "@/store/calendarInterface";
import TypeFilter from "@/components/CalendarFilters/TypeFilter/TypeFilter.vue";
import calendarModule from "@/store/calendarModule";
import MonthFilter from "@/components/CalendarFilters/MonthFilter/MonthFilter.vue";
import moment from "moment";
import YearsFilter from "@/components/CalendarFilters/YearsFilter/YearsFilter.vue";
@Component({
  components: {YearsFilter, MonthFilter, TypeFilter}
})
export default class CalendarFilters extends Vue {
  // props
  @Prop({
    type: String,
    default: moment().format('YYYY')
  })
  currentYear!: any;

  // data
  types: Array<IType> = [
    {
      id: 'year',
      name: 'Год'
    },
    {
      id: 'month',
      name: 'Месяц'
    },
    {
      id: 'week',
      name: 'Неделя'
    }
  ]

  // methods
  setGridType(type) {
    calendarModule.setCalendarType(type);
  }

  changeMonth(month) {
    calendarModule.getMonthCalendar(moment(`${month.id}-01`).format('YYYY-MM'))
  }

  changeYear(year) {
    calendarModule.getCalendar(year)
  }

  // computed
  get gridType() {
    return calendarModule.gridType;
  }

  get isYear() {
    return this.gridType?.id === 'year';
  }

  get isMonth() {
    return this.gridType?.id === 'month';
  }

  get isWeek() {
    return this.gridType?.id === 'week';
  }

  get isFilterLabel() {
    if (this.isYear) {
      return 'Выбор года'
    } else if (this.isMonth) {
      return 'Выбор месяца'
    } else {
      return 'Выбор недели'
    }
  }


}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.filters {
  width: 450px;
  border: 1px solid $system-bg;
  margin-right: 0;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0.5px 1px rgba(34, 35, 40, 0.02), 0 0.1px 3px rgba(34, 35, 40, 0.1);

  &__label {
    position: relative;
    margin: 0 0 16px;
    padding: 0 0 8px;
    color: $system-surface;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: $system-primary;
    }
  }

  /deep/ {
    .type {
      margin-bottom: 48px;
    }
  }
}
</style>
