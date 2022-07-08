<template>
  <div class="grid-year__week">
    <CalendarMonthCell v-for="day in 7" :key="day" :days="week.days" :weekday="day" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import CalendarMonthCell from "@/components/CalendarYear/CalendarMonthCell.vue";
import {IWeek} from "@/store/calendarInterface";

@Component({
  components: {CalendarMonthCell}
})
export default class CalendarMonthWeek extends Vue {
  @Prop({
    type: Object,
    default: () => null
  })
  week!: IWeek | null;
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.grid-year {
  &__week {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
}
</style>
