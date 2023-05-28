export interface IDay {
  id: string | number;
  type: number;
  events?: Array<IEvent>
}

export interface IWeek {
  id: string | number;
  month?: string,
  years?: string,
  days: Array<IDay>;
}

export interface IMonth {
  id: string | number;
  month: string;
  year?: string;
  weeks: Array<IWeek>;
}

export interface IYear {
  year: number;
  months: Array<IMonth>;
}

export type IType = {
  id: string | number;
  name: string;
}

export type IEvent = {
  id: string | number;
  name: string;
  date: string;
  start_time: string | number;
  end_time: string | number;
  description: string;
  location: ILocation
}

export type ILocation = {
  id: string | number;
  name: string;
  color: string;
}

export type IWorkingTime = {
  start_time: string;
  end_time: string;
}
