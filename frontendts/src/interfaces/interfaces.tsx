export interface Portfolio {
  "pk": string,
  "name": string,
  "holdings_url": string,
  "purchases_url": string,
  "alerts_url": string
};

export type Portfolios = Portfolio[];

// Defines the types of the Holding Object returned by the API
export interface Holding {
  ticker: string,
  shares: number,
  price: number,
  change: number,
  change_percent: number
};

export type Holdings = Holding[];

export interface Stock {
  [ticker: string]: string
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
};

export type Username = string;

export type Display = string;

export type HandleSignIn = (event: React.FormEvent<HTMLFormElement>) => void;

export type HandleSignUp = (event: React.FormEvent<HTMLFormElement>) => void;

export type HandleDisplay = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>, display: Display) => void;

export type HandleLogOut = (event: React.MouseEvent<HTMLButtonElement>) => void;

export type HandleSideBarToogle = () => void;

export type HandleSelectPortfolio = (portfolio: Portfolio) => void

export type SideBarOpen = boolean;
