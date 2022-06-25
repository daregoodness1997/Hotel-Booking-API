const loginUser = async (req, res) => {
  res.json('User logged In');
};
const registerUser = async (req, res) => {
  res.send('Register user in');
};

module.exports = { loginUser, registerUser };
