export const getChangeIndex = (offsetX: number, offsetY: number) => {
  return ((offsetY / 100) | 0) * 3 + ((offsetX / 100) | 0);
};
export const getPackageName = () => {
  const packageName = localStorage.getItem("packageName") || "jigsaw-package";
  return packageName;
};
type CommonObj = {
  [props: string]: CommonObj | any;
};
export const enFlatObj = (obj: CommonObj) => {
  let res: CommonObj = {};

  for (let key in obj) {
    if (/\./.test(key)) {
      const splitList = key.split('.');
      res[splitList[0]] = Object.assign(res[splitList[0]] || {}, enFlatObj({ [splitList.slice(1).join('.')]: obj[key] }));
    } else {
      res[key] = obj[key];
    }
  }

  return res;
};

export const flatObj = (obj: CommonObj, pre = '') => {
  let res: CommonObj = {};

  for (let key in obj) {
    if (obj[key]?.toString() === '[object Object]') {
      res = { ...res, ...flatObj(obj[key], pre ? `${pre}.${key}` : key) };
    } else {
      res[pre ? `${pre}.${key}` : key] = obj[key];
    }
  }

  return res;
};
