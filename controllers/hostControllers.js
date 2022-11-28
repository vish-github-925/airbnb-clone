const get_hosthome = (req, res) => {
  res.render("HostPage", {
    data: {
      userType: req.cookies.userType,
      username: req.cookies.user,
      error: req.cookies.error,
    },
  });
};

module.exports = {
  get_hosthome,
};
