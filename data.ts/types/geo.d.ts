import { Nationality } from './shared.d';

export type Geo = {
  [nat in Nationality]: string
};
