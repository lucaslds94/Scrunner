import {getLocalStorage} from './localStorage';

export const isLeader = () => {
  const user = getLocalStorage("@Scrunner:user");
  
  if(!user.is_owner){
    return false;
  }

  return true;
};
