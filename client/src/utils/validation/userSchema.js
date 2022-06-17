import * as Yup from "yup";

// Regex patterns
import { namePattern } from "./validationRegex";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const userSchema = Yup.object({
  firstname: Yup.string()
    .trim()
    .matches(namePattern, "Prénom invalide")
    .required("Veuillez renseigner votre prénom"),
  lastname: Yup.string()
    .trim()
    .matches(namePattern, "Nom invalide")
    .required("Veuillez renseigner votre nom"),
  bio: Yup.string()
    .trim()
    .max(500, "Votre bio doit contenir moins de 500 caractères."),
  linkedinProfile: Yup.string().trim().url("Url invalide"),
  twitterProfile: Yup.string().trim().url("Url invalide"),
  facebookProfile: Yup.string().trim().url("Url invalide"),
  instagramProfile: Yup.string().trim().url("Url invalide"),
  profilePic: Yup.mixed()
    .nullable()
    .test(
      "FILE_SIZE",
      "L'image doit faire moins de 3Mo",
      (value) => !value || (value && value?.size <= 3 * 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "Formats acceptés : jpeg, jpg et png",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});
