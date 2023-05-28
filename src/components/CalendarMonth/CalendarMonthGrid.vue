<template>
  <div class="calendar__grid-month grid-month">
    <ul class="grid-month__week-day week-day">
      <li class="week-day__item" v-for="(day, index) in weekdays" :key="index">{{ day }}</li>
    </ul>
    <div class="grid-month__wrap">
      <CalendarMonthWeekColumn
        v-for="week in calendarGrid"
        :key="week.id"
        :week="week"
        :weekLength="calendarGrid.length"
      />
      <template v-if="calendarGrid.length < 6">
        <CalendarMonthWeekColumn
          v-for="(week, index) in 1"
          :key="index"
          :week="setWeekPlug(week)"
          :weekLength="7"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import calendarModule from "@/store/calendarModule";
import CalendarMonthWeekColumn from "@/components/CalendarMonth/CalendarMonthWeekColumn.vue";
@Component({
  components: {CalendarMonthWeekColumn}
})
export default class CalendarMonthGrid extends Vue {
  weekdays: Array<string> = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  setWeekPlug(week) {
    return {
      id: week,
      days: []
    }
  }

  get calendarGrid() {
    return calendarModule.calendarMonthGrid ? calendarModule.calendarMonthGrid?.weeks : [];
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.grid-month {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  gap: 16px;
  margin-right: 36px;

  &__wrap {
    border: 1px solid $system-bg;
    border-radius: 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}


.week-day {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  list-style: none;

  &__item {
    width: 12%;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $system-surface;
    font-size: 18px;
    line-height: 20px;
    font-weight: 500;
    margin-bottom: 8px;
  }
}
</style>
