export interface IDay {
  id: string;
  type: number;
}

export interface IWeek {
  id: number;
  days: Array<IDay>;
}

export interface IMonth {
  id: number;
  month: string;
  year?: string;
  weeks: Array<IWeek>;
}

export interface IYear {
  year: number;
  months: Array<IMonth>;
}

export type IType = {
  id: string;
  name: string;
}
