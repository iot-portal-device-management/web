import * as Yup from 'yup';

const createDeviceValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .label('deviceStatus name')
      .required()
      .max(255),
    deviceCategory: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('deviceStatus category')
        .required()
    })
      .label('deviceStatus category')
      .nullable()
      .required()
  });
};

export default createDeviceValidationSchema;
