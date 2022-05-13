import * as Yup from 'yup';

const createForgotPasswordValidationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email()
      .label('email')
      .required()
  });
};

export default createForgotPasswordValidationSchema;