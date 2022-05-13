/**
 * A class that requests code to be executed on the code executor server
 */
export class ExecutionRequest {
  /**
   * Create an execution request object
   * @param language the language to execute the code with
   * @param code the code to execute 
   */
  constructor(public language: string, public code: string) {}
}