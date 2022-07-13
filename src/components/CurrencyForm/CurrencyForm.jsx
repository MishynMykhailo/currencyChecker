import s from './CurrencyForm.module.css';
import { useState } from 'react';

import CurrencySelect from 'components/CurrencySelect';
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
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');

  //Записывает изменения в Filter,для фильтрации валют в Input
  const handlerChangeInput = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'from':
        setFilterFrom(value);
        break;
      case 'to':
        setFilterTo(value);
        break;
      default:
        return;
    }
  };

  //Совместить в один метод !!!
  const getVisibleCurrencyFrom = () => {
    const normalizeFilterFrom = filterFrom.toLowerCase();
    const normalizeArray = currenciesArr.filter(({ code }) => {
      return code.toLowerCase().includes(normalizeFilterFrom);
    });
    return normalizeArray;
  };

  const getVisibleCurrencyTo = () => {
    const normalizeFilterTo = filterTo.toLowerCase();
    return currenciesArr.filter(currency =>
      currency.code.toLowerCase().includes(normalizeFilterTo)
    );
  };

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

        <div className={s.containerFormSelect}>
          <CurrencySelect
            name={'from'}
            selectName={'selectFrom'}
            onChangeHandler={e => handlerChangeInput(e)}
            getVisibleCurrency={getVisibleCurrencyFrom}
          />
          <CurrencySelect
            name={'to'}
            selectName={'selectTo'}
            onChangeHandler={handlerChangeInput}
            getVisibleCurrency={getVisibleCurrencyTo}
          />
        </div>
        <div className={s.divBtn}>
          <button type="submit" className={s.btn}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default CurrencyForm;
