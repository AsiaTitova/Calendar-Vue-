<template>
    <div
      :class="['grid-month__day', 'day', `day_${weekday}`, `day_week-${weekNumber}`, { 'day_weekends': isWeekend }]"
      :style="setClassStyle"
    >
      <p :class="['day__number', {'day__number_today': isToday, 'day__number_weekends': isWeekend}]">{{setDayNumber}}</p>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {IDay} from "@/store/calendarInterface";
import moment from "moment";

@Component
export default class CalendarMonthDay extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  days!: Array<IDay>;
  @Prop({
    type: Number,
    default: 0
  })
  weekday!: number;
  @Prop({
    type: Number,
    default: 0
  })
  weekNumber!: number;
  @Prop({
    type: Number,
    default: 0
  })
  weekLength!: number;

  get setDay() {
    return this.days.length
      ? this.weekday === 7
        ? this.days.find(item => new Date(item.id).getDay() === 0)
        : this.days.find(item => new Date(item.id).getDay() === this.weekday)
      : null;
  }

  get setDayNumber() {
    return this.setDay ? moment(this.setDay.id).format('DD') : '';
  }

  get isToday() {
    return this.setDay ? this.setDay.id === moment().format('YYYY-MM-DD') : false;
  }

  get isWeekend() {
    return !!(this.setDay && this.setDay.type === 1);
  }

  get setClassStyle() {
    return this.weekNumber === 5 && this.weekLength !== 6 && this.weekday === 7
      ? 'border-radius: 0 0 16px 0;'
      : this.weekNumber === 6 && this.weekLength === 6 && this.weekday === 7
    ?'border-radius: 0 0 16px 0;'
        : ''
  }

}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.day {
  width: 13%;
  height: 120px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 8px;

  &:not(.day_7) {
    border-right: 1px solid $system-bg;
  }

  &_7.day_week-1 {
    border-radius: 0 16px 0 0;
  }

  &_weekends {
    background: $system-primary-bg;
  }

  &__number {
    padding: 4px 8px;
    color: $system-text;
    font-size: 14px;
    line-height: 20px;
    border-radius: 4px;
    font-weight: 500;

    &_today {
      background: $system-primary;
      color: $system-white;
    }

    &_weekends {
      color: $system-primary;
    }
  }
}
</style>
