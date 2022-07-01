import { useState, useEffect } from 'react';
import s from '../App/App.module.css';
import currencies from '../../service/currenciesID.json';
import SelectItem from 'components/SelectItem';
import FetchApi from 'service/FetchApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//Notify options
Notify.init({
  width: '300px',
  position: 'right-bottom',
  closeButton: false,
  clickToClose: true,
  timeout: 2000,
});

let INTERVAL;

export const App = () => {
  const [currenciesArr] = useState(currencies);
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('643');
  const [currencyTo, setCurrencyTo] = useState('840');
  const [mainValueCurrency, setMainValueCurrency] = useState(null);

  const handlerSumbit = e => {
    e.preventDefault();
    if (
      e.target.elements.selectFrom.value === e.target.elements.selectTo.value
    ) {
      return Notify.failure('Одинаковая валюта, я так не умею😢');
    }
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
      <div className={s.div}>
        <form className={s.form} onSubmit={handlerSumbit}>
          <div className={s.divContact} />

          <p className={s.text}>
            {mainValueCurrency &&
              ` ${
                currenciesArr.find(
                  curr => curr.number === mainValueCurrency.from && curr
                ).code
              } к ${
                currenciesArr.find(
                  curr => curr.number === mainValueCurrency.to && curr
                ).code
              } получаем +-${mainValueCurrency.rate} с комиссией +-${(
                mainValueCurrency.rate +
                mainValueCurrency.rate * (0.0061637 / 100) * 100
              ).toFixed(2)}`}
          </p>
          <div className={s.containerFormSelect}>
            <div className={s.formFrom}>
              <label htmlFor="inputFrom" className={s.label}>
                Из
              </label>
              <input
                className={s.typeSearchInput}
                type="text"
                name="inputFrom"
                id="inputFrom"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                onChange={handlerChangeInput}
              />

              <select className={s.selectForm} name="selectFrom">
                <SelectItem props={getVisibleCurrencyFrom()} />
              </select>
            </div>
            <div className={s.formTo}>
              <label htmlFor="inputTo" className={s.label}>
                В
              </label>
              <input
                className={s.typeSearchInput}
                type="text"
                name="inputTo"
                id="inputTo"
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

      <hr />

      <div className={s.div}>
        <div className={s.divGarantex}></div>
        <h2>Завтра постараюсь сделать "стаканы"</h2>
        {/* <form className={s.form} onSubmit={handlerSumbit}>
          <div className={s.divImg} />

          <p className={s.text}>
            {mainValueCurrency &&
              ` ${
                currenciesArr.find(
                  curr => curr.number === mainValueCurrency.from && curr
                ).code
              } к ${
                currenciesArr.find(
                  curr => curr.number === mainValueCurrency.to && curr
                ).code
              } получаем +-${mainValueCurrency.rate} с комиссией +-${(
                mainValueCurrency.rate +
                mainValueCurrency.rate * (0.0061637 / 100) * 100
              ).toFixed(2)}`}
          </p>
          <div className={s.containerFormSelect}>
            <div className={s.formFrom}>
              <label htmlFor="inputFrom" className={s.label}>
                Из
              </label>
              <input
                className={s.typeSearchInput}
                type="text"
                name="inputFrom"
                id="inputFrom"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                onChange={handlerChangeInput}
              />

              <select className={s.selectForm} name="selectFrom">
                <SelectItem props={getVisibleCurrencyFrom()} />
              </select>
            </div>
            <div className={s.formTo}>
              <label htmlFor="inputTo" className={s.label}>
                В
              </label>
              <input
                className={s.typeSearchInput}
                type="text"
                name="inputTo"
                id="inputTo"
                onChange={handlerChangeInput}
              />
              <select className={s.selectForm} name="selectTo">
                <SelectItem props={getVisibleCurrencyTo()} />
              </select>
            </div>
          </div>
          <div className={s.divBtn}></div>
        </form> */}
      </div>
    </>
  );
};
