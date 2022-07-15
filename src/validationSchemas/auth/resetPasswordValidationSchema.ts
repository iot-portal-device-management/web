import * as Yup from 'yup';

const resetPasswordValidationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email()
      .label('email')
      .required(),
    // TODO: add frontend password validation
    password: Yup.string()
      .label('password')
      .required(),
    passwordConfirmation: Yup.string()
      .label('password confirmation')
      .required()
  });
};

export default resetPasswordValidationSchema;