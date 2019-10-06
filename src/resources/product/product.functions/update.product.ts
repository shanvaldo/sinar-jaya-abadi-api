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

  try {
    const product = await models.Product.findOne({
      include: [
        {
          as    : 'productImages',
          model : models.ProductDetail,
        },
      ],
      where: { id: productId },
    });

    if (!product) {
      return reject(RESPONSE.error.product.notExists);
    }

    await models.ProductDetail.destroy({
      transaction,
      where: { productId },
    });

    const updatedProduct = await product.update({
      categoryId    : value.categoryId || product.categoryId,
      description   : value.description || product.description,
      isAvailable   : value.isAvailable || product.isAvailable,
      minOrder      : value.minOrder || product.minOrder,
      name          : value.name || product.name,
      price         : value.price || product.price,
      subCategoryId : value.subCategoryId || product.subCategoryId,
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
