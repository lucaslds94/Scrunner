module.exports = {
  setLocalStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data));
  },

  getLocalStorage (key){
    return JSON.parse(localStorage.getItem(key));
  },

  clearLocalStorage(){
    localStorage.clear();
  }
};


