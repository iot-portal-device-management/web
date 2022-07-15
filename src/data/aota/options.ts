import { AotaAppOptionValue, AotaCommandOption } from '../../types/aota';

export const AOTA_APP_OPTIONS = [
  { label: 'docker', value: 'docker' },
  { label: 'compose', value: 'compose' },
  { label: 'application', value: 'application' },
];

export const AOTA_COMMAND_OPTIONS: Record<AotaAppOptionValue, AotaCommandOption[]> = {
  docker: [
    { label: 'import', value: 'import' },
    { label: 'load', value: 'load' },
    { label: 'pull', value: 'pull' },
    { label: 'remove', value: 'remove' },
    { label: 'stats', value: 'stats' },
  ],
  compose: [
    { label: 'up', value: 'up' },
    { label: 'down', value: 'down' },
    { label: 'pull', value: 'pull' },
    { label: 'list', value: 'list' },
    { label: 'remove', value: 'remove' },
  ],
  application: [
    { label: 'update', value: 'update' },
  ],
};

export const AOTA_REBOOT_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const AOTA_INITIAL_FIELDS_HIDDEN_STATE = {
  app: false,
  command: true,
  containerTag: true,
  deviceReboot: true,
  fetch: true,
  signature: true,
  version: true,
  username: true,
  password: true,
  dockerRegistry: true,
  dockerUsername: true,
  dockerPassword: true,
  file: true,
};

export const AOTA_FIELDS_HIDDEN_STATES = {
  docker: {
    import: {
      app: false,
      command: false,
      containerTag: false,
      deviceReboot: true,
      fetch: false,
      signature: true,
      version: false,
      username: false,
      password: false,
      dockerRegistry: true,
      dockerUsername: true,
      dockerPassword: true,
      file: true,
    },
    load: {
      app: false,
      command: false,
      containerTag: false,
      deviceReboot: true,
      fetch: false,
      signature: true,
      version: false,
      username: false,
      password: false,
      dockerRegistry: true,
      dockerUsername: true,
      dockerPassword: true,
      file: true,
    },
    pull: {
      app: false,
      command: false,
      containerTag: false,
      deviceReboot: true,
      fetch: true,
      signature: true,
      version: true,
      username: true,
      password: true,
      dockerRegistry: false,
      dockerUsername: false,
      dockerPassword: false,
      file: true,
    },
    remove: {
      app: false,
      command: false,
      containerTag: false,
      deviceReboot: true,
      fetch: true,
      signature: true,
      version: false,
      username: true,
      password: true,
      dockerRegistry: true,
      dockerUsername: true,
      dockerPassword: true,
      file: true,
    },
    stats: {
      app: false,
      containerTag: true,
      deviceReboot: true,
      fetch: true,
      signature: true,
      version: true,
      username: true,
      password: true,
      dockerRegistry: true,
      dockerUsername: true,
      dockerPassword: true,
      file: true,
    }
  },
  compose: {
    up: {
      app: false,
      command: false,
      containerTag: false,
      deviceReboot: true,
      fetch: false,
      signature: true,
      version: true,
      username: false,
      password: false,
      dockerRegistry: false,
      dockerUsername: false,
      dockerPassword: false,
      file: false,
    },
    down: {
      app: false,
      command: false,
      containerTag: false,
      deviceReboot: true,
      fetch: true,
      signature: true,
      version: true,
      username: true,
      password: true,
      dockerRegistry: true,
      dockerUsername: true,
      dockerPassword: true,
      file: true,
    },
    pull: {
      app: false,
      command: false,
      containerTag: false,
      deviceReboot: true,
      fetch: false,
      signature: true,
      version: true,
      username: false,
      password: false,
      dockerRegistry: false,
      dockerUsername: false,
      dockerPassword: false,
      file: false,
    },
    list: {
      app: false,
      command: false,
      containerTag: false,
      deviceReboot: true,
      fetch: true,
      signature: true,
      version: true,
      username: true,
      password: true,
      dockerRegistry: true,
      dockerUsername: true,
      dockerPassword: true,
      file: true,
    },
    remove: {
      app: false,
      command: false,
      containerTag: false,
      deviceReboot: true,
      fetch: true,
      signature: true,
      version: true,
      username: true,
      password: true,
      dockerRegistry: true,
      dockerUsername: true,
      dockerPassword: true,
      file: true,
    }
  },
  application: {
    update: {
      app: false,
      command: false,
      containerTag: true,
      deviceReboot: false,
      fetch: false,
      signature: true,
      version: true,
      username: true,
      password: true,
      dockerRegistry: true,
      dockerUsername: true,
      dockerPassword: true,
      file: true,
    },
  },
};
