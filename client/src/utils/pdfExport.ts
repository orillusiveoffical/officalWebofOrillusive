/**
 * Utility for exporting CV as a print-ready PDF document
 */

export const printOrExportCV = (title: string = 'Professional-CV') => {
  const originalTitle = document.title;
  document.title = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Orillusive`;

  // Trigger print dialog
  window.print();

  // Restore title
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
};
