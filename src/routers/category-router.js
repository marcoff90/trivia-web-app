import {Router} from 'express';
import CategoryController from "../controllers/category-controller";

const CategoryRouter = Router();

CategoryRouter.get('/api/categories', CategoryController.showCategories);

export default CategoryRouter;
