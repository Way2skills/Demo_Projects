export const COURSE_BATCHES = [
  { key: "batch_1", name: "Batch 1", timing: "10:00 AM – 12:00 PM" },
  { key: "batch_2", name: "Batch 2", timing: "1:00 PM – 3:00 PM" },
  { key: "batch_3", name: "Batch 3", timing: "3:00 PM – 5:30 PM" },
  { key: "batch_4", name: "Batch 4", timing: "6:00 PM – 8:00 PM" },
];

export function getCourseSlug(course) {
  if (typeof course.slug === "string" && course.slug.trim()) return course.slug.trim();

  const name = String(course.name || course.title || "course");
  const slug = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug || "course"}${course.id == null ? "" : `-${course.id}`}`;
}

export function formatCourseFee(value) {
  if (value === null || value === undefined || value === "") return "Not specified";
  const fee = Number(value);
  if (!Number.isFinite(fee) || fee < 0) return "Not specified";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(fee);
}
