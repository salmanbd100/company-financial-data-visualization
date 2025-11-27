// Insider Trading / Ownership Types

export interface InsiderTrading {
  reportingName?: string;
  ownerName?: string;
  securitiesOwned?: number;
  ownershipPercent?: number;
  transactionType?: string;
  securitiesTransacted?: number;
  price?: number;
  filingDate?: string;
  symbol?: string;
  acquistionOrDisposition?: string;
  formType?: string;
  securitiesOwnedFollowingTransaction?: number;
  typeOfOwner?: string;
  link?: string;
}
