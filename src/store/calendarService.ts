import httpClient from "@/api/httpClient";
import { Service, Response } from "@/api/typeService";
import {AxiosResponse} from "axios";

class calendarService extends Service {
  getCalendar(): Response<any> {
    return httpClient.get<any>("calendar").then((resp: AxiosResponse<any>) => {
      return resp.data[0];
    });
  }
}

export default new calendarService();
