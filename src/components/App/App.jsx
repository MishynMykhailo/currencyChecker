import { useState, useEffect } from 'react';
import s from '../App/App.module.css';
import FetchGarantexApi from 'service/FetchGarantexApi';
import TableGarantex from 'components/TableGarantex';
import Loader from 'components/Loader';
import Section from 'components/Section';

import CurrencyForm from 'components/CurrencyForm';
import Container from 'components/Container';

export const App = () => {
  const [asksGarantex, setAsksGarantex] = useState(null);
  const [bidsGarantex, setBidsGarantex] = useState(null);

  useEffect(() => {
    setInterval(async () => {
      const { data } = await FetchGarantexApi();
      setAsksGarantex(data.asks.splice(0, 20));
      setBidsGarantex(data.bids.splice(0, 20));
    }, 3000);
  }, []);
  return (
    <>
      {/* Contact */}
      <Section>
        <div className={s.divContactIMG} />
        <Container>
          <CurrencyForm />
        </Container>
      </Section>
      <Section>
        <div className={s.divGarantexIMG}></div>
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
