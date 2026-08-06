import { useEffect } from 'react';

/**
 * StructuredData — Injects JSON-LD structured data into the document <head>.
 *
 * Each instance creates a <script type="application/ld+json"> tag that is
 * automatically cleaned up when the component unmounts or data changes.
 *
 * Usage:
 *   <StructuredData data={ORGANIZATION_SCHEMA} id="org-schema" />
 */

interface StructuredDataProps {
  /** The JSON-LD schema object */
  data: Record<string, unknown>;
  /** Unique ID to avoid duplicate script tags */
  id: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data, id }) => {
  useEffect(() => {
    const scriptId = `structured-data-${id}`;

    // Remove any existing script with the same ID
    const existing = document.getElementById(scriptId);
    if (existing) {
      existing.remove();
    }

    // Create and inject the JSON-LD script
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const el = document.getElementById(scriptId);
      if (el) {
        el.remove();
      }
    };
  }, [data, id]);

  return null; // This component only manages <head> side effects
};

export default StructuredData;
