import { User } from "../types";
import { getItem, USERLOGGED } from "../utils/storage";

const useUserLogged = async () => {
  const user: User = await getItem(USERLOGGED);
  return user;
  // if (!user) {
  //   return "";
  // } else {
  //   return user;
  // }
};

export default useUserLogged;
