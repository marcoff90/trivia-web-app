import CategoryRepository from "../repositories/category-repository";

const getAll = async () => {
  return await CategoryRepository.findAll();
};

export default {
  getAll
};
