import * as Yup from 'yup';

import { SOTA_COMMAND_OPTIONS, SOTA_LOG_TO_FILE_OPTIONS, SOTA_OPTIONS } from '../../data/sota/options';
import { SotaFormField, SotaFormFieldsHiddenState } from '../../types/sota';
import { ValidationObject } from '../../types/validationSchema';

const sotaValidationSchema = (fieldsHidden: SotaFormFieldsHiddenState) => {
  const validationObject: ValidationObject<SotaFormField> = {
    sota_option: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('SOTA option')
        .required()
        .oneOf(SOTA_OPTIONS.map(({ label }) => label))
    })
      .label('SOTA option')
      .nullable()
      .required(),
    cmd: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('command')
        .required()
        .oneOf(SOTA_COMMAND_OPTIONS.map(({ label }) => label))
    })
      .label('command')
      .nullable()
      .required(),
  };

  if (!fieldsHidden.fetch) validationObject.fetch = Yup.string().label('fetch link').required();

  if (!fieldsHidden.log_to_file) {
    validationObject.log_to_file = Yup.object().shape({
      value: Yup.string(),
      label: Yup.string()
        .label('log to file')
        .required()
        .oneOf(SOTA_LOG_TO_FILE_OPTIONS.map(({ label }) => label))
    })
      .label('log to file')
      .nullable()
      .required();
  }

  if (!fieldsHidden.username) validationObject.username = Yup.string().label('username');
  if (!fieldsHidden.password) validationObject.password = Yup.string().label('password');

  return Yup.object(validationObject);
};

export default sotaValidationSchema;
