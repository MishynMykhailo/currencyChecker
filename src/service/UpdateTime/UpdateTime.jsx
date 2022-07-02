// // import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { useEffect, useState, useRef } from 'react';
// const INTERVAL_UPDATE = 1000;

// const UpdateTime = ({ propsAsks, propsBids }) => {
//   const [spanSeconds, setSpanSeconds] = useState();
//   const intervalID = useRef(null);
//   let userSelectDate = Date.now() + 10000;
//   //   useEffect(() => {
//   //     if (propsAsks && propsBids) {
//   //       intervalID = setInterval(() => {

//   //       }, INTERVAL_UPDATE);
//   //     }
//   //   }, [propsAsks, propsBids]);

//   useEffect(() => {
//     intervalID.current = setInterval(() => {
//       const result = userSelectDate - Date.now();

//       console.log(intervalID);
//       console.log(result);
//       if (result < 1000) {
//         clearInterval(intervalID.current);
//       }
//       const resultConvertMs = convertMs(result);
//       setSpanSeconds(addLeadingZero(convertMs(result).seconds));
//     }, 1000);
//   }, []);

//   const convertMs = ms => {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);
//     return { seconds };
//   };

//   const addLeadingZero = value => {
//     return String(value).padStart(2, '0');
//   };

//   return (
//     <div className="timer">
//       <div className="field-timer">
//         <span className="value-timer" data-seconds></span>
//         <span className="label-timer">{spanSeconds}</span>
//       </div>
//     </div>
//   );
// };

// export default UpdateTime;
