<template>
  <div class="calendar__grid-week grid-week">
    <CalendarWeekDay
      v-for="(day, index) in calendarGrid.days"
      :day="day"
      :key="index"
      :index="index"
      :workingTime="workingTime"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import calendarModule from "@/store/calendarModule";
import CalendarWeekDay from "@/components/CalendarWeek/CalendarWeekDay.vue";
import {IWorkingTime} from "@/store/calendarInterface";
@Component({
  components: {CalendarWeekDay}
})
export default class CalendarWeekGrid extends Vue {

  workingTime: IWorkingTime = {
    start_time: "08:00",
    end_time: "24:00"
  }

  get calendarGrid() {
    return calendarModule.calendarWeekGrid ? calendarModule.calendarWeekGrid : [];
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.grid-week {
  display: flex;
  width: 100%;
  max-height: calc(100vh - 146px);
  margin: 0;
  padding: 0 0 0 68px;
  overflow-y: auto;
  border: 1px solid $system-bg;
  border-radius: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
