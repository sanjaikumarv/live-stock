import stateModel from "../../apis/common/state.model";
import logger from "../../lib/logger";
import statesAndCities from "./malay-states-and-cities.json";

const createStatesCities = () => {
  return stateModel.insertMany(statesAndCities).then(() => {
    logger.info({
      message: "0001 States and Cities Inserted",
    });
  });
};

export default createStatesCities;
