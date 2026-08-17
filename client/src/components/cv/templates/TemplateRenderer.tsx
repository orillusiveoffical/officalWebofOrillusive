import React from 'react';
import type { CVData } from '@/types/cv';
import { CVTemplateMinimal } from './CVTemplateMinimal';
import { CVTemplateModern } from './CVTemplateModern';
import { CVTemplateExecutive } from './CVTemplateExecutive';
import { CVTemplateCorporate } from './CVTemplateCorporate';
import { CVTemplateCreative } from './CVTemplateCreative';
import { CVTemplateAcademic } from './CVTemplateAcademic';

interface TemplateRendererProps {
  data: CVData;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data }) => {
  const templateId = data.templateId || 'minimal';

  switch (templateId) {
    case 'modern':
      return <CVTemplateModern data={data} />;
    case 'executive':
      return <CVTemplateExecutive data={data} />;
    case 'corporate':
      return <CVTemplateCorporate data={data} />;
    case 'creative':
      return <CVTemplateCreative data={data} />;
    case 'academic':
      return <CVTemplateAcademic data={data} />;
    case 'minimal':
    default:
      return <CVTemplateMinimal data={data} />;
  }
};
