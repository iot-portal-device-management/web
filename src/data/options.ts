// import { AotaAppOptionValue, AotaCommandOption } from '../types/aota';
//
// export const AOTA_APP_OPTIONS = [
//   { label: 'docker', value: 'docker' },
//   { label: 'compose', value: 'compose' },
//   { label: 'application', value: 'application' },
// ];
//
// export const AOTA_COMMAND_OPTIONS: Record<AotaAppOptionValue, NonNullable<AotaCommandOption>[]> = {
//   docker: [
//     { label: 'import', value: 'import' },
//     { label: 'load', value: 'load' },
//     { label: 'pull', value: 'pull' },
//     { label: 'remove', value: 'remove' },
//     { label: 'stats', value: 'stats' },
//   ],
//   compose: [
//     { label: 'up', value: 'up' },
//     { label: 'down', value: 'down' },
//     { label: 'pull', value: 'pull' },
//     { label: 'list', value: 'list' },
//     { label: 'remove', value: 'remove' },
//   ],
//   application: [
//     { label: 'update', value: 'update' },
//   ],
// };
//
// export const AOTA_REBOOT_OPTIONS = [
//   { label: 'Yes', value: 'yes' },
//   { label: 'No', value: 'no' },
// ];
//
// export const AOTA_INITIAL_FIELDS_HIDDEN_STATE = {
//   app: false,
//   command: true,
//   containerTag: true,
//   deviceReboot: true,
//   fetch: true,
//   signature: true,
//   version: true,
//   username: true,
//   password: true,
//   dockerRegistry: true,
//   dockerUsername: true,
//   dockerPassword: true,
//   file: true,
// };
//
// export const AOTA_FIELDS_HIDDEN_STATES = {
//   docker: {
//     import: {
//       app: false,
//       command: false,
//       containerTag: false,
//       deviceReboot: true,
//       fetch: false,
//       signature: true,
//       version: false,
//       username: false,
//       password: false,
//       dockerRegistry: true,
//       dockerUsername: true,
//       dockerPassword: true,
//       file: true,
//     },
//     load: {
//       app: false,
//       command: false,
//       containerTag: false,
//       deviceReboot: true,
//       fetch: false,
//       signature: true,
//       version: false,
//       username: false,
//       password: false,
//       dockerRegistry: true,
//       dockerUsername: true,
//       dockerPassword: true,
//       file: true,
//     },
//     pull: {
//       app: false,
//       command: false,
//       containerTag: false,
//       deviceReboot: true,
//       fetch: true,
//       signature: true,
//       version: true,
//       username: true,
//       password: true,
//       dockerRegistry: false,
//       dockerUsername: false,
//       dockerPassword: false,
//       file: true,
//     },
//     remove: {
//       app: false,
//       command: false,
//       containerTag: false,
//       deviceReboot: true,
//       fetch: true,
//       signature: true,
//       version: false,
//       username: true,
//       password: true,
//       dockerRegistry: true,
//       dockerUsername: true,
//       dockerPassword: true,
//       file: true,
//     },
//     stats: {
//       app: false,
//       containerTag: true,
//       deviceReboot: true,
//       fetch: true,
//       signature: true,
//       version: true,
//       username: true,
//       password: true,
//       dockerRegistry: true,
//       dockerUsername: true,
//       dockerPassword: true,
//       file: true,
//     }
//   },
//   compose: {
//     up: {
//       app: false,
//       command: false,
//       containerTag: false,
//       deviceReboot: true,
//       fetch: false,
//       signature: true,
//       version: true,
//       username: false,
//       password: false,
//       dockerRegistry: false,
//       dockerUsername: false,
//       dockerPassword: false,
//       file: false,
//     },
//     down: {
//       app: false,
//       command: false,
//       containerTag: false,
//       deviceReboot: true,
//       fetch: true,
//       signature: true,
//       version: true,
//       username: true,
//       password: true,
//       dockerRegistry: true,
//       dockerUsername: true,
//       dockerPassword: true,
//       file: true,
//     },
//     pull: {
//       app: false,
//       command: false,
//       containerTag: false,
//       deviceReboot: true,
//       fetch: false,
//       signature: true,
//       version: true,
//       username: false,
//       password: false,
//       dockerRegistry: false,
//       dockerUsername: false,
//       dockerPassword: false,
//       file: false,
//     },
//     list: {
//       app: false,
//       command: false,
//       containerTag: false,
//       deviceReboot: true,
//       fetch: true,
//       signature: true,
//       version: true,
//       username: true,
//       password: true,
//       dockerRegistry: true,
//       dockerUsername: true,
//       dockerPassword: true,
//       file: true,
//     },
//     remove: {
//       app: false,options.ts
//       command: false,
//       containerTag: false,
//       deviceReboot: true,
//       fetch: true,
//       signature: true,
//       version: true,
//       username: true,
//       password: true,
//       dockerRegistry: true,
//       dockerUsername: true,
//       dockerPassword: true,
//       file: true,
//     }
//   },
//   application: {
//     update: {
//       app: false,
//       command: false,
//       containerTag: true,
//       deviceReboot: false,
//       fetch: false,
//       signature: true,
//       version: true,
//       username: true,
//       password: true,
//       dockerRegistry: true,
//       dockerUsername: true,
//       dockerPassword: true,
//       file: true,
//     },
//   },
// };


// -----
// export const SOTA_OPTIONS = [
//   { value: 'ubuntu_update', label: 'Ubuntu update' },
//   { value: 'mender_update', label: 'Mender update' },
// ];
//
// export const SOTA_COMMAND_OPTIONS = [
//   { value: 'update', label: 'update' },
// ];
//
// export const SOTA_LOG_TO_FILE_OPTIONS = [
//   { value: 'Y', label: 'Yes' },
//   { value: 'N', label: 'No' },
// ];
//
// export const SOTA_INITIAL_FIELDS_HIDDEN_STATE = {
//   sota_option: false,
//   command: false,
//   fetch: true,
//   log_to_file: false,
//   username: true,
//   password: true,
// };
//
// export const SOTA_FIELDS_HIDDEN_STATES = {
//   ubuntu_update: {
//     sota_option: false,
//     command: false,
//     fetch: true,
//     log_to_file: false,
//     username: true,
//     password: true,
//   },
//   mender_update: {
//     sota_option: false,
//     command: false,
//     fetch: false,
//     log_to_file: false,
//     username: false,
//     password: false,
//   }
// };
//
// export const COTA_COMMAND_OPTIONS = [
//   { value: 'get', label: 'get' },
//   { value: 'load', label: 'load' },
//   { value: 'set', label: 'set' },
//   { value: 'append', label: 'append' },
//   { value: 'remove', label: 'remove' },
// ];
//
// export const COTA_CONFIGURATION_PATH_OPTIONS = [
//   { value: 'dbs', label: 'dbs' },
//   { value: 'collectionIntervalSeconds', label: 'collectionIntervalSeconds' },
//   { value: 'publishIntervalSeconds', label: 'publishIntervalSeconds' },
//   { value: 'maxCacheSize', label: 'maxCacheSize' },
//   { value: 'containerHealthIntervalSeconds', label: 'containerHealthIntervalSeconds' },
//   { value: 'minStorageMB', label: 'minStorageMB' },
//   { value: 'minMemoryMB', label: 'minMemoryMB' },
//   { value: 'minPowerPercent', label: 'minPowerPercent' },
//   { value: 'sotaSW', label: 'sotaSW' },
//   { value: 'dockerBenchSecurityIntervalSeconds', label: 'dockerBenchSecurityIntervalSeconds' },
//   { value: 'networkCheck', label: 'networkCheck' },
//   { value: 'dbsRemoveImageOnFailedContainer', label: 'dbsRemoveImageOnFailedContainer' },
//   { value: 'trustedRepositories', label: 'trustedRepositories' },
//   { value: 'orchestratorResponse', label: 'orchestratorResponse' },
//   { value: 'ip', label: 'ip' },
//   { value: 'token', label: 'token' },
//   { value: 'certFile', label: 'certFile' },
//   { value: 'ubuntuAptSource', label: 'ubuntuAptSource' },
//   { value: 'proceedWithoutRollback', label: 'proceedWithoutRollback' },
// ];
//
// export const COTA_INITIAL_FIELDS_HIDDEN_STATE = {
//   command: false,
//   fetch: true,
//   configurations: true,
//   configuration_values: true,
//   signature: true,
// };
//
// export const COTA_FIELDS_HIDDEN_STATES = {
//   get: {
//     command: false,
//     fetch: true,
//     configurations: false,
//     configuration_values: true,
//     signature: true,
//   },
//   load: {
//     command: false,
//     fetch: false,
//     configurations: true,
//     configuration_values: true,
//     signature: false,
//   },
//   set: {
//     command: false,
//     fetch: true,
//     configurations: false,
//     configuration_values: false,
//     signature: true,
//   },
//   append: {
//     command: false,
//     fetch: true,
//     configurations: false,
//     configuration_values: false,
//     signature: true,
//   },
//   remove: {
//     command: false,
//     fetch: true,
//     configurations: false,
//     configuration_values: false,
//     signature: true,
//   },
// };
//
// export const POWER_CONTROLS_COMMAND_OPTIONS = [
//   { value: 'SHUTDOWN', label: 'SHUTDOWN' },
//   { value: 'deviceReboot', label: 'deviceReboot' },
//   { value: 'DECOMMISSION', label: 'DECOMMISSION' },
// ];
//
// export const DEVICE_VIEW_TAB_OPTIONS = [
//   'overview',
//   'metrics',
//   'aota',
//   'fota',
//   'sota',
//   'cota',
//   'command-histories',
//   'event-histories',
// ];
