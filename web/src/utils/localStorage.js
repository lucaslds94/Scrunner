module.exports = {
  setLocalStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data));
  },

  getLocalStorage (key){
    localStorage.getItem(key);
  }

};


