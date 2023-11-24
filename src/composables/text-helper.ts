export enum ConversionMethod {
  lisp = "lisp",
  camel = "camel",
  snake = "snake",
  pascal = "pascal",
}

/**
 *
 * @param {string} method the conversion method
 * @param {string} string the string to convert
 * @returns {string}
 */
const useConvertText = (method: ConversionMethod, string: string) => {
  let convertedText = "";

  switch (method) {
    case "lisp":
      convertedText = toLispCase(string.trim());
      break;

    case "camel":
      convertedText = toCamelCase(string.trim());
      break;

    case "snake":
      convertedText = toSnakeCase(string.trim());
      break;

    case "pascal":
      convertedText = toPascalCase(string.trim());
      break;

    default:
      throw new Error("Unknown conversion method");
  }

  return { convertedText };
};

/**
 * Converts a given string to lisp or kebab case
 * @param {string} string the string to convert
 * @returns {string}
 */
const toLispCase = (string: string) => {
  if (string.length < 1) {
    return "";
  }

  return string
    .match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    )!
    .map((x) => x.toLowerCase())
    .join("-");
};

/**
 * Converts a given string to camel case
 * @param {string} string the string to convert
 * @returns {string}
 */
const toCamelCase = (string: string) => {
  if (string.length < 1) {
    return "";
  }

  return string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

/**
 * Converts a given string to snake case
 * @param {string} string the string to convert
 * @returns {string}
 */
const toSnakeCase = (string: string) => {
  if (string.length < 1) {
    return "";
  }

  return string
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
};

/**
 * Converts a given string to pascal case
 * @param {string} string the string to convert
 * @returns {string}
 */
const toPascalCase = (string: string) => {
  if (string.length < 1) {
    return "";
  }

  return string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export default useConvertText;
