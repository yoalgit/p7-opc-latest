import * as Yup from "yup";

// Regex patterns
import { passwordPattern } from "./validationRegex";

export const passwordSchema = Yup.object({
  oldPassword: Yup.string().trim().required("Mot de passe actuel requis"),
  updatedPassword: Yup.string()
    .trim()
    .matches(
      passwordPattern,
      "Doit contenir au minimum 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole (!@#$%^&*)"
    )
    .required("Nouveau mot de passe requis"),
  updatedPasswordConfirm: Yup.string().oneOf(
    [Yup.ref("updatedPassword"), null],
    "Les mots de passe ne correspondent pas"
  ),
});
