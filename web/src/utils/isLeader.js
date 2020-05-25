import { getLocalStorage } from './localStorage';

export default function isLeader(users) {

  const myUser = getLocalStorage("@Scrunner:user");

  return users.find(user => {
    return user.id === myUser.id && user.is_leader
  });
}