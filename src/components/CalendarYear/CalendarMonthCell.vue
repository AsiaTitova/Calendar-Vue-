<template>
  <div :class="['grid-year__day', 'day', { 'day_weekends': isWeekend, 'day_short': isShort }]">
    <p class="day__number">{{setDayNumber}}</p>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import moment from "moment";
import {IDay} from "@/store/calendarInterface";

@Component
export default class CalendarMonthCell extends Vue {
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

  get isWeekend() {
    return !!(this.setDay && this.setDay.type === 1);
  }

  get isShort() {
    return !!(this.setDay && this.setDay.type === 2);
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.day {
  width: 12%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $system-text;
  font-size: 14px;
  line-height: 20px;

  &_weekends {
    background: $system-primary;
    color: $system-white;
    border-radius: 4px;
  }

  &_short {
    background: $system-primary-light;
    border-radius: 4px;
  }
}
</style>
