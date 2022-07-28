import * as Yup from 'yup';

const createDeviceGroupValidationSchema = () => {
  return Yup.object({
    name: Yup.string()
      .label('device group name')
      .required()
      .max(255),
    // .test('isDeviceGroupNameUnique', ({path}) => ({
    //   key: 'validation.unique',
    //   values: {attribute: path}
    // }), isDeviceGroupNameUniqueDebounced),
    deviceIds: Yup.array()
      .label('devices')
      .required()
      .min(1),
  });
};

export default createDeviceGroupValidationSchema;
