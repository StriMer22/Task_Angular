export type RatesInfoResult = {
  table: string;
  no: string;
  effectiveDate: string;
  rates: RateInfoRow[];
}

export type RateInfoRow = {
  currency: string;
  code: string;
  mid: number;
}

export type Message = {
  severity: string;
  summary: string;
  detail: string;
}
