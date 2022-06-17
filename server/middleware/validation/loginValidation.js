const Yup = require('yup');

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Format d'email invalide")
    .required('Adresse email requise'),
  password: Yup.string().trim().required('Mot de passe requis'),
});

exports.loginValidation = async (req, res, next) => {
  try {
    const value = await loginSchema.validate(
      { ...req.body },
      { abortEarly: false, stripUnknown: true }
    );
    req.body = value;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
