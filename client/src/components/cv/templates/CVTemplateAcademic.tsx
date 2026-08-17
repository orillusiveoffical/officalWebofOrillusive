import React from 'react';
import type { CVData } from '@/types/cv';

export const CVTemplateAcademic: React.FC<{ data: CVData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, customSections } = data;
  const accent = data.customization?.accentColor || '#1E4D2B';

  return (
    <div className="w-full bg-white text-[#111111] p-8 sm:p-12 shadow-sm font-sans">
      {/* Header */}
      <div className="text-center pb-6 border-b border-black/20 mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]" style={{ color: accent }}>{personalInfo?.name || 'Dr. Academic Scholar'}</h1>
        <p className="text-xs font-semibold text-[#555555] mt-1">{personalInfo?.title || 'Senior Research Fellow'}</p>
        <div className="flex justify-center gap-3 text-xs text-[#666666] mt-2 font-sans">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo?.location && <span>| {personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary / Research Statement */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest font-sans mb-2" style={{ color: accent }}>Research Statement</h2>
          <p className="text-xs leading-relaxed text-[#333333] italic">{summary}</p>
        </section>
      )}

      {/* Education First for Academic CV */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest font-sans mb-3 pb-1 border-b" style={{ color: accent, borderColor: `${accent}30` }}>
            Higher Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={edu.id || `edu-${idx}`} className="flex justify-between items-baseline">
                <div>
                  <div className="text-xs font-bold">{edu.degree}</div>
                  <div className="text-xs text-[#555555]">{edu.institution}</div>
                </div>
                <span className="text-xs font-mono text-[#777777]">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Academic & Professional Appointments */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest font-sans mb-3 pb-1 border-b" style={{ color: accent, borderColor: `${accent}30` }}>
            Academic & Professional Appointments
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={exp.id || `exp-${idx}`}>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold">{exp.jobTitle}, {exp.company}</span>
                  <span className="text-xs font-mono text-[#777777]">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-xs text-[#444444] mt-1 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications / Achievements */}
      {achievements && achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest font-sans mb-2" style={{ color: accent }}>Publications & Awards</h2>
          <div className="space-y-2 text-xs text-[#333333]">
            {achievements.map((ach, idx) => (
              <div key={ach.id || `ach-${idx}`}>
                <span className="font-semibold">{ach.title}</span> — {ach.issuer} ({ach.date})
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <div className="space-y-4">
          {customSections.map((sec, idx) => (
            <section key={sec.id || `custom-${idx}`}>
              <h2 className="text-xs font-bold uppercase tracking-widest font-sans mb-1 pb-1 border-b" style={{ color: accent, borderColor: `${accent}30` }}>
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
