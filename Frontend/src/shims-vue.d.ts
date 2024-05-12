/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'jspdf' {
  interface jsPDF {
      autoTable: (options: any) => jsPDF;
  }
}