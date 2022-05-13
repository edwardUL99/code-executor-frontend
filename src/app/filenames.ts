/**
 * Mapping of string to possible filenames for saving
 */
type FilenamesMapping = {
  [key: string]: string;
}

/**
 * Filenames to give suggested save as filename
 */
const Filenames: FilenamesMapping = {};

Filenames['java'] = 'Main.java';
Filenames['c'] = 'main.c';
Filenames['c++'] = 'main.cpp';
Filenames['go'] = 'main.go';
Filenames['python'] = 'main.py';

/**
 * Add the suggested filename for the language
 * @param language the language to add suggested filename for
 * @param name the suggested filename
 */
export function addFilename(language: string, name: string) {
  Filenames[language] = name;
}

/**
 * Get the recommended save filename
 * @param language the language to get the filename of 
 */
export function getFilename(language: string) {
  const name = Filenames[language];

  return (name) ? name : 'unknown.txt';
}