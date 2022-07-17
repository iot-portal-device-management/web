import { NullableCotaConfigurationPathOption } from '../types/cota';

class Configuration {
  public path: NullableCotaConfigurationPathOption;
  public value: string;

  constructor(path: NullableCotaConfigurationPathOption = null, value: string = '') {
    this.path = path;
    this.value = value;
  }
}

export default Configuration;