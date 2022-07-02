import { useState, useEffect } from 'react';
import s from '../App/App.module.css';
import currencies from '../../service/currenciesID.json';
import SelectItem from 'components/SelectItem';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import FetchContactApi from 'service/FetchContactApi';
import FetchGarantexApi from 'service/FetchGarantexApi';
import TableGarantex from 'components/TableGarantex';

//Notify options
Notify.init({
  width: '300px',
  position: 'right-bottom',
  closeButton: false,
  clickToClose: true,
  timeout: 2000,
});

let INTERVAL_CONTACT = null;

export const App = () => {
  const [currenciesArr] = useState(currencies);
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('643');
  const [currencyTo, setCurrencyTo] = useState('840');
  const [mainValueCurrency, setMainValueCurrency] = useState(null);
  const [asksGarantex, setAsksGarantex] = useState(null);
  const [bidsGarantex, setBidsGarantex] = useState(null);
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
    clearInterval(INTERVAL_CONTACT);
    INTERVAL_CONTACT = setInterval(async () => {
      const { data } = await FetchContactApi({ currencyFrom, currencyTo });
      data.result.filter(
        res =>
          String(res.from) === String(currencyFrom) &&
          String(res.to) === String(currencyTo) &&
          setMainValueCurrency(res)
      );
    }, 5000);
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
  useEffect(() => {
    setInterval(async () => {
      const { data } = await FetchGarantexApi();
      setAsksGarantex(data.asks.splice(0, 20));
      setBidsGarantex(data.bids.splice(0, 20));
    }, 5000);
  }, []);
  return (
    <>
      {/* Contact */}
      <div className={s.divContainer}>
        <div className={s.divBox}>
          <form className={s.form} onSubmit={handlerSumbit}>
            <div className={s.divContactIMG} />

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
                  autoComplete="off"
                  placeholder="RUB, USD..."
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
                  autoComplete="off"
                  placeholder="RUB, USD..."
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
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
      </div>

      <hr />
      {/* (
        <UpdateTime
          propAsksGarantex={asksGarantex}
          propBidsGarantex={bidsGarantex}
        />
      ) */}

      {/* {asksGarantex && bidsGarantex ? (
        <UpdateTime propsAsks={asksGarantex} propsBids={bidsGarantex} />
      ) : (
        console.log('govno')
      )} */}
      {/* GARANTEX */}
      <div className={s.divContainer}>
        <div className={s.divGarantexIMG}></div>
        <div className={s.divBox}>
          <h2>Завтра может сделаю "стаканы", если получится</h2>
        </div>

        <div className={s.tableContainer}>
          <TableGarantex
            props={asksGarantex}
            title={'Продажа'}
            name={'asksGarantex'}
          />
          <TableGarantex
            props={bidsGarantex}
            title={'Покупка'}
            name={'bidsGarantex'}
          />
        </div>
      </div>
    </>
  );
};
