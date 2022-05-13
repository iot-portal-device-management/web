import * as Yup from 'yup';

const createRegisterValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .label('name')
      .required(),
    email: Yup.string()
      .email()
      .label('email')
      .required(),
    password: Yup.string()
      .label('password')
      .required(),
    passwordConfirmation: Yup.string()
      .label('password confirmation')
      .required()
  });
};

export default createRegisterValidationSchema;