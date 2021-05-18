import { getItem, USERLOGGED } from "../utils/storage";

const useUserLogged = async () => {
  const user = await getItem(USERLOGGED);
  if (!user) {
    return "";
  } else {
    return user;
  }
};

export default useUserLogged;
