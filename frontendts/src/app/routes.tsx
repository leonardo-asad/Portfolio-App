const ROUTES = {
  signUp: () => "/user/signup",
  logIn: () => "/user/login",
  holdings: (pk: string) => `/portfolio/holdings/${pk}`,
  trades: (pk: string) => `/portfolio/holdings/${pk}`,

};

export default ROUTES;
