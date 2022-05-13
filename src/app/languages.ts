import { HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Observer, retry } from 'rxjs';
import { getAceMode, importAceMode } from './acemodes';
import { getBoilerplate, setBoilerplate } from './boilerplate';
import { SupportedLanguageOption, SupportedLanguagesResponse } from './responses/supportedresponse';
import { CodeExecutorService } from './services/code-executor.service';

/**
 * 
 * @param executor the executor to load
 * @param observer the observer to load the response into
 * @param errorHandler the handler for if an error occurs loading it
 */
export function loadLanguages(executor: CodeExecutorService, observer: Partial<Observer<SupportedLanguagesResponse>>, errorHandler: (e: HttpErrorResponse) => Observable<any>) {
  executor.supportedLanguages()
    .pipe(
      retry(3),
      catchError(errorHandler)
    )
    .subscribe(observer);
}

/**
 * Set the global supported languages
 * @param languages the languages to set from
 */
export function setGlobalLanguages(languages: SupportedLanguageOption[]) {
  for (let language of languages) {
    setBoilerplate(language.value, language.supported.boilerplate);
    importAceMode(language.value, language.supported.ace_mode);
  }
}

/**
 * Check if the language exists
 * @param language the language to check
 */
export function languageExists(language: string): boolean {
  return getBoilerplate(language) != undefined && getAceMode(language) != undefined;
}