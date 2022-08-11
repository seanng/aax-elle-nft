export enum DisplayMode {
  initial,
  exists,
  success,
  error,
}

export interface Files {
  unopenedImage: File | null
  unopenedHtml: File | null
  openedImage: File | null
  openedHtml: File | null
  neverOpenedImage: File | null
  neverOpenedHtml: File | null
}
