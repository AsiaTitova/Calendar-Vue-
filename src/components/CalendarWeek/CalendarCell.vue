<template>
  <div
    class="calendar-cell"
    ref="calendarCell"
    :class="{ 'calendar-cell_first': isFirst}"
    :id="cellId"
    :data-start="time.start_time"
    :data-day="day"
  >
    <div
      :class="['calendar-cell__time', { 'calendar-cell__time_active': isActiveHour }]"
      v-if="showTime"
    >
      {{ time.start_time }}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import moment from "moment";

@Component
export default class CalendarCell extends Vue {
  @Prop({
    default: () => {}
  })
  time!: any;
  @Prop({
    default: 1
  })
  indexDay!: number;
  @Prop({
    default: "",
    type: String
  })
  day!: any;
  @Prop({
    default: true,
    type: Boolean
  })
  eventLoader!: boolean;
  @Prop({
    default: "",
    type: String
  })
  scrollTime!: string;
  cellHeight = 0;
  cellWidth = 0;
  windowWidth: number = 0;

  mounted() {
    this.cellHeight = (this.$refs.calendarCell as HTMLElement).offsetHeight;
    this.cellWidth = (this.$refs.calendarCell as HTMLElement).offsetWidth;
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  }

  timeFormat(time) {
    return time > 9 ? time : `0${time}`;
  }

  resizeHandler() {
    this.windowWidth = window.innerWidth;
  }

  get cellId() {
    return `${this.day} ${this.time.start_time}:00`;
  }

  get isFirst() {
    return this.indexDay === 0;
  }

  get showTime() {
    return this.windowWidth < 580 || this.isFirst;
  }

  get isActiveHour() {
    return this.windowWidth < 580
      ? moment().format("YYYY-MM-DD") === this.day &&
          Number(this.time?.start_time.split(":")[0]) === Number(new Date().getHours())
      : Number(this.time?.start_time.split(":")[0]) === Number(new Date().getHours());
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.calendar-cell {
  width: 100%;
  height: 120px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid #ebe8f0;

  //@include themed() {
  //  border-bottom: 1px solid;
  //  border-color: t($outline);
  //  background: t($surface);
  //}
  //
  //&_none-active {
  //  pointer-events: none;
  //}
  //
  //&:last-child {
  //  border: none;
  //}
  //
  //&:first-child {
  //  @include themed() {
  //    border-top: 1px solid;
  //    border-color: t($outline);
  //    background: t($surface);
  //  }
  //}
  //

  &__time {
    padding: 4px;
    letter-spacing: 0.25px;
    position: absolute;
    left: -60px;
    top: -14px;
    background: $system-bg;
    border-radius: 4px;


    &_active {
      padding: 4px;
      border-radius: 4px;
    }
  }
}
</style>
