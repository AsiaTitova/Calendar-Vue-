import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import calendarService from "@/store/calendarService";

const name = "calendarModule";

if (store.hasModule(name)) {
  store.unregisterModule(name);
}

@Module({ dynamic: true, namespaced: true, name, stateFactory: true, store })
class calendarModule extends VuexModule {
  calendarGrid: any = null;

  @Mutation
  setCalendarGrid(grid: any) {
    this.calendarGrid = grid;
  }

  @Action
  async getCalendar() {
    const grid = await calendarService.getCalendar();
    if (grid)
      this.setCalendarGrid(grid);
  }
}

export default getModule(calendarModule);
