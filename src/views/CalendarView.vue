<template>
  <section class="calendar">
    <h1 class="calendar__title">Календарь, {{currentMonth}} {{ currentYear }}</h1>
    <div class="calendar__wrap">
      <CalendarGrid v-if="isYear" />
      <CalendarMonthGrid v-if="isMonth" />
      <CalendarWeekGrid v-if="isWeek" />
      <CalendarFilters :currentYear="String(currentYear)" />
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import moment from "moment";
import calendarModule from "@/store/calendarModule";
import CalendarGrid from "@/components/CalendarYear/CalendarGrid.vue";
import CalendarFilters from "@/components/CalendarFilters/CalendarFilters.vue";
import CalendarMonthGrid from "@/components/CalendarMonth/CalendarMonthGrid.vue";
import CalendarWeekGrid from "@/components/CalendarWeek/CalendarWeekGrid.vue";

@Component({
  components: {CalendarWeekGrid, CalendarMonthGrid, CalendarFilters, CalendarGrid}
})
export default class CalendarView extends Vue {
  // mounted
  mounted() {
    this.changeGrid();
  }

  // methods
  changeGrid() {
    if (this.isYear) {
      calendarModule.getCalendar(null);
    }
    if (this.isMonth) {
      calendarModule.getMonthCalendar(moment().format('YYYY-MM'))
    }
    if (this.isWeek) {
      calendarModule.getWeekCalendar(moment().startOf('isoWeek').format('YYYY-MM-DD'))
    }
  }

  // computed
  get currentYear() {
    return calendarModule.calendarGrid && calendarModule.calendarGrid.year ? calendarModule.calendarGrid?.year : moment().format('YYYY');
  }

  get currentMonth() {
    return this.isMonth && calendarModule.currentMonth
      ? moment(`${calendarModule.currentMonth}-01`).locale('ru').format('MMMM')
      : '';
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

  // watch
  @Watch('gridType')
  changeType() {
    this.changeGrid();
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.calendar {
  width: calc(100% - 72px);
  max-height: 100%;
  height: calc(100% - 80px);
  padding: 24px 36px;
  background: $system-white;

  &__title {
    margin: 0 0 24px;
    color: $system-text;
    font-size: 24px;
    line-height: 36px;
  }

  &__wrap {
    display: flex;
    width: 100%;
    height: calc(100% - 64px);
    overflow-y: scroll;
    gap: 16px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
