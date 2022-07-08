<template>
  <div class="calendar__filters filters">
    <h3 class="filters__label">Тип календаря</h3>
    <TypeFilter :types="types" :activeType="gridType" @changeActiveType="setGridType" />
    <h3 class="filters__label" v-if="isMonth">Выбор месяца</h3>
    <MonthFilter v-if="isMonth" :year="'2022'" @changeMonth="changeMonth" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {IType} from "@/store/calendarInterface";
import TypeFilter from "@/components/CalendarFilters/TypeFilter/TypeFilter.vue";
import calendarModule from "@/store/calendarModule";
import MonthFilter from "@/components/CalendarFilters/MonthFilter/MonthFilter.vue";
import moment from "moment";
@Component({
  components: {MonthFilter, TypeFilter}
})
export default class CalendarFilters extends Vue {
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

  setGridType(type) {
    calendarModule.setCalendarType(type);
  }

  changeMonth(month) {
    calendarModule.getMonthCalendar(moment(`${month.id}-01`).format('YYYY-MM'))
  }

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
