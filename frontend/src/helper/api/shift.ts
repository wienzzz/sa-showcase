import { getAxiosInstance } from ".";

export const getShifts = async () => {
  const api = getAxiosInstance()
  const { data } = await api.get("/shifts?order[date]=DESC&order[startTime]=ASC");
  return data;
};

export const getShiftsByDate = async (start: string, end: string) => {
  const api = getAxiosInstance()
  const { data } = await api.get("/shifts/between?dateStart="+start+"&dateEnd="+end);
  return data;
};

export const getShiftById = async (id: string) => {
  const api = getAxiosInstance()
  const { data } = await api.get(`/shifts/${id}`);
  return data;
};

export const createShifts = async (payload: any) => {
  const api = getAxiosInstance()
  const { data } = await api.post("/shifts", payload);
  return data;
};

export const updateShiftById = async (id: string, payload: any) => {
  const api = getAxiosInstance()
  const { data } = await api.patch(`/shifts/${id}`, payload);
  return data;
};

export const deleteShiftById = async (id: string) => {
  const api = getAxiosInstance()
  const { data } = await api.delete(`/shifts/${id}`);
  return data;
};

export const deleteShiftWeek = async (payload: any) => {
  const api = getAxiosInstance()
  const { data } = await api.post(`/shifts/week`,payload);
  return data;
};

export const getPublishedShift = async (payload: any) => {
  const api = getAxiosInstance()
  const { data } = await api.get("/weeks/by-date?dateStart="+payload.dateStart+"&dateEnd="+payload.dateEnd);
  return data;
};

export const publishShift = async (payload: any) => {
  const api = getAxiosInstance()
  const { data } = await api.post(`/weeks/publish`,payload);
  return data;
};

export const unPublishShift = async (id: string) => {
  const api = getAxiosInstance()
  const { data } = await api.delete(`/weeks/unpublish/${id}`);
  return data;
};

export const copyShift = async (payload: any) => {
  const api = getAxiosInstance()
  const { data } = await api.post(`/weeks/copy`,payload);
  return data;
};