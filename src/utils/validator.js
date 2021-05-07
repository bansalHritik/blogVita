import messages from './messages';

export const validateFirstName = (firstName) => {
  if (!firstName) {
    return messages.signup.firstNameError;
  }
  return '';
};

export const validateLastName = (lastName) => {
  if (!lastName) {
    return messages.signup.lastNameError;
  }
  return '';
};
export const validatePostCode = (postcode) => {
  if (!postcode) {
    return messages.signup.postcodeDescription;
  }
  return '';
};
export const validatePhoneNumber = (phoneNumber) => {
  const regex = /^\d{10}$/;
  if (phoneNumber && phoneNumber.match(regex)) {
    return '';
  }
  return 'Enter valid phone number';
};

export const validateCountryCode = (code) => {
  if (!code) {
    return messages.signup.phoneDescription;
  }
  const regex = /^\d+$/;
  if (code && code.match(regex)) {
    return '';
  }
  return `Enter ${3 - code.length} more digits.`;
};
export const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email && email.match(regex)) {
    return undefined;
  }
  return 'Enter a valid email address';
};
export const validatePassword = (password) => {
  const regex = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})$/;
  if (password && password.match(regex)) {
    return undefined;
  }
  return 'Enter a valid password';
};
export const required = (message) => (data) => {
  if (!data) {
    return message;
  }
  return '';
};

export const confirmPasswordValidator = (value, other) =>
  value !== other?.password?.value ? 'Password Does not match' : undefined;

export const SIGNUP_REQUIRED_FIELDS = ['firstName', 'lastName', 'DOB', 'email'];

export const validateSigninData = (data) => {
  const objectKeys = Object.keys(data);
  for (let i = 0; i < SIGNUP_REQUIRED_FIELDS.length; i += 1) {
    const current = SIGNUP_REQUIRED_FIELDS[i];
    if (!objectKeys.includes(current) || !data[current]) {
      return false;
    }
  }
  return true;
};

export const validateSportsSelection = (data = []) => {
  if (data.length <= 5) return undefined;
  return 'You have already selected 5 sports.';
};

export const validateTimeSlot = (data) => {
  if (!(data?.length > 0)) {
    return messages.required.timeSlot;
  }
  return undefined;
};

export const minLength = (length, errorMessage) => (data) => {
  let result = undefined;
  if (data?.length !== errorMessage) {
    result = errorMessage;
  }
  return result;
};
