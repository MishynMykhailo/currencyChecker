const SelectItem = ({ props }) => {
  return props.map(prop => (
    <option key={prop.number} value={prop.number}>
      {prop.code}
    </option>
  ));
};
export default SelectItem;
