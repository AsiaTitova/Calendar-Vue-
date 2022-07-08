<template>
  <div class="calendar__grid-year grid-year">
    <CalendarMonthCard v-for="month in grid" :key="`month_${month.id}`" :month="month" />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import CalendarMonthCard from "@/components/CalendarYear/CalendarMonthCard.vue";
import {IMonth} from "@/store/calendarInterface";
@Component({
  components: {CalendarMonthCard}
})
export default class CalendarGrid extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  grid!: Array<IMonth>;

}
</script>

<style scoped lang="scss">
@import "~@/assets/base/colors";

.grid-year {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 16px;
}
</style>
