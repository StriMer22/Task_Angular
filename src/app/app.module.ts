import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
registerLocaleData(localePl);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterComponent } from '../app/common/components/currency-converter/converter.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartModule } from 'primeng/chart';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SkeletonModule } from 'primeng/skeleton';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputSwitchModule } from "primeng/inputswitch";
import { ButtonModule } from "primeng/button";
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';

const PRIME_NG_MODULES = [
  ChartModule,
  AvatarModule,
  AvatarGroupModule,
  SkeletonModule,
  InputMaskModule,
  InputTextModule,
  CalendarModule,
  TimelineModule,
  CardModule,
  MessagesModule,
  MessageModule,
  InputSwitchModule,
  ButtonModule,
  TableModule,
  SelectButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ...PRIME_NG_MODULES,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pl-PL' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
