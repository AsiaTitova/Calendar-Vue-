<template>
  <div class="grid-month__week">
    <CalendarMonthDay
      v-for="day in 7"
      :key="day"
      :days="week.days"
      :weekday="day"
      :weekNumber="week.id"
      :weekLength="weekLength"
    />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {IWeek} from "@/store/calendarInterface";
import CalendarMonthDay from "@/components/CalendarMonth/CalendarMonthDay.vue";
@Component({
  components: {CalendarMonthDay}
})
export default class CalendarMonthWeekColumn extends Vue {
  @Prop({
    type: Object,
    default: () => null
  })
  week!: IWeek | null;
  @Prop({
    type: Number,
    default: 0
  })
  weekLength!: number;

}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.grid-month{
  &__week {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child) {
      border-bottom: 1px solid $system-bg;
    }
  }
}

</style>
