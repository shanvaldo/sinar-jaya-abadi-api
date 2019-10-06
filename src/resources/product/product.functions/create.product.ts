import { RESPONSE } from '../../../constants';
import { IProductDetailAttributes } from '../../../interfaces/IProductDetail';
import models from '../../../models';
import slugBuilder from '../../../utils/slugBuilder';

interface IInputCreateProduct {
  name: string;
  description: string;
  categoryId: string;
  subCategoryId: string;
  isAvailable: boolean;
  minOrder: number;
  price: number;
  productImages: Array<IProductDetailAttributes>;
}

export default (input: IInputCreateProduct) => new Promise(async (resolve, reject) => {
  const transaction = await models.sequelize.transaction();

  try {
    const { name, description, isAvailable, minOrder, price } = input;
    const { categoryId, subCategoryId, productImages } = input;

    if (!!subCategoryId) {
      const isSubCategoryValid = await models.SubCategory.findOne({
        where: { id: subCategoryId },
      });

      if (!isSubCategoryValid) {
        return reject(RESPONSE.error.subCategory.notExists);
      }

      if (isSubCategoryValid.categoryId !== categoryId) {
        return reject(RESPONSE.error.subCategory.notAssociate);
      }
    }

    const product = await models.Product.create({
      categoryId,
      description,
      isAvailable,
      minOrder,
      name,
      price,
      slug: slugBuilder(name),
      subCategoryId,
    }, { transaction });

    const productDetails = await Promise.all(productImages.map((productImage) => models.ProductDetail.create({
      linkImage: productImage.linkImage,
      order: productImage.order,
      productId: product.id,
    }, { transaction })));

    await transaction.commit();

    product.productImages = productDetails;

    return resolve(product);
  } catch (error) {
    await transaction.rollback();

    return reject(error.message || error);
  }
});
