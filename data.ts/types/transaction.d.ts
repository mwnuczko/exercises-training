export type Transaction = {
  "id": string;
  "beneficiary": {
    "name": string;
    "address": string;
    "account": string;
  };
  "sender": {
    "name": string;
    "address": string;
    "account": string;
  };
  "amount": number;
  "title": number;
  "scheduledDate": number;
  "executedDate"?: number;
};
