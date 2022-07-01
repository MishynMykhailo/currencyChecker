// const fromValutes = '643';
// const toValutes = '840';
const FetchApi = ({ currencyFrom, currencyTo }) => {
  if (currencyFrom && currencyTo) {
    const fetchCross = fetch('https://edge.qiwi.com/sinap/crossRates').then(
      response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Not Found`);
      }
    );
    return fetchCross;
  }
  return;
};

export default FetchApi;
