export interface ICreateShift {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface IUpdateShift {
  name?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  weekId? : string;
}

export interface IPublishShift {
  dateStart?: string;
  dateEnd?: string;
}

export interface IUnpublishShift {
  dateStart?: string;
  dateEnd?: string;
  publishId?: string;
}