import s from './Container.module.css';
const Container = ({ children }) => {
  return <div className={s.div}>{children}</div>;
};
export default Container;
