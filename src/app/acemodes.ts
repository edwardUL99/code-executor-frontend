import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-c_cpp';

/**
 * The type for mode mappings
 */
type ModeMappingType = {
  [key: string]: string;
};

/**
 * Supported ACE modes
 */
const ModeMappings: ModeMappingType = {}

/**
 * Get the mode for ACE for the given language
 * @param language the language to match with a mode
 */
export function getAceMode(language: string): string {
  return ModeMappings[language];
}

/**
 * Import the ace mode
 * @param language the language to import the mode for
 * @param mode the name of the ACE mode
 */
export function importAceMode(language: string, mode: string) {
  const mapping = `ace/mode/${mode}`;

  ModeMappings[language] = mapping;
}