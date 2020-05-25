import {getLocalStorage} from './localStorage';

export const isOwner = () => {
  const user = getLocalStorage("@Scrunner:user");
  
  if(!user.is_owner){
    return false;
  }

  return true;
};
