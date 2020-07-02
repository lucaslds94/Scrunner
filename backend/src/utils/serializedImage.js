const serializedArray = (users = []) => {
  return users.map((user) => {
    return {
      ...user,
      image_url: `${process.env.API_URL}${process.env.API_PORT}/uploads/${user.image}`,
    };
  });
};

const serializedObject = (user) => {
  return {
    ...user,
    image_url: `${process.env.API_URL}${process.env.API_PORT}/uploads/${user.image}`,
  };
};

module.exports = {
  serializedArray,
  serializedObject,
};
