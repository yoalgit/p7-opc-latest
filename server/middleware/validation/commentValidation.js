const Yup = require('yup');

const commentSchema = Yup.object({
  content: Yup.string()
    .trim()
    .min(3, 'Votre commentaire doit contenir au moins 3 caractères')
    .max(400, 'Votre commentaire doit contenir moins de 400 caractères')
    .required('Veuillez renseigner du texte'),
});

exports.commentValidation = async (req, res, next) => {
  try {
    const value = await commentSchema.validate(
      { ...req.body },
      { abortEarly: true, stripUnknown: true }
    );
    req.body = value;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
