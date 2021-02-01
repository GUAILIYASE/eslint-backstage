const toStr = arr => {
  let Str = JSON.stringify(arr);
  Str = Str.slice(1, Str.length - 1);
  Str = Str.replace(/"/g, "");
  Str = Str.replace(/,/g, " ");
  return Str;
};
const toArr = str => {
  str = str.replace(/"/g, "");
  str = str.replace(/,/g, " ");
  let arr = str.split(" ");
  arr = arr.filter(item => {
    return item !== "";
  });
  return arr;
};
export default {
  toArr,
  toStr
};
