import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends Record<string, any> {
    colors: {
      primary: string;
      positive: string;
      negative: string;
      bgColor: string;
      textColor: string;
      black: string;
      white: string;
      gray: {
        [key: number]: string;
      };
      redLight: string;
      red: string;
      greenLight: string;
      green: string;
    };
  }
}
