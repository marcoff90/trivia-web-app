import PossibleAnswer from "../models/possible-answer";
import "core-js/stable";
import "regenerator-runtime/runtime";

const findAll = async () => {
  return await PossibleAnswer.findAll();
};

export default {
  findAll,
}
