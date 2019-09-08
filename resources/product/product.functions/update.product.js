const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (productId, newValues) => new Promise(async (resolve, reject) => {
  const transaction = await models.sequelize.transaction().catch((error) => reject(error));

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
      return reject(error.product.notExists);
    }

    await models.ProductDetail.destroy({
      transaction,
      where: { productId },
    });

    const updatedProduct = await product.update({
      name          : newValues.name || product.name,
      description   : newValues.description || product.description,
      categoryId    : newValues.categoryId || product.categoryId,
      subCategoryId : newValues.subCategoryId || product.subCategoryId,
      isAvailable   : newValues.isAvailable || product.isAvailable,
      minOrder      : newValues.minOrder || product.minOrder,
      price         : newValues.price || product.price,
    }, { returning: true, transaction });

    const productImages = await Promise.all(newValues.productImages.map((productImage) => {
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