declare module 'pdfmake/build/pdfmake' {
  import { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
  
  interface PdfMake {
    createPdf(docDefinition: TDocumentDefinitions): PdfMakeInstance;
    vfs: TFontDictionary;
  }

  interface PdfMakeInstance {
    download(filename: string): void;
    open(): void;
    print(): void;
    getBuffer(callback: (buffer: Uint8Array) => void): void;
    getBase64(callback: (base64: string) => void): void;
    getBlob(callback: (blob: Blob) => void): void;
    getDataUrl(callback: (dataUrl: string) => void): void;
  }

  const pdfMake: PdfMake;
  export default pdfMake;
}

declare module 'pdfmake/build/vfs_fonts' {
  import { TFontDictionary } from 'pdfmake/interfaces';
  
  const pdfFonts: {
    pdfMake: {
      vfs: TFontDictionary;
    };
  };
  export default pdfFonts;
}