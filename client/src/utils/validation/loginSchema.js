import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Format d'email invalide")
    .required("Adresse email requise"),
  password: Yup.string().required("Mot de passe requis"),
});
