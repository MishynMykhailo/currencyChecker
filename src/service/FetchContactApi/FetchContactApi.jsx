// const fromValutes = '643';
// const toValutes = '840';
// const FetchContactApi = ({ currencyFrom, currencyTo }) => {
//   if (currencyFrom && currencyTo) {
//     const fetchCross = fetch('https://edge.qiwi.com/sinap/crossRates').then(
//       response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error(`Not Found`);
//       }
//     );
//     return fetchCross;
//   }
//   return;
// };

const axios = require('axios');

const FetchContactApi = async ({ currencyFrom, currencyTo }) => {
  if (currencyFrom && currencyTo) {
    const instance = axios.create({
      baseURL: 'https://edge.qiwi.com/sinap/crossRates',
      url: '',
    });
    try {
      const response = await instance.get();
      return await response;
    } catch (error) {
      console.error(error);
    }
  }
  return console.log('errorrrr');
};
export default FetchContactApi;
