const constants = require('../../../constants');
const models = require('../../../models');
const slugBuilder = require('../../../utils/slugBuilder');

const { response: { error } } = constants;

module.exports = ({
    name,
    description,
    categoryId,
    subCategoryId,
    isAvailable,
    minOrder,
    price,
    productImages,
  }) => new Promise(async (resolve, reject) => {
  try {
    if (!!subCategoryId) {
      const isSubCategoryValid = await models.SubCategory.findOne({
        where: { id: subCategoryId },
      });

      if (!isSubCategoryValid) {
        return reject(error.subCategory.notExists);
      }

      if (isSubCategoryValid.categoryId !== categoryId) {
        return reject(error.subCategory.notAssociate);
      }
    }

    const product = await models.Product.create({
      name,
      slug: slugBuilder(name),
      description,
      categoryId,
      subCategoryId,
      isAvailable,
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