import { object, string } from "yup";

export const contactSchema = object({
  email: string()
    .default("")
    .max(50, "Максимальное количество символов - 50")
    .email("Данные введены неверно")
    .required("Введите данные"),
  name: string()
    .default("")
    .max(50, "Максимальное количество символов - 50")
    .required("Введите данные"),
  phone: string()
    .required("Введите данные")
    .default("")
    .test("length", "Данные введены неверно", (val) => val.length === 10)
    .min(1, "Введите данные")
    .max(10, "Максимальное количество символов - 10"),
});
