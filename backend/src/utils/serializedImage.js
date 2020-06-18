const serializedArray = (users = []) => {
  
  return users.map((user) => {
    return {
      ...user,
      image_url: `http://localhost:3333/uploads/${user.image}`,
    };
  });
};

module.exports = serializedArray;
