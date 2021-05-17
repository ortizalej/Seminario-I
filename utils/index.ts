export const getResult = async (msg = "", isSuccess = true) => {
  const result = { msg: msg, isSuccess: isSuccess };
  return result;
};
