export function isKidsCourseCategory(name) {
  return typeof name === "string" && /\bkids?\b/i.test(name);
}
