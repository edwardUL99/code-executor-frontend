import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ace from 'ace-builds'

/**
 * Displays code output
 */
@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit, AfterViewInit {
  /**
   * The HTML div for entering input
   */
  @ViewChild('outputEditor')
  private editorElement: ElementRef<HTMLElement>;
  /**
  * The editor component
  */
  private editor: ace.Ace.Editor;
  /**
   * The heignt of the editor
   */
  height: number = window.innerHeight * 0.2;
  /**
   * Date at which output was received
   */
  outputReceived?: Date;
  /**
   * Text to display output or error
   */
  headerText: string = 'Output';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "16px");
    this.editor = ace.edit(this.editorElement.nativeElement);
    this.editor.setReadOnly(true);
  }

  setOutput(output: string) {
    this.headerText = 'Output';
    this.editor.session.setValue(output);
    this.outputReceived = new Date();
  }

  setError(error: string) {
    this.headerText = 'Error';
    this.editor.session.setValue(error);
    this.outputReceived = undefined;
  }

  clear() {
    this.headerText = 'Output';
    this.editor.session.setValue('');
    this.outputReceived = undefined;
  }
}
