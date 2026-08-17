import React from 'react';
import type { CVData } from '@/types/cv';

export const CVTemplateCorporate: React.FC<{ data: CVData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, customSections } = data;
  const accent = data.customization?.accentColor || '#111111';

  return (
    <div className="w-full bg-white text-[#111111] p-8 sm:p-12 shadow-sm font-sans border-t-8" style={{ borderColor: accent }}>
      {/* Header */}
      <div className="flex justify-between items-end pb-6 border-b border-black/10 mb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-wider text-[#111111]">{personalInfo?.name || 'Corporate Professional'}</h1>
          <p className="text-xs font-bold uppercase tracking-widest text-[#666666] mt-1">{personalInfo?.title || 'Senior Manager'}</p>
        </div>
        <div className="text-right text-[11px] text-[#555555] space-y-0.5">
          {personalInfo?.email && <div>{personalInfo.email}</div>}
          {personalInfo?.phone && <div>{personalInfo.phone}</div>}
          {personalInfo?.location && <div>{personalInfo.location}</div>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6 p-4 rounded bg-[#F7F7F5] border-l-4" style={{ borderColor: accent }}>
          <p className="text-xs text-[#333333] leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest bg-[#111111] text-white px-3 py-1 mb-4 inline-block">Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={exp.id || `exp-${idx}`} className="border-l-2 border-black/10 pl-4 py-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>{exp.jobTitle} — {exp.company}</span>
                  <span className="font-mono text-[#777777]">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-xs text-[#444444] mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest bg-[#111111] text-white px-3 py-1 mb-3 inline-block">Education</h2>
            <div className="space-y-2 text-xs">
              {education.map((edu, idx) => (
                <div key={edu.id || `edu-${idx}`}>
                  <div className="font-bold">{edu.degree}</div>
                  <div className="text-[#666666]">{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest bg-[#111111] text-white px-3 py-1 mb-3 inline-block">Skills</h2>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {skills.map((sk, idx) => (
                <span key={sk.id || `sk-${idx}`} className="px-2 py-0.5 bg-[#F0F0EE] font-semibold text-[#222222]">
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certifications & Achievements */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest bg-[#111111] text-white px-3 py-1 mb-3 inline-block">Certifications</h2>
          <div className="space-y-1 text-xs text-[#333333]">
            {certifications.map((cert, idx) => (
              <div key={cert.id || `cert-${idx}`}>
                <span className="font-bold">{cert.name}</span> — {cert.organization} ({cert.issueDate})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <div className="space-y-4">
          {customSections.map((sec, idx) => (
            <div key={sec.id || `custom-${idx}`}>
              <h2 className="text-xs font-bold uppercase tracking-widest bg-[#111111] text-white px-3 py-1 mb-2 inline-block">{sec.sectionTitle}</h2>
              <p className="text-xs text-[#333333] leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
