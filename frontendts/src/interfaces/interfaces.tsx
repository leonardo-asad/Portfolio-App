import React from 'react';

export interface PortfolioInterface {
  "pk": string,
  "name": string,
  "holdings_url": string,
  "purchases_url": string,
  "alerts_url": string
}

// Defines the types of the Holding Object returned by the API
export interface HoldingObject {
  ticker: string,
  shares: number,
  price: number,
  change: number,
  change_percent: number
}

// Defines the types of the holding object used to build the Grid, representing each Row
export interface Row {
  id: number,
  ticker: string,
  shares: number,
  price: number,
  change: number,
  change_percent: number,
  value: number,
  previousValue: number
}

export type Username = string;
