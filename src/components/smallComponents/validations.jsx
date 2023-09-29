export const validEmail = {
  reg: new RegExp("[a-z0-9._%+-]+@gmail.com"),
  regMsg: "Please enter valid Email! Ex:.gmail.com",
  emptyMsg: "Email field is Required!",
};

export const validPassword = {
  reg: new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  ),
  regMsg:
    "Password must contain at least one numeric digit, one uppercase and one lowercase letter and more than 8 characters",
  emptyMsg: "Password field is Required!",
};
