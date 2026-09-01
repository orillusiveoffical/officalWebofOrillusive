export interface PDFExportOptions {
  elementId?: string;
  filename?: string;
  qualityScale?: number;
}

/**
 * Capture an A4 container DOM element and convert it to a crisp PDF document.
 * Handles single/multi-page A4 dimensions (210mm x 297mm), zoom scaling resets, and typography crispness.
 */
export const downloadCVAsPDF = async (
  options: PDFExportOptions = {}
): Promise<boolean> => {
  const {
    elementId = 'cv-print-area',
    filename = 'Professional-CV',
    qualityScale = 2.5
  } = options;

  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    console.error(`[PDF Export Error]: Element with id #${elementId} not found.`);
    // Fallback to browser print if element missing
    window.print();
    return false;
  }

  try {
    // 1. Temporarily store and reset CSS scale transforms on container for full A4 resolution capture
    const originalTransform = targetElement.style.transform;
    const originalTransformOrigin = targetElement.style.transformOrigin;
    const originalBoxShadow = targetElement.style.boxShadow;

    targetElement.style.transform = 'scale(1)';
    targetElement.style.transformOrigin = 'top left';
    targetElement.style.boxShadow = 'none';

    // Allow browser frame render after scale reset
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Dynamic import to avoid bundling in critical path
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ]);

    // 2. Render high-resolution canvas with html2canvas
    const canvas = await html2canvas(targetElement, {
      scale: qualityScale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FFFFFF',
      logging: false,
      imageTimeout: 15000,
      windowWidth: 794 // 794px = A4 standard width at 96 DPI
    });

    // 3. Restore original element styles immediately
    targetElement.style.transform = originalTransform;
    targetElement.style.transformOrigin = originalTransformOrigin;
    targetElement.style.boxShadow = originalBoxShadow;

    // 4. Convert canvas to PNG Data URL
    const imgData = canvas.toDataURL('image/png', 1.0);

    // 5. Initialize jsPDF in A4 format (210mm x 297mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // Calculate height proportional to A4 width
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Render first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Multi-page page breaks if document exceeds single A4 page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    // 6. Trigger clean PDF file download
    const sanitizedFilename = `${filename.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || 'Resume'}.pdf`;
    pdf.save(sanitizedFilename);

    return true;
  } catch (error) {
    console.error('[PDF Generation Error]:', error);
    // Fallback to browser print dialog on failure
    window.print();
    return false;
  }
};

/**
 * Fallback Browser Print Method
 */
export const printOrExportCV = (title: string = 'Professional-CV') => {
  const originalTitle = document.title;
  document.title = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Orillusive`;

  window.print();

  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
};
