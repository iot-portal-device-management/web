import * as Yup from 'yup';

const deviceFotaValidationSchema = () => {
  return Yup.object({
    biosversion: Yup.string().label('BIOS version').required(),
    fetch: Yup.string().label('fetch link').required(),
    manufacturer: Yup.string().label('manufacturer').required(),
    path: Yup.string().label('path'),
    product: Yup.string().label('product').required(),
    releasedate: Yup.string().label('release date').required(),
    signature: Yup.string().label('signature'),
    tooloptions: Yup.string().label('tool options'),
    vendor: Yup.string().label('vendor').required(),
    username: Yup.string().label('server username'),
    password: Yup.string().label('server password'),
  });
};

export default deviceFotaValidationSchema;
