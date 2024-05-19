import { merge as _merge, isUndefined, mergeWith } from 'lodash-es';

export const createUploadImageHandler =
  (onUploadImage: (base64: string) => void) => (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      onUploadImage(String(reader.result));
    });
  };

export const createDownloadLink = (name: string, url: string) => {
  const link = document.createElement('a');
  link.href = url!;
  link.download = name;

  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );
};

/**
 * 用于合并对象， 处理 undefined 的情况
 * @param target
 * @param source
 */
export const mergeWithUndefined: typeof _merge = <T = object>(target: T, source: T) =>
  mergeWith(target, source, (objValue, srcValue, key, obj) => {
    if (isUndefined(srcValue)) {
      obj[key] = srcValue;
    }
  });
