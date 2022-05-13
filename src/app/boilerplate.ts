/**
 * The type to map language to boilerplate
 */
type BoilerplateMappings = {
  [key: string]: string;
}

/**
 * Mapping of the boilerplate values
 */
const Boilerplates: BoilerplateMappings = {};

/**
 * Get boilerplate code for the given language
 * @param language the language to get the boilerplate for
 */
export function getBoilerplate(language: string): string {
  return Boilerplates[language];
}

/**
 * Set the boilerplate for the language
 * @param language the language to set the boilerplate for
 * @param boilerplate the boilerplate to set
 */
export function setBoilerplate(language: string, boilerplate: string) {
  Boilerplates[language] = boilerplate;
}