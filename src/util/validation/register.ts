
import * as yup from "yup"

export const registerSchema = yup
  .object({
    first_name: yup.string().required(),
  })
  .required()