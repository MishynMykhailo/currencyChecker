import s from './Statistics.module.css';

const Statistics = ({ props, mainValueNormalize }) => {
  const rateDifference = () => {
    const variables = props[0].price - mainValueNormalize;
    let markup;
    if (variables) {
      switch (true) {
        case variables >= 2:
          markup = (
            <span
              className={s.statistics}
              style={{
                backgroundColor: 'rgb(26, 199, 26)',
              }}
            >
              Разница курса: {variables.toFixed(3)}
            </span>
          );
          break;
        case 1.5 < variables < 2:
          markup = (
            <span
              className={s.statistics}
              style={{
                backgroundColor: ' rgb(252, 218, 67)',
              }}
            >
              Разница курса: {variables.toFixed(3)}
            </span>
          );
          break;
        case variables < 1.5:
          markup = (
            <span
              className={s.statistics}
              style={{
                backgroundColor: 'rgb(255, 121, 121)',
              }}
            >
              Разница курса: {variables.toFixed(3)}
            </span>
          );
          break;
        default:
          return;
      }
      return markup;
    }
  };

  return <>{rateDifference()}</>;
};
export default Statistics;
