import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeExecutorService } from './services/code-executor.service';
import { EditorComponent } from './components/editor-component/editor.component';
import { CodeIdeComponent } from './components/code-ide/code-ide.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { HomeComponent } from './components/home/home.component';
import { OutputComponent } from './components/output/output.component';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    CodeIdeComponent,
    HomeComponent,
    OutputComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule
  ],
  providers: [
    CodeExecutorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
