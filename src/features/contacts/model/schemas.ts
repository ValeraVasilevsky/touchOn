import { object, string } from "yup";

export const contactSchema = object({
  email: string()
    .required("Введите данные")
    .default("")
    .max(50, "Максимальное количество символов - 50")
    .email("Данные введены неверно"),
  name: string()
    .required("Введите данные")
    .default("")
    .min(1, "Введите данные")
    .max(50, "Максимальное количество символов - 50"),
  phone: string()
    .required("Введите данные")
    .default("")
    .test("length", "Данные введены неверно", (val) => val.length === 10)
    .min(1, "Введите данные")
    .max(10, "Максимальное количество символов - 10"),
});
