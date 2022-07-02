const axios = require('axios');

const FetchGarantexApi = async () => {
  const instance = axios.create({
    baseURL: 'https://garantex.io/api/v2/depth?market=usdtrub',
    url: '',
  });
  try {
    const response = await instance.get();
    return await response;
  } catch (error) {
    console.error(error);
  }
};
export default FetchGarantexApi;
