import React from 'react';
import type { CVData } from '@/types/cv';

export const CVTemplateCreative: React.FC<{ data: CVData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, customSections } = data;
  const accent = data.customization?.accentColor || '#5B1E31';

  return (
    <div className="w-full bg-white text-[#111111] p-8 sm:p-12 shadow-sm font-sans">
      {/* Creative Hero Banner Header */}
      <div className="p-6 rounded-2xl text-white mb-8 shadow-md" style={{ backgroundColor: accent }}>
        <h1 className="text-3xl font-black tracking-tight">{personalInfo?.name || 'Creative Designer'}</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-white/80 mt-1">{personalInfo?.title || 'Product Designer & Strategist'}</p>
        <div className="flex flex-wrap gap-4 text-xs text-white/90 mt-4 pt-4 border-t border-white/20">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo?.location && <span>• {personalInfo.location}</span>}
          {personalInfo?.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <p className="text-xs leading-relaxed text-[#333333] font-medium">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-extrabold uppercase tracking-wider mb-4 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>
            Creative & Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp, idx) => (
              <div key={exp.id || `exp-${idx}`} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-[#111111]">{exp.jobTitle} — <span style={{ color: accent }}>{exp.company}</span></h3>
                  <span className="text-[10px] font-mono text-[#888888]">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-xs text-[#444444] leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Badge Chips */}
      {skills && skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-extrabold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>
            Skills & Specializations
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((sk, idx) => (
              <span key={sk.id || `sk-${idx}`} className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-2xs" style={{ backgroundColor: accent }}>
                {sk.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-extrabold uppercase tracking-wider mb-3 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>
            Education
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu, idx) => (
              <div key={edu.id || `edu-${idx}`} className="flex justify-between">
                <span className="font-bold">{edu.degree} — {edu.institution}</span>
                <span className="font-mono text-[#777777]">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <div className="space-y-6">
          {customSections.map((sec, idx) => (
            <div key={sec.id || `custom-${idx}`}>
              <h2 className="text-sm font-extrabold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>
                {sec.sectionTitle}
              </h2>
              <p className="text-xs text-[#333333] leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
