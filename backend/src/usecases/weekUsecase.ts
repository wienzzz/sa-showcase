import * as weekRepository from "../database/default/repository/weekRepository";
import { FindManyOptions, FindOneOptions, Between } from "typeorm";
import { IPublishShift, IUnpublishShift } from "../shared/interfaces";
import Week from "../database/default/entity/week";

export const find = async (opts: FindManyOptions<Week>): Promise<Week[]> => {
  return weekRepository.find(opts);
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  return weekRepository.findById(id, opts);
};

export const findByDate = async (query: IPublishShift): Promise<Week[]> => {
  return weekRepository.find({
    where: {
      dateStart: query.dateStart,
      dateEnd: query.dateEnd,
    }
  });
};

export const publish = async (payload: IPublishShift): Promise<Week> => {
  const week = new Week();
  week.dateStart = payload.dateStart;
  week.dateEnd = payload.dateEnd;
  week.isPublished = true;

  return weekRepository.create(week);
};

export const unpublish = async (id: string | string[]) => {
  return weekRepository.deleteById(id);
};
