import * as Yup from 'yup';

const editDeviceCategoryValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .label('device category name')
      .required()
      .max(255),
    deviceIds: Yup.array()
      .label('devices')
      .optional(),
  });
};

export default editDeviceCategoryValidationSchema;
