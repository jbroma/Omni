import validator from "validator";

export const titleLength = value => {
  return value && value.length <= 60
    ? undefined
    : "Must be less or equal to 60 characters in length";
};

export const notEmpty = value => {
  return value ? undefined : "This field is required";
};

export const isCurrency = value => {
  return validator.isCurrency(value, { digits_after_decimal: [1, 2] })
    ? undefined
    : "Must be a valid decimal number";
};

export const minPrice = value => {
  return value >= 0 ? undefined : "Must be greater or equal to 0";
};

export const maxPrice = value => {
  return value < 1000000000 ? undefined : "Must be lower than a billion";
};

export const validLocation = value => {
  return value && value !== "None"
    ? undefined
    : "You must select one of the listed locations";
};

export const validCategory = value => {
  return value && value !== "None"
    ? undefined
    : "You must select one of the listed categories";
};

export const isMobileNumberUK = value => {
  // https://github.com/redux-form/redux-form/issues/4344
  if (typeof value !== "string") {
    return true;
  }
  return validator.isMobilePhone(value, "en-GB", { strictMode: true })
    ? undefined
    : "Not a valid UK mobile number";
};

export const isEmail = value => {
  return validator.isEmail(value) ? undefined : "Not a valid e-mail";
};

export const passwordLength = value => {
  return value.length >= 8 ? undefined : "Must be at least 8 characters long";
};

export const passwordSpecial = value => {
  return /[#?!@$%^&*-]/.test(value)
    ? undefined
    : "Must include a special character (#?!@$%^&*-)";
};

export const passwordNumber = value => {
  return /\d/.test(value) ? undefined : "Must include a number";
};

export const passwordUppercase = value => {
  return /[A-Z]/.test(value) ? undefined : "Must include a big letter";
};

export const passwordLowercase = value => {
  return /[a-z]/.test(value) ? undefined : "Must include a small letter";
};
