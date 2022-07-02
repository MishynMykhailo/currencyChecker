import s from './CurrencySelect.module.css';
import SelectItem from 'components/SelectItem';
const CurrencySelect = ({
  name,
  onChangeHandler,
  getVisibleCurrency,
  selectName,
}) => {
  return (
    <>
      <div>
        <label htmlFor={name} className={s.label}>
          Из
        </label>
        <input
          className={s.typeSearchInput}
          type="text"
          name={name}
          id={name}
          autoComplete="off"
          placeholder="RUB, USD..."
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          onChange={onChangeHandler}
        />
        <select className={s.selectForm} name={selectName}>
          <SelectItem props={getVisibleCurrency()} />
        </select>
      </div>
    </>
  );
};
export default CurrencySelect;
