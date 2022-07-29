import * as typeorm from "typeorm";
import * as weekRepository from "../weekRepository";
import Week from "../../entity/week";

describe("weekRepository => find", () => {
  it("find => passed", async () => {
    const expectedData = new Week();
    expectedData.dateStart = "2022-07-25";
    expectedData.dateEnd = "2022-07-31";
    expectedData.isPublished = true;

    const getRepositorySpy = jest
      .spyOn(typeorm, "getRepository")
      .mockReturnValue({
        find: jest.fn().mockResolvedValue([expectedData]),
      } as any);

    const result = await weekRepository.find();

    expect(result).toEqual([expectedData]);
    expect(getRepositorySpy).toHaveBeenNthCalledWith(1, Week);
    expect(typeorm.getRepository(Week).find).toHaveBeenCalledTimes(1);
  });
});

describe("weekRepository => findById", () => {
  it("findById => passed", async () => {
    const id = "0000-0000-000-000";

    const expectedData = new Week();
    expectedData.id = id;
    expectedData.dateStart = "2022-07-25";
    expectedData.dateEnd = "2022-07-31";
    expectedData.isPublished = true;

    const getRepositorySpy = jest
      .spyOn(typeorm, "getRepository")
      .mockReturnValue({
        findOne: jest.fn().mockResolvedValue(expectedData),
      } as any);

    const result = await weekRepository.findById(id);

    expect(result).toEqual(expectedData);
    expect(getRepositorySpy).toHaveBeenNthCalledWith(1, Week);
    expect(typeorm.getRepository(Week).findOne).toHaveBeenNthCalledWith(
      1,
      id,
      undefined
    );
  });
});

describe("weekRepository => findOne", () => {
  it("findOne => passed", async () => {
    const id = "0000-0000-000-000";

    const expectedData = new Week();
    expectedData.id = id;
    expectedData.dateStart = "2022-07-25";
    expectedData.dateEnd = "2022-07-31";
    expectedData.isPublished = true;

    const getRepositorySpy = jest
      .spyOn(typeorm, "getRepository")
      .mockReturnValue({
        findOne: jest.fn().mockResolvedValue(expectedData),
      } as any);

    const result = await weekRepository.findOne({
      id: id,
    });

    expect(result).toEqual(expectedData);
    expect(getRepositorySpy).toHaveBeenNthCalledWith(1, Week);
    expect(typeorm.getRepository(Week).findOne).toHaveBeenNthCalledWith(
      1,
      { id },
      undefined
    );
  });
});

describe("weekRepository => create", () => {
  it("create => passed", async () => {
    const payload = new Week();
    payload.dateStart = "2022-07-25";
    payload.dateEnd = "2022-07-31";

    const expectedResult = {
      id: "0000-0000-0000-0000",
      dateStart: "2022-07-25",
      dateEnd: "2022-07-31",
    };

    const getRepositorySpy = jest
      .spyOn(typeorm, "getRepository")
      .mockReturnValue({
        save: jest.fn().mockResolvedValue(expectedResult),
      } as any);

    const result = await weekRepository.create(payload);

    expect(result).toEqual(expectedResult);
    expect(getRepositorySpy).toHaveBeenNthCalledWith(1, Week);
    expect(typeorm.getRepository(Week).save).toHaveBeenNthCalledWith(
      1,
      payload
    );
  });
});
