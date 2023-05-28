<template>
    <div
      class="grid-week__day-week day-week"
      :class="[`day_${index + 1}`]"
    >
      <div
        class="day-week__header"
        :class="[isToday ? 'day-week__header_today' : '']"
        :id="`headerDay_${day.id}`"
      >
      <span class="day-week__label">
          {{ setDayWeek }}
        </span>
          <span class="day-week__date">
          {{ setDay }}
        </span>
      </div>
      <div class="day-week__timeline" v-if="isToday" ref="timeline">
        <div class="day-week__line"></div>
        <div class="day-week__tooltip">{{ nowTime }}</div>
      </div>
      <transition name="fade-fast" appear>
        <CalendarTimeGrid
          :index="index"
          :timeList="timeGrid"
          :day="day.id"
          :scroll-time="scrollTime"
        />
      </transition>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {IDay, IWorkingTime} from "@/store/calendarInterface";
import moment from "moment";
import CalendarCell from "@/components/CalendarWeek/CalendarCell.vue";
import CalendarTimeGrid from "@/components/CalendarWeek/CalendarTimeGrid.vue";

@Component({
  components: {
    CalendarCell,
    CalendarTimeGrid
  }
})
export default class CalendarWeekDay extends Vue {
  // props
  @Prop({
    type: Object,
    default: () => null
  })
  day!: IDay | null;
  @Prop({
    type: Object,
    default: () => {}
  })
  workingTime!: IWorkingTime;
  @Prop({
    default: "",
    type: String
  })
  scrollTime!: string;
  @Prop({
    default: 1,
    type: Number
  })
  index!: number;

  //data
  nowTime: string = moment().format("LT");
  timeList: Array<IWorkingTime> = [
    { start_time: "00:00", end_time: "01:00" },
    { start_time: "01:00", end_time: "02:00" },
    { start_time: "02:00", end_time: "03:00" },
    { start_time: "03:00", end_time: "04:00" },
    { start_time: "04:00", end_time: "05:00" },
    { start_time: "05:00", end_time: "06:00" },
    { start_time: "06:00", end_time: "07:00" },
    { start_time: "07:00", end_time: "08:00" },
    { start_time: "08:00", end_time: "09:00" },
    { start_time: "09:00", end_time: "10:00" },
    { start_time: "10:00", end_time: "11:00" },
    { start_time: "11:00", end_time: "12:00" },
    { start_time: "12:00", end_time: "13:00" },
    { start_time: "13:00", end_time: "14:00" },
    { start_time: "14:00", end_time: "15:00" },
    { start_time: "15:00", end_time: "16:00" },
    { start_time: "16:00", end_time: "17:00" },
    { start_time: "17:00", end_time: "18:00" },
    { start_time: "18:00", end_time: "19:00" },
    { start_time: "19:00", end_time: "20:00" },
    { start_time: "20:00", end_time: "21:00" },
    { start_time: "21:00", end_time: "22:00" },
    { start_time: "22:00", end_time: "23:00" },
    { start_time: "23:00", end_time: "00:00" },
    { start_time: "24:00", end_time: "00:00" }
  ];
  events: Array<any> = [];
  times: Array<any> = [];
  count: number = 0;
  windowWidth: number = 0;
  timeoutId: number = 0;
  gridStartTime: string = "08:00";

  //mounted
  mounted() {
    this.setCalendarTime(this.workingTime.start_time, this.workingTime.end_time);
    if (this.isToday) {
      this.setTimeLinePosition();
    }
    clearTimeout(this.timeoutId);
    window.addEventListener("resize", this.resizeWindow);
    this.windowWidth = window.innerWidth;
  }


  // methods
  /**
   * set line position percent.
   * @return {string} - set the line position in hour
   */
  setTimeLinePosition() {
    clearTimeout(this.timeoutId);
    this.nowTime = moment().format("HH:mm");
    const [hour, minute] = this.nowTime.split(":");
    this.$nextTick(() => {
      const name = `${hour}:00`;
      let $el = document.querySelector<HTMLElement>(`[data-start="${name}"]`)!;
      if ($el) {
        let line = this.linePosition(+minute);
        let header = document.getElementById(`.headerDay_${this.day?.id}`)!;
        if (this.$refs.timeline && header) {
          this.$refs.timeline['style'].top = `${
            $el.offsetTop + header?.offsetHeight + line * $el.clientHeight
          }px`;
          this.$refs.timeline['style'].right = `${
            $el.offsetLeft - ($el.clientWidth * (7 - (this.index + 1)))
          }px`;
        }
        this.timeoutId = setTimeout(this.setTimeLinePosition, 60000);
      }
    });
  }

  /**
   * Line position percent.
   * @param {number} minute -  current minute.
   * @return {number} - line position in hour
   */
  linePosition(minute = 0) {
    return minute / 60;
  }

  /**
   * Set work time in calendar.
   * @param {string} start - Start work time.
   * @param {string} end - End work time.
   */
  setCalendarTime(start = "08:00", end = "20:00") {
    const times = JSON.parse(JSON.stringify(this.timeList));
    const startIndex = times.findIndex((item) => item.start_time === start);
    const endIndex = times.findIndex((item) => item.start_time === end);
    this.timeList = times.slice(startIndex, endIndex);
  }

  resizeWindow() {
    this.windowWidth = window.innerWidth;
  }

  // computed
  get setDayWeek() {
    moment.locale("ru");
    if (this.windowWidth < 1300 && this.windowWidth > 768) {
      let weekName = moment(this.day?.id).format("dd");
      return weekName[0].toUpperCase() + weekName.slice(1);
    } else {
      let weekName = moment(this.day?.id).format("dddd");
      return weekName[0].toUpperCase() + weekName.slice(1);
    }
  }

  get timeGrid() {
    const [hh] = this.workingTime.start_time.split(":");
    return this.timeList.map((item) => {
      if (this.day && this.day.events) {
        const events = this.day?.events.filter((event) => {
          let hourS = new Date(event.start_time).getHours();
          let hourE = new Date(event.end_time).getHours();
          hourS = +hh > hourS && hourE > +hh ? +hh : hourS;
          const hourFormat = hourS <= 9 ? `0${hourS}:00` : `${hourS}:00`;
          return hourFormat === item.start_time;
        });
        return {...item, events};
      } else {
        return {...item};
      }
    });
  }

  get setDay() {
    moment.locale("ru");
    return moment(this.day?.id).format("L").slice(0, 5);
  }

  get isToday() {
    return moment(this.day?.id).format("L") === moment().format("L");
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.day-week {
  width: calc(100% / 7);
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  height: 100%;

  &:not(.day_7) .calendar-time-grid {
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

  &__header {
    position: sticky;
    top: 0;
    z-index: 10;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 16px 0;
    gap: 8px;
    font-weight: 500;
    text-align: center;
    background: $system-primary-bg;
    border-bottom: 1px solid $system-bg;
  }

  &__timeline {
    position: absolute;
    width: 100vw;
    z-index: 8;
    height: 4px;
    cursor: pointer;
    right: 0;

    &:hover {
      .day-week__tooltip {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  &__line {
    position: relative;
    width: 100%;
    height: 4px;
    background: $system-primary;

    //&::before {
    //  top: 1px;
    //  left: 0;
    //  transform: translateY(-40%);
    //  content: "";
    //  position: absolute;
    //  width: 8px;
    //  height: 8px;
    //  border-radius: 50%;
    //  @include themed() {
    //    background: t($primary);
    //  }
    //}
    //&::after {
    //  top: 0;
    //  right: 0;
    //  content: "";
    //  position: absolute;
    //  width: calc(100% - 6px);
    //  height: 4px;
    //  @include themed() {
    //    background: t($primary);
    //  }
    //}
  }

  &__tooltip {
    transition: opacity 0.5s ease;
    transform: scale(0);
    opacity: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #ffffff;
    padding: 5px 9px;
    border-radius: 2px 2px 0 0;
    z-index: 8;
    font-family: "Roboto", sans-serif;
    background: $system-primary;
  }
}
</style>
