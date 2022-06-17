import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const articleSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(50, "Le titre doit contenir moins de 50 caractères")
    .required("Veuillez renseigner un titre"),
  content: Yup.string()
    .trim()
    .min(15, "L'article doit contenir au moins 15 caractères")
    .max(5000, "L'article doit contenir moins de 5000 caractères")
    .required("Veuillez renseigner du contenu pour votre article"),
  image: Yup.mixed()
    .nullable()
    .test(
      "FILE_SIZE",
      "L'image doit faire moins de 3Mo",
      (value) => !value || (value && value.size <= 3 * 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "Formats d'images acceptés : jpg, jpg et png",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});
