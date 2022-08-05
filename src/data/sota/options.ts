import { DeviceSotaCommandOption } from '../../types/deviceSota';

export const SOTA_OPTIONS = [
  { label: 'Ubuntu update', value: 'ubuntu_update' },
  { label: 'Mender update', value: 'mender_update' },
];

export const SOTA_COMMAND_OPTIONS: DeviceSotaCommandOption[] = [
  { label: 'update', value: 'update' },
];

export const SOTA_LOG_TO_FILE_OPTIONS = [
  { label: 'Yes', value: 'Y' },
  { label: 'No', value: 'N' },
];

export const SOTA_INITIAL_FIELDS_HIDDEN_STATE = {
  sota_option: false,
  cmd: false,
  fetch: true,
  log_to_file: false,
  username: true,
  password: true,
};

export const SOTA_FIELDS_HIDDEN_STATES = {
  ubuntu_update: {
    sota_option: false,
    cmd: false,
    fetch: true,
    log_to_file: false,
    username: true,
    password: true,
  },
  mender_update: {
    sota_option: false,
    cmd: false,
    fetch: false,
    log_to_file: false,
    username: false,
    password: false,
  }
};
