/**
 * A supported language
 */
export interface SupportedLanguage {
  /**
   * The language identifier
   */
  language: string;
  /**
   * The name of the language
   */
  name: string;
  /**
   * The ace editor mode
   */
  ace_mode: string;
  /**
   * The boilerplate code
   */
  boilerplate: string;
}

/**
 * The structure of a supported language item
 */
export interface SupportedLanguageOption {
  /**
   * The supported language
   */
  supported: SupportedLanguage;
  /**
   * The value of the language to send in an execution request
   */
  value: string;
}

/**
 * An interface with outlines the list of supported languages by the executor
 */
export interface SupportedLanguagesResponse {
  /**
   * The list of supported languages
   */
  supported: SupportedLanguageOption[];
}