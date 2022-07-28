import * as Yup from 'yup';

const editDeviceGroupValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .label('device group name')
      .required()
      .max(255),
    deviceIds: Yup.array()
      .label('devices')
      .required()
      .min(1),
  });
};

export default editDeviceGroupValidationSchema;