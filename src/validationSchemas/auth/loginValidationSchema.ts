import * as Yup from 'yup';

const loginValidationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email()
      .label('email')
      .required(),
    password: Yup.string()
      .label('password')
      .required(),
    remember: Yup.boolean()
  });
};

export default loginValidationSchema;