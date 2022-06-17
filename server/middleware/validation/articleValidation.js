const Yup = require('yup');

const articleSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(50, 'Le titre doit contenir moins de 50 caractères')
    .required('Veuillez renseigner un titre'),
  content: Yup.string()
    .trim()
    .min(15, 'Le titre doit contenir au moins 15 caractères')
    .max(5000, 'Le titre doit contenir moins de 5000 caractères')
    .required('Veuillez renseigner du contenu pour votre article'),
});

exports.articleValidation = async (req, res, next) => {
  try {
    const dataToValidate = req.body;
    const value = await articleSchema.validate(
      { ...dataToValidate },
      { abortEarly: false, stripUnknown: true }
    );
    req.body = value;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
