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

// 辅助函数：检测是否为普通对象
const isPlainObject = (obj: any): obj is CommonObj => {
  return obj !== null && 
         typeof obj === 'object' && 
         Object.prototype.toString.call(obj) === '[object Object]';
};

// 辅助函数：深度合并对象
const deepMerge = (target: CommonObj, source: CommonObj): CommonObj => {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isPlainObject(result[key]) && isPlainObject(source[key])) {
        result[key] = deepMerge(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
};

export const enFlatObj = (obj: CommonObj, visited = new WeakSet<object>()): CommonObj => {
  // 循环引用检测
  if (visited.has(obj)) {
    return {}; // 返回空对象避免循环引用
  }
  
  if (isPlainObject(obj)) {
    visited.add(obj);
  }
  
  let res: CommonObj = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (/\./.test(key)) {
        const splitList = key.split('.');
        const firstKey = splitList[0];
        const restKey = splitList.slice(1).join('.');
        
        // 使用深度合并而不是Object.assign
        const nestedObj = enFlatObj({ [restKey]: obj[key] }, visited);
        if (res[firstKey]) {
          res[firstKey] = deepMerge(res[firstKey], nestedObj);
        } else {
          res[firstKey] = nestedObj;
        }
      } else {
        res[key] = obj[key];
      }
    }
  }

  if (isPlainObject(obj)) {
    visited.delete(obj);
  }

  return res;
};

export const flatObj = (obj: CommonObj, pre = '', visited = new WeakSet<object>()): CommonObj => {
  // 循环引用检测
  if (visited.has(obj)) {
    return {}; // 返回空对象避免循环引用
  }
  
  if (isPlainObject(obj)) {
    visited.add(obj);
  }
  
  let res: CommonObj = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isPlainObject(obj[key])) {
        res = { ...res, ...flatObj(obj[key], pre ? `${pre}.${key}` : key, visited) };
      } else {
        res[pre ? `${pre}.${key}` : key] = obj[key];
      }
    }
  }

  if (isPlainObject(obj)) {
    visited.delete(obj);
  }

  return res;
};
