import * as Yup from 'yup';

import { COTA_COMMAND_OPTIONS, COTA_CONFIGURATION_PATH_OPTIONS } from '../../data/cota/options';
import { CotaFormField, CotaFormFieldsHiddenState, NullableCotaConfigurationPathOption } from '../../types/cota';
import { ValidationObject } from '../../types/validationSchema';
import Configuration from '../../models/Configuration';
import { AnyObject, MessageParams } from 'yup/lib/types';

const cotaValidationSchema = (fieldsHidden: CotaFormFieldsHiddenState) => {
  const validationObject: ValidationObject<CotaFormField> = {
    cmd: Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string()
        .label('command')
        .required()
        .oneOf(COTA_COMMAND_OPTIONS.map(({ label }) => label))
    })
      .label('command')
      .nullable()
      .required(),
  };

  if (!fieldsHidden.fetch) validationObject.fetch = Yup.string().label('fetch link').required();

  if (!fieldsHidden.configurations) {
    validationObject.configurations = Yup.array().of(
      Yup.object().shape({
        path: Yup.object().shape({
          value: Yup.string().required(),
          label: Yup.string()
            .required()
            .oneOf(COTA_CONFIGURATION_PATH_OPTIONS.map(({ label }) => label))
        })
          .label('configuration path')
          .nullable()
          .required()
          .test('uniqueConfigurationPath', ({ path }: MessageParams) => ({
            key: 'validation.unique',
            values: { attribute: path }
          }), (value: NullableCotaConfigurationPathOption, context: Yup.TestContext<AnyObject>) => {
            if (value) {
              // filter(Boolean) to remove falsy values such as 'null' and 'undefined'
              // @ts-ignore
              const configurationsArr = context.from[2].value.configurations
                .map((configuration: Configuration) => (configuration.path ? configuration.path.value : null))
                .filter(Boolean);

              // Check if the select configuration paths are unique or not by testing < 2 occurrences
              return configurationsArr.reduce((accumulator: number, currentValue: string) =>
                accumulator + Number(currentValue === value.value),
                0) < 2
            }

            return true;
          }),
        // Using .test() instead of .when() because of accessing parent schema not possible in current Yup version
        // https://github.com/jquense/yup/issues/225#issuecomment-692315453
        value: Yup.string()
          .label('configuration value')
          .test('configurationValueRequired', ({ path }) => ({
            key: 'validation.required',
            values: { attribute: path }
          }), (value, context) => {
            // @ts-ignore
            return context.from[1].value.cmd === null
              ? true
              // @ts-ignore
              : context.from[1].value.cmd.value === 'set'
                ? Yup.string().required().isValidSync(value)
                : true;
          }),
      })
    )
      .required();
  }

  if (!fieldsHidden.signature) validationObject.signature = Yup.string().label('signature').required();

  return Yup.object(validationObject);
};

export default cotaValidationSchema;
