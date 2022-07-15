import cloneDeep from 'lodash/cloneDeep';
import camelCase from 'lodash/camelCase';
import transform from 'lodash/transform';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

export const camelizeObjectProperty = (object: Record<string, unknown>) =>
  transform(object, (result: Record<string, unknown>, value: unknown, key: string, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);
    result[camelKey] = value;
  });

export const camelizeObjectPropertyRecursively = (object: Record<string, unknown>) =>
  transform(object, (result: Record<string, unknown>, value: unknown, key: string, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);
    result[camelKey] = isObject(value) ? camelizeObjectPropertyRecursively(value as Record<string, unknown>) : value;
  });

export const sanitizeOptions = (object: Record<string, any>) => {
  const clonedObject = cloneDeep(object);

  Object.keys(clonedObject).forEach(key => {
    if (!Array.isArray(clonedObject[key])
      && typeof clonedObject[key] === 'object'
      && clonedObject[key] !== null
      && clonedObject[key].value
      && clonedObject[key].label) {
      clonedObject[key] = clonedObject[key].value;
    }
  });

  return clonedObject;
};

export const sanitizeFormValues = (object: Record<string, any>) => {
  const clonedObject = cloneDeep(object);

  Object.keys(clonedObject).forEach(key => {
    if (!Array.isArray(clonedObject[key])
      && typeof clonedObject[key] === 'object'
      && clonedObject[key] !== null
      && clonedObject[key].value
      && clonedObject[key].label) {
      clonedObject[key] = clonedObject[key].value;
    } else if (clonedObject[key] === null || clonedObject[key] === '') {
      delete clonedObject[key];
    }
  });

  return clonedObject;
};

export const camelizeObjectPropertyAndSanitizeOptions = (object: Record<string, any>) => {
  return camelizeObjectProperty(sanitizeOptions(object));
};

export const isValidObject = (object: any) => {
  return typeof object === 'object' && !Array.isArray(object) && object !== null && object !== undefined;
};

