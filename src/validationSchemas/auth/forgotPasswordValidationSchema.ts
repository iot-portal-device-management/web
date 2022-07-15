import * as Yup from 'yup';

const forgotPasswordValidationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email()
      .label('email')
      .required()
  });
};

export default forgotPasswordValidationSchema;