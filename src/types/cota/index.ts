import { BaseOption } from '../option';
import { Nullable } from '../../libs/utilityTypes';
import Configuration from '../../models/Configuration';

export type CotaCommandOptionLabel =
  | 'get'
  | 'load'
  | 'set'
  | 'append'
  | 'remove';

export type CotaCommandOptionValue = CotaCommandOptionLabel;

export type CotaConfigurationPathOptionLabel =
  | 'dbs'
  | 'collectionIntervalSeconds'
  | 'publishIntervalSeconds'
  | 'maxCacheSize'
  | 'containerHealthIntervalSeconds'
  | 'minStorageMB'
  | 'minMemoryMB'
  | 'minPowerPercent'
  | 'sotaSW'
  | 'dockerBenchSecurityIntervalSeconds'
  | 'networkCheck'
  | 'dbsRemoveImageOnFailedContainer'
  | 'trustedRepositories'
  | 'orchestratorResponse'
  | 'ip'
  | 'token'
  | 'certFile'
  | 'ubuntuAptSource'
  | 'proceedWithoutRollback';

export type CotaConfigurationPathOptionValue = CotaConfigurationPathOptionLabel;

export type CotaCommandOption = BaseOption<CotaCommandOptionLabel, CotaCommandOptionValue>;

export type CotaConfigurationPathOption = BaseOption<CotaConfigurationPathOptionLabel, CotaConfigurationPathOptionValue>;

export interface CotaFormFormikValues {
  cmd: Nullable<CotaCommandOption>,
  fetch: string,
  configurations: Configuration[],
  signature: string
}

export type CotaFormField = keyof CotaFormFormikValues;

export interface CotaFormFieldsHiddenState extends Record<CotaFormField, boolean> {
}

export interface CotaPayload extends Record<CotaFormField, string> {
}
