import type { QBtnProps, QDialogProps, QInputProps, QTableProps } from "quasar";

export const inputStyle: Partial<QInputProps> = {
  outlined: true,
  dense: true,
  filled: true,
};

export const buttonStyle: Partial<QBtnProps> = {
  unelevated: true,
  noCaps: true,
  dense: true,
  padding: "6px 24px",
};

export const dialogStyle: Partial<QDialogProps> = {
  noBackdropDismiss: true,
};

export const tableStyle: Partial<QTableProps> = {
  dense: true,
  square: false,
  virtualScroll: true,
  virtualScrollStickySizeStart: 28,
  virtualScrollSliceRatioAfter: 4,
  virtualScrollSliceRatioBefore: 4,
  virtualScrollItemSize: 28,
  hidePagination: true,
  rowsPerPageOptions: [0],
  bordered: false,
  cardClass: "shadow-0",
  dark: false,
};
