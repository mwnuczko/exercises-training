import { Nationality } from './shared';

export type Geo = {
  [nat in Nationality]: string
};
