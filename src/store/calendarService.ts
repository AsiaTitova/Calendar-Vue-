import httpClient from "@/api/httpClient";
import { Service, Response } from "@/api/typeService";
import {AxiosResponse} from "axios";
import moment from "moment";

class calendarService extends Service {
  getCalendar(year = null): Response<any> {
    const currentYear = year ? year : moment().format('YYYY');
    return httpClient.get<any>(`calendar?year=${currentYear}`).then((resp: AxiosResponse<any>) => {
      return resp.data[0];
    });
  }
  getMonthCalendar(month): Response<any> {
    return httpClient.get<any>(`months?month=${month}`).then((resp: AxiosResponse<any>) => {
      return resp.data[0];
    });
  }
  getWeekCalendar(week): Response<any> {
    return httpClient.get<any>(`weeks?date_start=${week}`).then((resp: AxiosResponse<any>) => {
      return resp.data[0];
    });
  }
}

export default new calendarService();
