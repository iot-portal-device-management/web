import { BaseOption } from '../option';

export type ChartTimeRangeFilterOptionLabel =
  | 'Last 1 hour'
  | 'Last 7 hours'
  | 'Last 24 hours'
  | 'Last 7 days';

export type ChartTimeRangeFilterOptionValue =
  | 1
  | 7
  | 24
  | 168;

export interface ChartTimeRangeFilterOption extends BaseOption<ChartTimeRangeFilterOptionLabel, ChartTimeRangeFilterOptionValue> {
}
