export * from './validator';
export { default as Routes } from './routes';
export { default as messages } from './messages';

// export const getCurrentDate = (/** @type {string} */ format) => {
//   let formattedDate = format;
//   const date = new Date();

//   const currentYear = date.getFullYear();
//   const currentDate = date.getDate();
//   const currentMonth = date.getMonth();
//   formattedDate = formattedDate.replace(
//     'dd',
//     currentDate <= 9 ? `0${currentDate}` : `${currentDate}`,
//   );
//   formattedDate = formattedDate.replace(
//     'mm',
//     currentMonth <= 9 ? `0${currentMonth}` : `${currentMonth}`,
//   );
//   formattedDate = formattedDate.replace('yyyy', `${currentYear}`);
//   return formattedDate;
// };
