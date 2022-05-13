import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, retry, throwError } from 'rxjs';
import { importAceMode } from '../../acemodes';
import { setBoilerplate } from '../../boilerplate';
import { setGlobalLanguages } from '../../languages';
import { SupportedLanguageOption, SupportedLanguagesResponse } from '../../responses/supportedresponse';
import { CodeExecutorService } from '../../services/code-executor.service';

/**
 * Maps value to option name
 */
type MappedOptions = {
  [key: string]: string;
}

/**
 * Home component to chooe language
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**
   * Form for choosing language
   */
   form: FormGroup;
   /**
    * The list of supported options
    */
   options: SupportedLanguageOption[];
   /**
    * Map of options values to name
    */
   private mappedOptions: MappedOptions = {};
 
   constructor(private codeExecutor: CodeExecutorService,
     private router: Router,
     private notifier: NotifierService,
     private fb: FormBuilder) {
       this.form = this.fb.group({
         language: this.fb.control('', [Validators.required])
       });
     }
 
   private catchLoadError(e: HttpErrorResponse) {
     return throwError(() => 'Failed to launch application. Are you connected to the internet?');
   }
 
   ngOnInit(): void {
     this.notifier.notify('success', 'Loading, please wait', 'loader');
     this.codeExecutor.supportedLanguages()
       .pipe(
         catchError(this.catchLoadError),
         retry(3)
       )
       .subscribe({
         next: r => this.loadSupported(r),
         error: e => this.notifier.notify('error', e)
       })
   }

   private loadSupported(r: SupportedLanguagesResponse) {
    this.options = r.supported;
           
    for (let option of this.options) {
      this.mappedOptions[option.value] = option.supported.name;
    }

    setGlobalLanguages(this.options);
    this.notifier.hide('loader');
   }
 
   write() {
     const value = this.form.get('language')?.value;
     const name = this.mappedOptions[value];
 
     this.router.navigate(['code'], {
       queryParams: {
         'name': name,
         'language': value
       }
     });
   }
}
