<template>
  <li
    class="event-card"
    :style="setCardStyle"
    :ref="'event_' + event.id"
  >
    <h3 class="event-card__title">{{ event.name }}</h3>
    <div class="event-card__wrap">
      <p class="event-card__description">{{ event.description }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import { IEvent } from "@/store/calendarInterface";
import moment from "moment";

@Component
export default class CalendarEventCard extends Vue {
  // props
  @Prop({
    type: Object,
    default: () => null
  })
  event!: IEvent | null;

  @Prop({
    type: String,
    default: ""
  })
  date!: string;

  @Prop({
    type: Number,
    default: 1
  })
  count!: number;

  @Prop({
    type: Number,
    default: 0
  })
  cellWidth!: number;

  @Prop({
    type: Number,
    default: 0
  })
  cellHeight!: number;

  @Prop({
    type: Number,
    default: 0
  })
  index!: number;

  // data
  topData: number | string = 0;
  zIndex: number | string = 1;


  // methods
  /**
   * set width and height cell.
   * @param {string} time - time
   */
  setTime(time: string = "08:00") {
    const [hh, mm, ss] = time.split(":");
    return `${hh}:${mm}`;
  }

  // computed
  get setCardColor() {
    return moment(new Date(this.event?.date + "T" + this.event?.end_time)) < moment()
      ? { background: "#D3D2E0", border: `1px solid #ffffff` }
      : this.event?.location
        ? {
          background: this.event?.location?.color,
          border: `1px solid ${this.event?.location?.color}`
        }
        : { background: "#5551F9", border: `1px solid #ffffff` };
  }

  get setCardStyle() {
    return [
      this.setCardColor,
      {
        top: this.setTopPosition + "px",
        height: this.setHeight + "px",
        width: 90 - this.setLeft + "%",
        left: this.setLeft + "%",
        borderColor: this.index ? "#fff" : "",
        zIndex: this.zIndex
      }
    ];
  }

  get setTopPosition() {
    const [hh, mm, ss] = String(this.event?.start_time).split(":");
    return this.cellHeight * (Number(mm) / 60);
  }

  get setHeight() {
    const [shh, smm, sss] = String(this.event?.start_time).split(":");
    const [ehh, emm, ess] = String(this.event?.end_time).split(":");
    const difHour = Number(ehh) - Number(shh);
    const difMinute = Number(emm) - Number(smm);
    return this.cellHeight * (difHour + difMinute / 60);
  }

  get setEventTime() {
    return this.event ? `${this.setTime(String(this.event?.start_time))}–${this.setTime(String(this.event?.end_time))}` : '';
  }

  get setLeft() {
    switch (this.count) {
      case 2: {
        return this.index * 35;
      }
      case 3: {
        return this.index * 25;
      }
      case 4: {
        return this.index * 15;
      }
      default: {
        return this.index * 5;
      }
    }
  }

}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.event-card {
  cursor: pointer;
  background-color: $system-primary;
  padding: 8px;
  border-radius: 4px;
  color: $system-text;
  width: calc(100% - 48px);
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid $system-white;
  overflow: hidden;
  min-height: 50px;

  &:hover {
    .event-card__list {
      opacity: 1;
      transform: scale(1);
    }
  }

  &__title {
    margin: 0 0 8px;
    padding: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    max-width: 100%;
    color: $system-white;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

//
//  &__icon-wrap {
//    margin-top: 1px;
//    display: flex;
//    align-items: center;
//    justify-content: center;
//    flex-shrink: 0;
//    width: 14px;
//    height: 14px;
//    background-color: #fff;
//    border-radius: 50%;
//    margin-right: 6px;
//
//    i {
//      font-size: 10px;
//      flex-shrink: 0;
//    }
//  }
//  &__description {
//    padding: 0;
//    margin: 0;
//    display: flex;
//    align-items: center;
//    flex-wrap: wrap;
//    font-weight: 400;
//    font-size: 12px;
//    line-height: 20px;
//
//    p {
//      margin-right: 8px;
//      display: flex;
//      align-items: center;
//    }
//
//    span {
//      display: block;
//      margin-left: 4px;
//      max-width: 150px;
//      overflow: hidden;
//      text-overflow: ellipsis;
//    }
//  }
}
</style>
