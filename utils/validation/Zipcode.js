const re = /^[0-9]{5}$/;

export const is_zipcode_valid = zipcode => {
  const res = re.test(zipcode) === false ? false : true;
  return res;
};
