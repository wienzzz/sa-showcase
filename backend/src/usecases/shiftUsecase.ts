import * as shiftRepository from "../database/default/repository/shiftRepository";
import { FindManyOptions, FindOneOptions, Between } from "typeorm";
import Shift from "../database/default/entity/shift";
import { ICreateShift, IUpdateShift, IPublishShift } from "../shared/interfaces";

export const find = async (opts: FindManyOptions<Shift>): Promise<Shift[]> => {
  return shiftRepository.find(opts);
};

export const findBetweenDates = async (payload: IPublishShift): Promise<Shift[]> => {
  return shiftRepository.find({
    where: {
      date: Between(
        payload.dateStart,
        payload.dateEnd
      ),
    },
    order: {
      date: 'ASC',
      startTime: 'ASC'
    }
  });
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Shift>
): Promise<Shift> => {
  return shiftRepository.findById(id, opts);
};

export const create = async (payload: ICreateShift): Promise<Shift> => {
  const shift = new Shift();
  shift.name = payload.name;
  shift.date = payload.date;
  shift.startTime = payload.startTime;
  shift.endTime = payload.endTime;

  return shiftRepository.create(shift);
};

export const updateById = async (
  id: string,
  payload: IUpdateShift
): Promise<Shift> => {
  return shiftRepository.updateById(id, {
    ...payload,
  });
};

export const deleteById = async (id: string | string[]) => {
  return shiftRepository.deleteById(id);
};

export const deleteByDate = async (payload: IPublishShift) => {
  return shiftRepository.deleteByDate(payload);
};

