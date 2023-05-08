export const validateEmail = (email: string): boolean => {
  const regex = /\S+@\S+\.\S+/;
  return (email !== null && email !== undefined && regex.test(email) && email !== '');
};

export const validatePassword = (password: string): boolean => {
  return (password !== null && password !== undefined && password.length >= 6);
}

export const equalityPassword = (password: string, password2: string): boolean => {
  return password === password2;
};

export const validateName = (name: string): boolean => {
  return (name !== null && name !== undefined && name.length >= 3);
};

export const validateDate = (date: string): boolean => {
  const year: number = Number(date.slice(0,4));
  const month: number = Number(date.slice(5,7));
  const day: number = Number(date.slice(8,10));
  const atualYear: number = new Date().getFullYear();

  if(year < atualYear - 120 || year > atualYear) {
    return false;
  } else if (year > atualYear - 10) {
    return false;
  } else if (month > 12 || month < 1) {
    return false;
  } else if (day < 1 || day > 31) {
    return false;
  } else {
    return true;
  }
};