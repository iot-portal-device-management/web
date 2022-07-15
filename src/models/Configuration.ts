import { CotaConfigurationPathOption } from '../types/cota';
import { Nullable } from '../libs/utilityTypes';

class Configuration {
  public path: Nullable<CotaConfigurationPathOption>;
  public value: string;

  constructor(path: Nullable<CotaConfigurationPathOption> = null, value: string = '') {
    this.path = path;
    this.value = value;
  }
}

export default Configuration;