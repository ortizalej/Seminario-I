export const getResult = async (msg, isSuccess = true) => {
  const result = { msg: msg, isSuccess: isSuccess };
  return result;
};

export const convertCurrencyToSymbol = (currency: string) => {
  let result;
  switch (currency?.toUpperCase()) {
    case "USD":
      result = "$";
      break;
    case "EUR":
      result = "€";
      break;
    case "ARS":
    default:
      result = "$";
      break;
  }
  return result;
};

export const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
