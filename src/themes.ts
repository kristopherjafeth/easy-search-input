import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  inputTextColor: 'black',
  inputBackgroundColor: 'white',
  resultsBackgroundColor: 'white',
  resultHoverBackgroundColor: '#0071ce',
  resultHoverTextColor: 'white',
  loadingBackgroundColor: 'white',
  loadingTextColor: 'black',
};

export const sanimexTheme: DefaultTheme = {
  inputTextColor: 'white',
  inputBackgroundColor: 'black',
  resultsBackgroundColor: 'gray',
  resultHoverBackgroundColor: 'blue',
  resultHoverTextColor: 'yellow',
  loadingBackgroundColor: 'black',
  loadingTextColor: 'white',
};

export const themes = {
  default: defaultTheme,
  sanimex: sanimexTheme,
};