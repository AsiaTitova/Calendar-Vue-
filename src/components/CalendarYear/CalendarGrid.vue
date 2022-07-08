<template>
  <div class="calendar__grid-year grid-year">
    <CalendarMonthCard v-for="month in calendarGrid" :key="`month_${month.id}`" :month="month" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import CalendarMonthCard from "@/components/CalendarYear/CalendarMonthCard.vue";
import calendarModule from "@/store/calendarModule";
@Component({
  components: {CalendarMonthCard}
})
export default class CalendarGrid extends Vue {

  get calendarGrid() {
    return calendarModule.calendarGrid ? calendarModule.calendarGrid?.months : [];
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.grid-year {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 16px;
  margin-right: 36px;
}
</style>
