import CategoryService from "../services/category-service";

const showCategories = async (req, res, next) => {
  let categories = await CategoryService.getAll();
  console.log(categories)
  if (categories) {
    res.json(categories);
  }
  next();
};

export default {
  showCategories
};
