import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupportedLanguagesResponse } from '../responses/supportedresponse';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExecutionRequest } from '../requests/executionrequest';
import { ExecutionResponse } from '../responses/executionresponse';

/**
 * A service for sending code execution requests
 */
@Injectable()
export class CodeExecutorService {
  constructor(private http: HttpClient) { }

  /**
   * Get the list of supported languages from the executor server
   * @returns the list of supported languages in an observable
   */
  supportedLanguages(): Observable<SupportedLanguagesResponse> {
    return this.http.get<SupportedLanguagesResponse>(`${environment.executor_url}/supported`);
  }

  /**
   * Request to the server that the code in the request should be executed
   * @param request the request to execute
   * @returns the response to the execution in an observable
   */
  execute(request: ExecutionRequest): Observable<ExecutionResponse> {
    return this.http.post<ExecutionResponse>(`${environment.executor_url}/execute`, request);
  }
}
