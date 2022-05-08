import Category from "../models/category";
import "core-js/stable";
import "regenerator-runtime/runtime";

const findAll = async () => {
  return await Category.findAll();
}

export default {
  findAll
}
