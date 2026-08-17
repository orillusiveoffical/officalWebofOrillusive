import React from 'react';
import type { CVData } from '@/types/cv';

export const CVTemplateExecutive: React.FC<{ data: CVData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, customSections } = data;
  const accent = data.customization?.accentColor || '#1B365D';

  return (
    <div className="w-full bg-white text-[#111111] p-8 sm:p-12 shadow-sm font-sans">
      {/* Top Banner Header */}
      <div className="border-b-4 pb-6 mb-8 text-center" style={{ borderColor: accent }}>
        <h1 className="text-3xl font-black tracking-tight uppercase" style={{ color: accent }}>
          {personalInfo?.name || 'Executive Name'}
        </h1>
        <p className="text-sm font-semibold tracking-widest text-[#555555] uppercase mt-1">
          {personalInfo?.title || 'Executive Director'}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-[#666666] mt-3">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo?.location && <span>• {personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2 border-b pb-1 text-[#111111]" style={{ borderColor: `${accent}30` }}>
            Executive Summary
          </h2>
          <p className="text-xs leading-relaxed text-[#333333] italic">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 border-b pb-1 text-[#111111]" style={{ borderColor: `${accent}30` }}>
            Leadership Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id || exp.jobTitle}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-extrabold text-[#111111]">{exp.jobTitle} | <span style={{ color: accent }}>{exp.company}</span></h3>
                  <span className="text-[11px] font-mono text-[#777777]">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-xs text-[#444444] mt-1 leading-relaxed">{exp.description}</p>}
                {exp.responsibilities && <p className="text-xs text-[#555555] mt-1">{exp.responsibilities}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 border-b pb-1 text-[#111111]" style={{ borderColor: `${accent}30` }}>
              Education & Credentials
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id || edu.degree}>
                  <div className="text-xs font-bold">{edu.degree}</div>
                  <div className="text-xs text-[#555555]">{edu.institution}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 border-b pb-1 text-[#111111]" style={{ borderColor: `${accent}30` }}>
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((sk) => (
                <span key={sk.id || sk.name} className="px-2 py-0.5 rounded text-[11px] font-semibold border border-black/10 text-[#333333]">
                  {sk.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <div className="space-y-4">
          {customSections.map((sec) => (
            <section key={sec.id || sec.sectionTitle}>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-1 border-b pb-1 text-[#111111]" style={{ borderColor: `${accent}30` }}>
                {sec.sectionTitle}
              </h2>
              <p className="text-xs text-[#333333] leading-relaxed">{sec.content}</p>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};
