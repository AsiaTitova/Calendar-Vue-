import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import calendarService from "@/store/calendarService";
import {IMonth, IType, IYear} from "@/store/calendarInterface";
import moment from "moment";

const name = "calendarModule";

if (store.hasModule(name)) {
  store.unregisterModule(name);
}

@Module({ dynamic: true, namespaced: true, name, stateFactory: true, store })
class calendarModule extends VuexModule {
  calendarGrid: IYear | null = null;
  calendarMonthGrid: IMonth | null = null;
  calendarWeekGrid: IMonth | null = null;
  currentMonth: string = moment().locale('ru').format('MMMM');
  gridType: IType = {
    id: 'year',
    name: 'Год'
  };

  @Mutation
  setCalendarGrid(grid: IYear) {
    this.calendarGrid = grid;
  }

  @Mutation
  setCalendarType(type: IType) {
    this.gridType = type;
  }

  @Mutation
  setMonthGrid(grid: IMonth) {
    this.calendarMonthGrid = grid;
    this.currentMonth = grid.month;
  }

  @Mutation
  setWeekGrid(grid: IMonth) {
    this.calendarWeekGrid = grid;
  }

  @Action
  async getCalendar(year) {
    const grid = await calendarService.getCalendar(year);
    if (grid)
      this.setCalendarGrid(grid);
  }

  @Action
  async getMonthCalendar(months) {
    const grid = await calendarService.getMonthCalendar(months);
    if (grid)
      this.setMonthGrid(grid);
  }

  @Action
  async getWeekCalendar(week) {
    const grid = await calendarService.getWeekCalendar(week);
    if (grid)
      this.setWeekGrid(grid);
  }
}

export default getModule(calendarModule);
