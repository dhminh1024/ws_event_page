import { enGB, vi } from "date-fns/locale";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { linearGradient } from "polished";
import _ from "lodash";
import { parse } from "date-fns";
import { ANY } from "./types";

export const getInitials = (str: string) => {
  const words = str.split(" ");
  const initials = words.map((word) => word[0]).join("");
  return initials.slice(words.length - 2, words.length);
};

export const getShortName = (str: string) => {
  const words = str?.split(" ");
  return words.slice(words.length - 2, words.length).join(" ");
};

/** Get date-fns locale object from i18n locale code.
 * @default enGB
 */
export const getDateLocale = (locale: string) => {
  if (locale === "en") return enGB;
  if (locale === "vn") return vi;
  return enGB;
};

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(2) + " KB";
  const mb = kb / 1024;
  if (mb < 1024) return mb.toFixed(2) + " MB";
  const gb = mb / 1024;
  return gb.toFixed(2) + " GB";
};

export function shortenText(text: string, maxLength = 30) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, 15) + "…" + text.slice(-maxLength + 15);
}

export const stringHashToNumber = (str: string, length: number) => {
  // Simple hash function to convert string to a number
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Ensure the hash is positive
  hash = Math.abs(hash);

  // Map the hash to a number between 0 and 20
  return hash % length;
};

export const cleanPath = (path: string) => {
  let cleanedPath = path.replace(/^\/+|\/+$/g, "");
  cleanedPath = cleanedPath?.split("/").filter(Boolean).join("/");
  return "/" + cleanedPath;
};
export const buildUrlWithParams = (
  url: string,
  params?: Record<string, string>
) => {
  // Tạo một mảng chứa các tham số dưới dạng chuỗi
  if (!params) return url;
  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  // Kiểm tra xem URL đã có tham số chưa
  const separator = url.includes("?") ? "&" : "?";

  // Trả về URL mới
  return `${url}${separator}${queryString}`;
};
export const toCapitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeAllWords = (text: string) => {
  return text
    .split(" ")
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(" ");
};

export const genAvatarDefault = (name?: string) => {
  // return `https://robohash.org/${name}`
  // return `https://ui-avatars.com/api/?background=random&size=128&bold=true&color=fff&name=${getInitials(name || '?')}`
  const avatar = createAvatar(initials, {
    seed: getInitials(name || "?"),
    fontSize: 40,
    // ... other options
  }).toDataUri();
  return avatar;
};

export function removeAccents(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f|\s]/g, "")
    .toLowerCase();
}

export function replaceUndefinedWithNull(obj: object): object {
  return _.mapValues(obj, (value: ANY) => {
    if (_.isPlainObject(value)) {
      return replaceUndefinedWithNull(value);
    }
    if (value instanceof Date) {
      return new Date(
        value.getTime() - value.getTimezoneOffset() * 60000
      ).toISOString();
    }
    return _.isUndefined(value) ? null : value;
  });
}

export function objectToFormData(obj: object) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    formData.append(key, value);
  }

  return formData;
}

export const parseDate = (strDate?: string, format?: string) => {
  if (!strDate) return new Date();
  return parse(
    strDate.replace(/\.\d{3,}/, ""),
    format || "yyyy-MM-dd HH:mm:ss",
    new Date()
  );
};
export function removeMilliseconds(dateStr: string) {
  return dateStr.replace(/\.\d{3,}/, "");
}

export const convertToSlug = (title: string) => {
  return title
    .toLowerCase() // Chuyển thành chữ thường
    .normalize("NFD") // Loại bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu phụ
    .replace(/[^a-z0-9\s-]/g, "") // Loại bỏ ký tự không hợp lệ
    .trim() // Loại bỏ khoảng trắng đầu và cuối
    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, "-"); // Thay thế nhiều dấu gạch ngang liên tiếp thành một dấu gạch ngang
};