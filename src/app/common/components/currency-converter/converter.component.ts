import { ConverterService } from '../../../core/services/converter.service';
import { ThemesService } from '../../../core/services/themes.service';
import { RateInfoRow, Message } from '../../../core/utils/converter-types';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from "primeng/api";
import { debounceTime, distinctUntilChanged, finalize, takeUntil } from "rxjs/operators";
import { Table } from "primeng/table";
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { messages, lightTheme, darkTheme } from 'src/app/core/utils/consts';

interface Theme {
  name: string,
  code: string
}
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  providers: [MessageService]
})
export class ConverterComponent implements OnInit, OnDestroy {
  dateForm = new FormControl()
  destroy$ = new Subject<void>();
  exchangeRates: RateInfoRow[] = [];
  loading: boolean = true;
  messages: Message[] = messages;
  selectedTheme: string = lightTheme;
  themes: Theme[];

  constructor(
    private themeService: ThemesService,
    private httpService: ConverterService,
    private messageService: MessageService
    ) {
      this.themes = [ { name: 'Jasny', code: lightTheme }, { name: 'Ciemny', code: darkTheme }]
    }

    clear(table: Table) {
      table.clear();
      this.dateForm.setValue('')
      this.getRates()
    }

    getRates() {
      this.httpService.getRates()
        .pipe(
          finalize(() => {
            this.loading = false
          })
        )
        .subscribe({
          next: (i) => {
            i.forEach(el => this.exchangeRates = [...el.rates]);
            this.showViaService(this.messages[0]);
          },
          error: () => this.showViaService(this.messages[2]),
        }
        )
    }

    pickTheme(event: any) {
      this.themeService.switchTheme(event.value === lightTheme ? lightTheme : darkTheme);
    }

    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }

    ngOnInit(): void {
      this.getRates()

      this.dateForm.valueChanges
        .pipe(
          takeUntil(this.destroy$),
          debounceTime(2000),
          distinctUntilChanged()
        )
        // Need to fix subscribe in subscribe
        .subscribe({
          next: (date) => {
          if (date) {
            const parsedDate = new Date(date).toISOString().slice(0, 10)
            this.httpService.getRates(parsedDate)
              .pipe(
                finalize(() => this.loading = false)
              )
              .subscribe({
                next: (i) => {
                i.forEach(el => this.exchangeRates = [...el.rates])
                this.showViaService(this.messages[0])
              },
                error: () => this.showViaService(this.messages[2]),
            })
          }
        }})
    }


  showViaService(message: Message) {
    this.messageService.add(message);
    setTimeout(() => {
      this.messageService.clear()
    }, 2500)
  }
}
