<template>
  <section class="calendar">
    <h1 class="calendar__title">Календарь, {{ currentYear }}</h1>
    <div class="calendar__wrap">
      <CalendarGrid :grid="calendarGrid" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import calendarModule from "@/store/calendarModule";
import CalendarGrid from "@/components/CalendarYear/CalendarGrid.vue";

@Component({
  components: {CalendarGrid}
})
export default class CalendarView extends Vue {
  mounted() {
    calendarModule.getCalendar();
  }

  get calendarGrid() {
    return calendarModule.calendarGrid ? calendarModule.calendarGrid?.months : [];
  }

  get currentYear() {
    return calendarModule.calendarGrid && calendarModule.calendarGrid.year ? calendarModule.calendarGrid?.year : moment().format('YYYY');
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.calendar {
  width: calc(100% - 72px);
  max-height: 100%;
  padding: 24px 36px;
  background: $system-white;

  &__title {
    margin: 0 0 24px;
    color: $system-text;
    font-size: 24px;
    line-height: 36px;
  }
}
</style>
