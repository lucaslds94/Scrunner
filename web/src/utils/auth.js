import {getLocalStorage} from './localStorage';

export const isAuth = () => {
  const token = getLocalStorage("@Scrunner:token");

  if(!token){
    return false;
  }

  return true;
}
