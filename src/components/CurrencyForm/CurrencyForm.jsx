import s from './CurrencyForm.module.css';
import { useEffect, useState, useRef } from 'react';
import FetchContactApi from 'service/FetchContactApi';
import CurrencySelect from 'components/CurrencySelect';
import currencies from '../../service/currenciesID.json';
import Loader from 'components/Loader';
import { Notify } from 'notiflix';

//Notify options
Notify.init({
  width: '300px',
  position: 'right-bottom',
  closeButton: false,
  clickToClose: true,
  timeout: 2000,
});

const CurrencyForm = () => {
  const [currenciesArr] = useState(currencies);
  const [currencyFrom, setCurrencyFrom] = useState('643');
  const [currencyTo, setCurrencyTo] = useState('840');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [mainValueCurrency, setMainValueCurrency] = useState(null);
  let INTERVAL_CONTACT = useRef(null);
  //Выполняет запрос при изменении Валют
  useEffect(() => {
    clearInterval(INTERVAL_CONTACT.current);
    INTERVAL_CONTACT.current = setInterval(async () => {
      const { data } = await FetchContactApi({ currencyFrom, currencyTo });
      data.result.filter(
        res =>
          String(res.from) === String(currencyFrom) &&
          String(res.to) === String(currencyTo) &&
          setMainValueCurrency(res)
      );
    }, 1000);
  }, [currencyFrom, currencyTo]);

  //Submit - отправка формы
  const handlerSubmit = e => {
    e.preventDefault();
    const { selectFrom, selectTo } = e.target.elements;
    if (selectFrom.value === selectTo.value) {
      return Notify.failure('Одинаковая валюта, я так не умею😢');
    }

    setCurrencyFrom(selectFrom.value);
    setCurrencyTo(selectTo.value);
  };

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
      <form className={s.form} onSubmit={handlerSubmit}>
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
            } получаем +-${mainValueCurrency.rate} с комиссией +-${(
              mainValueCurrency.rate +
              mainValueCurrency.rate * (0.0061637 / 100) * 100
            ).toFixed(2)}`
          ) : (
            <Loader />
          )}
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
