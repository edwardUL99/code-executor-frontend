/**
 * Represents the response to an execution request
 */
export interface ExecutionResponse {
  /**
   * The exit code of the executed process
   */
  exit_code: number;
  /**
   * The program output
   */
  stdout: string;
  /**
   * A message outlining an error that occurred
   */
  error: string;
}