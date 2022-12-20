import { PartialRecord } from '../../libs/utilityTypes';

export type ValidationObject<T extends string> = PartialRecord<T, any>;
