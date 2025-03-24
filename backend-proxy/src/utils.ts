import { v4 as uuidv4 } from "uuid";

export const getRandomItemFromArray = (arr: any[]) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Input must be a non-empty array.");
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const log = (...args: any[]) => {
  console.log("[HAPI Elements Examples][Backend Proxy]", ...args);
};

export const getUUIDV4 = () => {
  return uuidv4();
};

export const convertSetToArray = <T>(set: Set<T>): T[] => {
  return Array.from(set);
};

export const findOrFilterComparator = <T>(
  v: T,
  key: keyof T,
  value: T[keyof T],
  equality: "strictEquality" | "notStrictEquality" = "strictEquality"
) => {
  const property = v[key];
  if (Array.isArray(property)) {
    return property.includes(value);
  } else if (equality === "strictEquality") {
    return property === value;
  } else if (equality === "notStrictEquality") {
    return property == value;
  }
};

export const findInSetByKey = <T>(
  set: Set<T>,
  key: keyof T,
  value: T[keyof T],
  equality: "strictEquality" | "notStrictEquality" = "strictEquality"
): T | undefined => {
  return convertSetToArray<T>(set).find((v) =>
    findOrFilterComparator(v, key, value, equality)
  );
};

export const filterInSetByKey = <T>(
  set: Set<T>,
  key: keyof T,
  value: T[keyof T],
  equality: "strictEquality" | "notStrictEquality" = "strictEquality"
): T[] | undefined => {
  return convertSetToArray<T>(set).filter((v) =>
    findOrFilterComparator(v, key, value, equality)
  );
};

export const findInSetByKeyValuePairs = <T extends Record<string, any>>(
  set: Set<T>,
  keyValuePairs: Partial<Record<keyof T, T[keyof T]>>
) => {
  return convertSetToArray<T>(set).find((v) => {
    return Object.keys(keyValuePairs).every((key) => {
      const valueOfKeyValuePair = keyValuePairs[key];
      return v[key] === valueOfKeyValuePair;
    });
  });
};

export const extractURLPathSegmentValue = (
  path: string,
  pathPrefix: string
) => {
  if (!path.startsWith(pathPrefix)) return null; // Ensure prefix exists in the path
  const remainingPath = path.slice(pathPrefix.length); // Remove the prefix
  const match = remainingPath.match(/^([^/]+)/); // Capture everything until the next "/", or end of string
  return match ? match[1] : null;
};

export const removeTrailingSlash = (url: string) => {
  return url.replace(/\/(?=$|[?#])/, "");
};
