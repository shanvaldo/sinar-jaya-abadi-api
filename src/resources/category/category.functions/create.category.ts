import models from '../../../models';
import slugBuilder from '../../../utils/slugBuilder';

interface IInputCreateCategory {
  name: string;
  label?: string;
  description?: string;
}

export default ({ name, label, description }: IInputCreateCategory) => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.create({
      description,
      label : label || name,
      name  : name.toUpperCase(),
      slug  : slugBuilder(name),
    });

    return resolve(category);
  } catch (error) {
    return reject(error.message || error);
  }
});
