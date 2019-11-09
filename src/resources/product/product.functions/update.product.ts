import { RESPONSE } from '../../../constants';
import models from '../../../models';

interface IInputUpdateProduct {
  categoryId?: string;
  description?: string;
  isAvailable?: boolean;
  minOrder?: number;
  name?: string;
  price?: number;
  subCategoryId?: string;
  productImages?: Array<{
    linkImage: string;
    order: number;
  }>;
}

export default (productId: string, value: IInputUpdateProduct) => new Promise(async (resolve, reject) => {
  const transaction = await models.sequelize.transaction();
  const { categoryId, description, isAvailable, minOrder, name, price, subCategoryId } = value;

  try {
    const [product, isSubCategoryValid] = await Promise.all([
      models.Product.findOne({
        include: [
          {
            as    : 'productImages',
            model : models.ProductDetail,
          },
        ],
        where: { id: productId },
      }),
      models.SubCategory.findOne({
        where: { id: subCategoryId },
      }),
    ]);

    if (!product) {
      return reject(RESPONSE.error.product.notExists);
    }

    if (!!subCategoryId && !isSubCategoryValid) {
      return reject(RESPONSE.error.subCategory.notExists);
    }

    if (!!subCategoryId && isSubCategoryValid.categoryId !== categoryId) {
      return reject(RESPONSE.error.subCategory.notAssociate);
    }

    await models.ProductDetail.destroy({
      transaction,
      where: { productId },
    });

    const updatedProduct = await product.update({
      categoryId,
      description,
      isAvailable,
      minOrder,
      name,
      price,
      subCategoryId,
    }, { returning: true, transaction });

    const productImages = await Promise.all(value.productImages.map((productImage) => {
      return models.ProductDetail.create({
        linkImage : productImage.linkImage,
        order     : productImage.order,
        productId,
      }, { transaction });
    }));

    updatedProduct.productImages = productImages || [];

    await transaction.commit();

    return resolve(updatedProduct);
  } catch (error) {
    await transaction.rollback();

    return reject(error);
  }
});
