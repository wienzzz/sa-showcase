import { Request, ResponseToolkit } from "@hapi/hapi";
import * as weekUsecase from "../../../usecases/weekUsecase";
import { errorHandler } from "../../../shared/functions/error";
import {
  IPublishShift,
  ISuccessResponse,
  IUnpublishShift,
} from "../../../shared/interfaces";
import moduleLogger from "../../../shared/functions/logger";
import weeks from ".";

const logger = moduleLogger("weekController");

export const find = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find publish week");
  try {
    const filter = req.query;
    const data = await weekUsecase.find(filter);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get publish successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};

export const findByDate = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find publish week by Date");
  try {
    const filter = req.query;
    const data = await weekUsecase.findByDate(filter);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get publish week successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};

export const findById = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find publish by id");
  try {
    const id = req.params.id;
    const data = await weekUsecase.findById(id);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get publish successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};



export const publish = async (req: Request, h: ResponseToolkit) => {
  logger.info("Publish week");
  try {
    const body = req.payload as IPublishShift;
    const data = await weekUsecase.publish(body);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Publish shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};


export const unpublish = async (req: Request, h: ResponseToolkit) => {
  logger.info("Unpublish shift by id");
  try {
    const id = req.params.id;
    const data = await weekUsecase.unpublish(id);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Unpublish shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};
