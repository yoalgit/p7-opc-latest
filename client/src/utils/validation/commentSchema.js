import * as Yup from "yup";

export const commentSchema = Yup.object({
  content: Yup.string()
    .trim()
    .min(3, "Votre commentaire doit contenir au moins 3 caractères")
    .max(400, "Votre commentaire doit contenir moins de 400 caractères")
    .required("Veuillez renseigner du texte"),
});
