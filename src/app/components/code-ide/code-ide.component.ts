import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, Observable, throwError } from 'rxjs';
import { getAceMode } from '../../acemodes';
import { getBoilerplate } from '../../boilerplate';
import { languageExists, loadLanguages, setGlobalLanguages } from '../../languages';
import { ExecutionRequest } from '../../requests/executionrequest';
import { ExecutionResponse } from '../../responses/executionresponse';
import { CodeExecutorService } from '../../services/code-executor.service';
import { EditorComponent } from '../editor-component/editor.component';
import { OutputComponent } from '../output/output.component';

@Component({
  selector: 'app-code-ide',
  templateUrl: './code-ide.component.html',
  styleUrls: ['./code-ide.component.css']
})
export class CodeIdeComponent implements OnInit, AfterViewInit {
  /**
   * The language name
   */
  @Input() name: string;
  /**
   * The language to execute
   */
  @Input() language: string;
  /**
   * The code editor component
   */
  @ViewChild('codeEditor')
  editor: EditorComponent;
  /**
   * For displaying code output
   */
  @ViewChild('output')
  output: OutputComponent;
  /**
   * Determine if boilerplate should be reloaded
   */
  private reloadBoilerplate: boolean = false;

  constructor(private route: ActivatedRoute,
    private notifier: NotifierService,
    private executor: CodeExecutorService,
    private router: Router) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.name = params['name'];
    this.language = params['language'];

    if (!this.name || !this.language)
      this.router.navigate(['home']);

    this.checkLanguageExists();
  }

  private checkLanguageExists() {
    if (!languageExists(this.language)) {
      this.notifier.notify('success', 'Loading, please wait', 'loader');
      this.reloadBoilerplate = true;

      loadLanguages(this.executor, {
        next: r => {
          setGlobalLanguages(r.supported);
          this.ngAfterViewInit();
          setTimeout(() => this.notifier.hide('loader'), 1000);
        },
        error: e => this.notifier.notify('error', e)
      }, (e: HttpErrorResponse): Observable<any> => throwError(() => 'Failed to load code editor'));
    }
  }

  ngAfterViewInit(): void {
    if (this.reloadBoilerplate) {
      this.editor.ngAfterViewInit();
    }
  }

  private handleError() {
    return throwError(() => 'Failed to execute code');
  }

  private handleResponse(r: ExecutionResponse) {
    if (r.error) {
      this.output.setError(r.error);
      this.notifier.notify('error', 'An error occurred during execution, see error output for details');
    } else {
      this.output.setOutput(r.stdout);
    }

    this.notifier.hide('execution');
  }

  execute() {
    if (this.editor) {
      this.output.clear();
      const value = this.editor.getValue();
      this.notifier.notify('success', 'Code sent to server for execution, please wait', 'execution');
      
      const request = new ExecutionRequest(this.language, value);
      this.executor.execute(request)
        .pipe(
          catchError(this.handleError)
        )
        .subscribe({
          next: r => this.handleResponse(r),
          error: e => this.notifier.notify('error', e)
        });
    }
  }
}
