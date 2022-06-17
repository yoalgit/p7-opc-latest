import * as Yup from "yup";

// Regex patterns
import { namePattern, passwordPattern } from "./validationRegex";

export const signupSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Email non valide")
    .required("Adresse email requise"),
  firstname: Yup.string()
    .trim()
    .matches(namePattern, "Prénom non valide")
    .required("Prénom requis"),
  lastname: Yup.string()
    .trim()
    .matches(namePattern, "Nom non valide")
    .required("Nom requis"),
  password: Yup.string()
    .trim()
    .matches(
      passwordPattern,
      "Doit contenir au minimum 8 caractères dont 1 majuscule, 1 minuscule et 1 chiffre"
    )
    .required("Mot de passe requis"),
  passwordConfirm: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe ne correspondent pas"
    )
    .required("Confirmation de mot de passe requis "),
});
