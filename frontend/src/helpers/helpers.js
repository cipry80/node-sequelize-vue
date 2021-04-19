export const getError = (error) => {
  switch (error) {
    case "cannot_be_empty":
      return "Please fill all the fields";
    case "existing_user":
      return "Username should be unique";
    case "existing_email":
      return "Email should be unique";
    case "Validation error: Please choose between male or female":
      return "Please choose between male or female";
    case "Validation error: Validation min on age failed":
      return "Min age should be 18";
    default:
      return "Please try again";
  }
};
