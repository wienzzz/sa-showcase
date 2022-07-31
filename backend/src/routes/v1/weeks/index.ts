import { Server } from '@hapi/hapi';
import * as weekController from './weekController';
import { publishShiftDto, filterSchema, idDto, updateShiftDto } from '../../../shared/dtos';

export default function (server: Server, basePath: string) {
  server.route({
    method: "GET",
    path: basePath,
    handler: weekController.find,
    options: {
      description: 'Get published week with filter',
      notes: 'Get all published week if filter is not specified.',
      tags: ['api', 'weeks']
    }
  });
  
  server.route({
    method: "GET",
    path: basePath+'/by-date',
    handler: weekController.findByDate,
    options: {
      description: 'Get Published weeks by date',
      notes: 'Parameter should be given dateStart and dateEnd',
      tags: ['api', 'weeks'],
      validate: {
        query: publishShiftDto
      }
    }
  });

  server.route({
    method: "GET",
    path: basePath + "/{id}",
    handler: weekController.findById,
    options: {
      description: 'Get published weeks by id',
      notes: 'Get published weeks by id',
      tags: ['api', 'weeks'],
      validate: {
        params: idDto
      },
    }
  });
  
  server.route({
    method: "POST",
    path: basePath + "/publish",
    handler: weekController.publish,
    options: {
      description: 'Publish shift within given week date',
      notes: 'Publish shift within given week date. Date should start on Monday and end on Sunday with one week range',
      tags: ['api', 'weeks', 'shift'],
      validate: {
        payload: publishShiftDto
      },
    }
  });
  
  server.route({
    method: "POST",
    path: basePath + "/unpublish/{id}",
    handler: weekController.unpublish,
    options: {
      description: 'Unpublish shift',
      notes: 'Unpublish shift',
      tags: ['api', 'shift', 'weeks'],
      validate: {
        params: idDto,
      },
    }
  });

  server.route({
    method: "POST",
    path: basePath + "/copy",
    handler: weekController.copy,
    options: {
      description: 'Copy entire week shift into next week',
      notes: 'Copy entire week shift into next week',
      tags: ['api', 'shift', 'weeks'],
      validate: {
        payload: publishShiftDto
      },
    }
  });
}