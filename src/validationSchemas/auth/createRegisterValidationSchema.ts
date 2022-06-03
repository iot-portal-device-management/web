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
    // TODO: Add password pattern rules validation on frontend
    password: Yup.string()
      .label('password')
      .required(),
    passwordConfirmation: Yup.string()
      .label('password confirmation')
      .required()
  });
};

export default createRegisterValidationSchema;