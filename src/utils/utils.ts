/*
 * Copyright (C) 2021-2023 Intel Corporation
 * SPDX-License-Identifier: MIT
 */

import cloneDeep from 'lodash/cloneDeep';
import camelCase from 'lodash/camelCase';
import transform from 'lodash/transform';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import DeviceCotaConfiguration from '../models/DeviceCotaConfiguration';

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

export const roundToTwoDecimalPlaces = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const removeLastCharacterIfMatch = (str: string, needle: string) => {
  if (needle && needle !== '') {
    if (str.slice(-1) === needle) {
      return str.slice(0, -1);
    }
  }
  return str;
};

export const isValidObject = (object: any) => {
  return typeof object === 'object' && !Array.isArray(object) && object !== null && object !== undefined;
};

export const isValidJSONString = (str: string) => {
  if (str === null) return false;

  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

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
    } else if (clonedObject[key] === undefined
      || clonedObject[key] === null
      || clonedObject[key] === ''
      || key === 'sota_option') {
      delete clonedObject[key];
    } else if (Array.isArray(clonedObject[key]) && key === 'configurations') {
      // Here we add the 'path' string from the 'configurations' object and delete the 'configurations' property
      let pathString = '';

      clonedObject[key].forEach((value: DeviceCotaConfiguration) => {
        if (value.value) {
          pathString += `${value.path?.value}:${value.value};`;
        } else {
          pathString += `${value.path?.value};`;
        }
      });

      // Delete the 'configurations' property as INB is accepting 'path' key
      delete clonedObject[key];

      clonedObject['path'] = removeLastCharacterIfMatch(pathString, ';');
    }
  });

  return clonedObject;
};

export const camelizeObjectPropertyAndSanitizeOptions = (object: Record<string, any>) => {
  return camelizeObjectProperty(sanitizeOptions(object));
};
