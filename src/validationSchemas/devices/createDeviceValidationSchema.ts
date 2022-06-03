import * as Yup from 'yup';

const createDeviceValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .label('device name')
      .required()
      .max(255),
    deviceCategory: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('device category')
        .required()
    })
      .label('device category')
      .nullable()
      .required()
  });
};

export default createDeviceValidationSchema;