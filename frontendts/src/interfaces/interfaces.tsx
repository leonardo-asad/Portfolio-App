export interface User {
  username: string,
  password: string
};

export interface Portfolio {
  "pk": string,
  "name": string,
  "holdings_url": string,
  "purchases_url": string,
  "alerts_url": string
};

export type Portfolios = Portfolio[];

export type UpdatePortfolioList = () => void;

// Defines the types of the Holding Object returned by the API
export interface Holding {
  ticker: string,
  shares: number,
  price: number,
  change: number,
  change_percent: number
};

export type Holdings = Holding[];

export interface Return {
  totalHoldings: number | undefined,
  totalChange: number | undefined,
  totalPercentChange: number | undefined
}

export type UpdatePortfolioReturn = (totalHoldings: number | undefined, totalChange: number | undefined, totalPercentChange: number | undefined) => void;

export interface Trade {
  "pk": number,
  "owner": string,
  "ticker": string,
  "portfolio": number,
  "date": string,
  "price": number,
  "shares": number
};

export type Trades = Trade[];

export interface Stock {
  [ticker: string]: string
}

export type AddTradeForm = (event: React.MouseEvent<HTMLButtonElement>, order: string, formInput: Stock) => void;

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

export type handleAddTrade = (stock: Stock) => void;

export type HandleDisplay = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>, display: Display) => void;

export type HandleLogOut = (event: React.MouseEvent<HTMLButtonElement>) => void;

export type HandleSideBarToogle = () => void;

export type HandleCreatePortfolio = (event: React.MouseEvent<HTMLButtonElement>, name: string) => void;

export type HandleEditPortfolio = (event: React.MouseEvent<HTMLButtonElement>, pk: string, name: string) => void;

export type HandleDeletePortfolio = (event: React.MouseEvent<HTMLButtonElement>, pk: string) => void;

export type HandleSelectPortfolio = (portfolio: Portfolio) => void

export type HandleChangeTab = (event: React.SyntheticEvent, newValue: number) => void;

export type SideBarOpen = boolean;
