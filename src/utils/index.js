export function slugify(subject) {
  return subject.trim().toLowerCase().replace(/ /g, '-');
}
