import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as ace from 'ace-builds';
import { getAceMode } from '../../acemodes';
import { getBoilerplate } from '../../boilerplate';
import { saveAs } from 'file-saver';
import { getFilename } from '../../filenames';

/**
 * The editor component for entering code
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {
  /**
   * The HTML div for entering input
   */
  @ViewChild('editor')
  private editorElement: ElementRef<HTMLElement>;
  /**
   * The editor component
   */
  private editor: ace.Ace.Editor;
  /**
   * The programming language
   */
  @Input() language: string;
  /**
   * The heignt of the editor
   */
  height: number = window.innerHeight * 0.4;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "16px");
    this.editor = ace.edit(this.editorElement.nativeElement);
    
    const mode = getAceMode(this.language);

    if (mode)
      this.editor.session.setMode(mode);

    const boilerplate = getBoilerplate(this.language);

    if (boilerplate)
      this.editor.session.setValue(boilerplate);

    this.editor.commands.addCommand({
      name: 'save',
      bindKey: { 'win': 'Ctrl-S', 'mac': 'Cmd-S' },
      exec: () => this.save()
    })
  }

  getValue() {
    return this.editor.session.getValue();
  }

  setValue(value: string) {
    this.editor.session.setValue(value);
  }

  setMode(mode: string) {
    if (mode)
    this.editor.session.setMode(mode);
  }

  save() {
    const blob = new Blob([ this.getValue() ], {type: "text/plain;charset=utf-8"});
    saveAs(blob, getFilename(this.language));
  }
}
