const models = require('../../../models');

module.exports = ({
    name,
    description,
    subCategoryId,
    isAvailable,
    weight,
    minOrder,
    price,
    productImages,
  }) => new Promise(async (resolve, reject) => {
  try {
    const product = await models.Product.create({
      name,
      description,
      subCategoryId,
      isAvailable,
      weight,
      minOrder,
      price,
    });

    const productDetails = await Promise.all(productImages.map((productImage) => models.ProductDetail.create({
      linkImage: productImage.linkImage,
      order: productImage.order,
      productId: product.id,
    })));

    const response = {
      ...product.dataValues,
      productImages: productDetails,
    };

    return resolve(response);
  } catch (error) {
    return reject(error.message || error);
  }
});