import { useState, useEffect, useRef } from 'react';
import s from '../App/App.module.css';
import FetchGarantexApi from 'service/FetchGarantexApi';
import TableGarantex from 'components/TableGarantex';
import Loader from 'components/Loader';
import Section from 'components/Section';
import FetchContactApi from 'service/FetchContactApi';
import CurrencyForm from 'components/CurrencyForm';
import Container from 'components/Container';
import { Notify } from 'notiflix';
import Statistics from 'components/Statistics';

//Notify options
Notify.init({
  width: '300px',
  position: 'right-bottom',
  closeButton: false,
  clickToClose: true,
  timeout: 2000,
});
export const App = () => {
  const [asksGarantex, setAsksGarantex] = useState(null);
  const [bidsGarantex, setBidsGarantex] = useState(null);
  const [currencyFrom, setCurrencyFrom] = useState('643');
  const [currencyTo, setCurrencyTo] = useState('840');
  const [mainValueCurrency, setMainValueCurrency] = useState(null);
  let INTERVAL_CONTACT = useRef(null);
  useEffect(() => {
    setInterval(async () => {
      const { data } = await FetchGarantexApi();
      setAsksGarantex(data.asks.splice(0, 20));
      setBidsGarantex(data.bids.splice(0, 20));
    }, 3000);
  }, []);

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
  let mainValueNormalize;
  if (mainValueCurrency) {
    mainValueNormalize = (
      mainValueCurrency.rate +
      mainValueCurrency.rate * (0.0061637 / 100) * 100
    ).toFixed(2);
  }
  return (
    <>
      {/* Contact */}

      <Section>
        <div className={s.divContactIMG} />
        <Container>
          <CurrencyForm
            onSubmit={handlerSubmit}
            mainValueCurrency={mainValueCurrency}
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
          />
        </Container>
      </Section>
      <Section>
        <div className={s.divGarantexIMG}></div>
        {currencyFrom === '643' &&
          currencyTo === '840' &&
          bidsGarantex &&
          mainValueNormalize && (
            <Statistics
              props={bidsGarantex}
              mainValueNormalize={mainValueNormalize}
            />
          )}
        <Container>
          {asksGarantex && bidsGarantex ? (
            <>
              <div className={s.containerGarantexTable}>
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
            </>
          ) : (
            <Loader />
          )}
        </Container>
      </Section>
    </>
  );
};
