import { nanoid } from 'nanoid';
import s from './TableGarantex.module.css';
const TableGarantex = ({ props, title, name }) => {
  return (
    <>
      <table
        key={nanoid()}
        className={name === 'asksGarantex' ? s.asks : s.bids}
      >
        <tbody>
          <tr>
            <th>{title}</th>
            <th>Всего USDT</th>
          </tr>
          {props &&
            props.map(({ price, volume }) => (
              <tr key={nanoid()}>
                <td>{price}</td>
                <td>{volume}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
export default TableGarantex;
