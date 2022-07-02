const SelectItem = ({ props }) => {
  return (
    props &&
    props.map(prop => (
      <option key={prop.name} value={prop.number}>
        {prop.code}
      </option>
    ))
  );
};
export default SelectItem;
