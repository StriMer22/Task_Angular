import { Message } from "./converter-types";

export const messages: Message[] = [
  { severity:'success', summary:'Sukces', detail:'Kursy wymiany zostały pomyślnie odebrane' },
  { severity:'info', summary:'Informacja', detail:'Wprowadź poprawny format daty RRRR-MM-DD' },
  { severity:'error', summary:'Błąd', detail:'Błąd podczas odbierania kursów walut. Proszę spróbuj ponownie...' },
];

export const lightTheme: string = 'bootstrap-light';
export const darkTheme: string = 'bootstrap-dark';
