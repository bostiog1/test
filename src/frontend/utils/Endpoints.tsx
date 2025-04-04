const protocol = "http"; // Change https -> http for local dev
const domain = "localhost";
const port = "3000"; // Frontend
const portBack = "8089"; // Backend

export const url = (endPoint: string) =>
  `${protocol}://${domain}:${port}/${endPoint}`;
export const urlBack = (endPoint: string) =>
  `${protocol}://${domain}:${portBack}/${endPoint}`;

export const urlFront = (endPoint: string) => `/${endPoint}`;

export const Endpoints = {
  // Frontend
  login: urlFront("login"),
  dashboard: urlFront("dashboard"),
  register: urlFront("register"),

  // Backend
  loginBack: urlBack("api/login"),
  registerBack: urlBack("api/register"),
  validateToken: urlBack("api/validate-token"),
  refreshToken: urlBack("api/refresh-token"),
  logout: urlBack("api/logout"),

  // Backend - data
  transactions: urlBack("api/transactions"),
  clients: urlBack("api/clients"),
  coins: urlBack("api/coins"),
  coinHistory: urlBack("api/transactions/history"),
  profile: urlBack("api/profile"),
};

export default Endpoints;
