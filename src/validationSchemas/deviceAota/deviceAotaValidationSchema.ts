import * as Yup from 'yup';

import { AOTA_APP_OPTIONS, AOTA_REBOOT_OPTIONS } from '../../data/aota/options';
import { DeviceAotaAppOption, DeviceAotaCommandOption, DeviceAotaFormField, DeviceAotaFormFieldsHiddenState } from '../../types/deviceAota';
import { ValidationObject } from '../../types/validationSchema';

const deviceAotaValidationSchema = (commandOptions: NonNullable<DeviceAotaCommandOption>[], fieldsHidden: DeviceAotaFormFieldsHiddenState) => {
  const validationObject: ValidationObject<DeviceAotaFormField> = {
    app: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('application')
        .required()
        .oneOf(AOTA_APP_OPTIONS.map(({ label }) => label))
    })
      .label('application')
      .nullable()
      .required(),
    cmd: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('command')
        .required()
        .oneOf(commandOptions.map(({ label }) => label))
    })
      .label('command')
      .nullable()
      .required(),
  };

  if (!fieldsHidden.containerTag) validationObject.containerTag = Yup.string().label('container tag').required();

  if (!fieldsHidden.deviceReboot) {
    validationObject.deviceReboot = Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('device reboot')
        .required()
        .oneOf(AOTA_REBOOT_OPTIONS.map(({ label }) => label))
    })
      .label('device reboot')
      .nullable()
      .required();
  }

  if (!fieldsHidden.fetch) validationObject.fetch = Yup.string().label('fetch link').required();
  if (!fieldsHidden.signature) validationObject.signature = Yup.string().label('signature').required();

  if (!fieldsHidden.version) {
    validationObject.version = Yup.string()
      .label('version')
      .when(['app', 'command'], {
        is: (app: NonNullable<DeviceAotaAppOption>, command: NonNullable<DeviceAotaCommandOption>) =>
          app?.value === 'docker' && command?.value === 'remove',
        then: Yup.string().required(),
        otherwise: Yup.string(),
      });
  }

  if (!fieldsHidden.username) validationObject.username = Yup.string().label('server username');
  if (!fieldsHidden.password) validationObject.password = Yup.string().label('server password');
  if (!fieldsHidden.dockerRegistry) validationObject.dockerRegistry = Yup.string().label('docker registry');
  if (!fieldsHidden.dockerUsername) validationObject.dockerUsername = Yup.string().label('docker username');
  if (!fieldsHidden.dockerPassword) validationObject.dockerPassword = Yup.string().label('docker password');
  if (!fieldsHidden.file) validationObject.file = Yup.string().label('docker compose file');

  return Yup.object(validationObject);
};

export default deviceAotaValidationSchema;
