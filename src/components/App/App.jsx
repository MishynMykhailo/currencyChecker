import { useState, useEffect } from 'react';

import s from '../App/App.module.css';

import currencies from '../../service/currenciesID.json';
import SelectItem from 'components/SelectItem';
import FetchApi from 'service/FetchApi';
let INTERVAL;
// console.log(currencies);
export const App = () => {
  const [currenciesArr] = useState(currencies);
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('643');
  const [currencyTo, setCurrencyTo] = useState('840');
  const [mainValueCurrency, setMainValueCurrency] = useState(null);
  const handlerSumbit = e => {
    e.preventDefault();
    setCurrencyFrom(e.target.elements.selectFrom.value);
    setCurrencyTo(e.target.elements.selectTo.value);
  };
  const handlerChangeInput = e => {
    switch (e.currentTarget.name) {
      case 'inputFrom':
        setFilterFrom(e.currentTarget.value);
        break;
      case 'inputTo':
        setFilterTo(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    clearInterval(INTERVAL);
    if (currencyFrom && currencyTo) {
      clearInterval(INTERVAL);
      INTERVAL = setInterval(() => {
        return FetchApi({ currencyFrom, currencyTo }).then(({ result }) => {
          result.filter(
            res =>
              String(res.from) === String(currencyFrom) &&
              String(res.to) === String(currencyTo) &&
              setMainValueCurrency(res)
          );
        });
      }, 1000);
    }
  }, [currencyFrom, currencyTo]);
  const getVisibleCurrencyFrom = () => {
    const normalizeFilterFrom = filterFrom.toLowerCase();
    return currenciesArr.filter(currency =>
      currency.code.toLowerCase().includes(normalizeFilterFrom)
    );
  };
  const getVisibleCurrencyTo = () => {
    const normalizeFilterTo = filterTo.toLowerCase();
    return currenciesArr.filter(currency =>
      currency.code.toLowerCase().includes(normalizeFilterTo)
    );
  };

  return (
    <>
      <div className={s.div}>
        <form className={s.form} onSubmit={handlerSumbit}>
          <h2 className={s.title}>Qiwi курс</h2>
          <p className={s.text}>
            {mainValueCurrency &&
              ` Из ${
                currenciesArr.find(
                  curr => curr.number === mainValueCurrency.from && curr
                ).code
              } в ${
                currenciesArr.find(
                  curr => curr.number === mainValueCurrency.to && curr
                ).code
              } получим = ${mainValueCurrency.rate}`}
          </p>
          <div className={s.containerFormSelect}>
            <div className={s.formFrom}>
              <p>Из</p>
              <input
                className={s.typeSearchInput}
                type="text"
                name="inputFrom"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                onChange={handlerChangeInput}
              />

              <select className={s.selectForm} name="selectFrom">
                <SelectItem props={getVisibleCurrencyFrom()} />
              </select>
            </div>

            <div className={s.formTo}>
              <p>В</p>
              <input
                className={s.typeSearchInput}
                type="text"
                name="inputTo"
                onChange={handlerChangeInput}
              />
              <select className={s.selectForm} name="selectTo">
                <SelectItem props={getVisibleCurrencyTo()} />
              </select>
            </div>
          </div>
          <div className={s.divBtn}>
            <button type="submit" className={s.btn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
