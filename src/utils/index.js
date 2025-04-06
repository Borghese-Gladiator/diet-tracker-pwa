export * from "./apiUtils";
export * from "./dateUtils";

export function mergeObj(obj1, obj2) {
  // merge any object function
  const result = { ...obj1 }; // clone obj1 to avoid mutating it

  for (const key in obj2) {
    if (result.hasOwnProperty(key)) {
      result[key] += obj2[key];
    } else {
      result[key] = obj2[key];
    }
  }

  return result;
}