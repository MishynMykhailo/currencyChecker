import s from './CurrencyForm.module.css';
import { useState } from 'react';

import currencies from '../../service/currenciesID.json';
import Loader from 'components/Loader';
// 0.0061637

const CurrencyForm = ({
  onSubmit,
  mainValueCurrency,
  currencyFrom,
  currencyTo,
  COMMISSION,
}) => {
  const [currenciesArr] = useState(currencies);

  return (
    <>
      <form className={s.form} onSubmit={onSubmit}>
        <p className={s.text}>
          {mainValueCurrency ? (
            ` ${
              currenciesArr.find(
                curr => curr.number === mainValueCurrency.from && curr
              ).code
            } к ${
              currenciesArr.find(
                curr => curr.number === mainValueCurrency.to && curr
              ).code
            } получаем +-${mainValueCurrency.rate} | с комиссией +-${(
              mainValueCurrency.rate +
              mainValueCurrency.rate * (COMMISSION / 100) * 100
            ).toFixed(2)}`
          ) : (
            <Loader />
          )}
        </p>
        {currencyFrom === '643' && currencyTo === '840' && (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              color: 'red',
              opacity: 0.4,
              marginBottom: 15,
            }}
          >
            Погрешность RUB/USD = +-0.10 - 0.12
          </span>
        )}
      </form>
    </>
  );
};
export default CurrencyForm;
