import {
    getRepository,
    FindManyOptions,
    FindOneOptions,
    FindConditions,
    DeleteResult,
    getManager
  } from "typeorm";
  import moduleLogger from "../../../shared/functions/logger";
  import Week from "../entity/week";
  import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
  
  const logger = moduleLogger("weekRepository");
  
  export const find = async (opts?: FindManyOptions<Week>): Promise<Week[]> => {
    logger.info("Find");
    const repository = getRepository(Week);
    const data = await repository.find(opts);
    return data;
  };
  
  export const findById = async (
    id: string,
    opts?: FindOneOptions<Week>
  ): Promise<Week> => {
    logger.info("Find by id");
    const repository = getRepository(Week);
    const data = await repository.findOne(id, opts);
    return data;
  };
  
  export const findOne = async (
    where?: FindConditions<Week>,
    opts?: FindOneOptions<Week>
  ): Promise<Week> => {
    logger.info("Find one");
    const repository = getRepository(Week);
    const data = await repository.findOne(where, opts);
    return data;
  };
  
  export const create = async (payload: Week): Promise<Week> => {
    logger.info("Create");
    const repository = getRepository(Week);
    const newdata = await repository.save(payload);
    return newdata;
  };
  
  export const updateById = async (
    id: string,
    payload: QueryDeepPartialEntity<Week>
  ): Promise<Week> => {
    logger.info("Update by id");
    const repository = getRepository(Week);
    await repository.update(id, payload);
    return findById(id);
  };
  
  export const deleteById = async (
    id: string | string[]
  ): Promise<DeleteResult> => {
    logger.info("Delete by id");
    const repository = getRepository(Week);
    return await repository.delete(id);
  };
  
  export const copyWeek = async (start: any, end: any): Promise<Week[]> => {
    logger.info("Copy Week");
    const entityManager = getManager();
    return entityManager.query(`WITH rows AS (insert into shift(name,date,"startTime","endTime")
    select name, date + interval '7 day', "startTime", "endTime" FROM
    shift 
    where
    date between $1 and $2 AND is_valid_shift(date,"startTime","endTime")
    ON CONFLICT DO NOTHING RETURNING name,date) SELECT * FROM rows`,[start, end])
  };
