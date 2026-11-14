// Un slug válido solo tiene minúsculas, números y guiones (máx. 40 caracteres).
const REGEX_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function esSlugValido(slug) {
  return typeof slug === 'string' && slug.length <= 40 && REGEX_SLUG.test(slug);
}
