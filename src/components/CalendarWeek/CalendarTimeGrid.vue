<template>
  <div class="calendar-time-grid">
    <CalendarCell
      v-for="time in timeList"
      :indexDay="index"
      :key="time.start_time"
      :time="time"
      :day="day"
      :scrollTime="scrollTime"
      :data-start="time.start_time"
      :data-end="time.end_time"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CalendarCell from "@/components/CalendarWeek/CalendarCell";

@Component({
  components: { CalendarCell }
})
export default class CalendarTimeGrid extends Vue {
  @Prop({
    default: 1,
    type: Number
  })
  index!: number;
  @Prop({
    default: () => [],
    type: Array
  })
  timeList!: Array<any>;
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
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.calendar-time-grid {
  //list-style: none;
  //margin: 0;
  //display: flex;
  //flex-flow: column;
  //padding: 110px 0 0;
  //@include themed() {
  //  background: t($surface);
  //}
}
</style>
