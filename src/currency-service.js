export default class CurrencyService {
  static getCurrencyExchange(currency) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`)
      .then(function (response) {
        if (!response.ok) {
          return Promise.reject(response.status);
        }
        return response.json();
      });
  }
}
