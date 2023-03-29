let user = await User.findOne({
  where: {
    id_user: username,
    password: password,
  },
});
console.log(user.dataValues.id_user);
console.log(username);
if (
  username == user.dataValues.id_user &&
  password == user.dataValues.password
) {
  return done(null, {
    id_user: user.dataValues.id_user,
    password: user.dataValues.password,
  });
} else {
  return done(null, false);
}
