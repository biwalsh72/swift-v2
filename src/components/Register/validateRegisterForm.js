export default function validate(values) {
  let errors = {};

  if (!values.username) errors.username = "* Username is required";
  else if (!/\S{2,24}/.test(values.username))
    errors.username = "* Username must have 2-24 characters. (No Spaces)";

  if (!values.password) errors.password = "* Password is required";
  else if (
    !/^(?=.{8,})(?=.*[a-z]).*$/.test(
      values.password
    )
  )
    errors.password =
      "* Must be at least 8 characters and contains at least 1 number.";

  if (errors != {}) { console.log(errors); }
  return errors;
}
