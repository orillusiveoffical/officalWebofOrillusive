import React from 'react';
import type { CVData } from '@/types/cv';

interface TemplateProps {
  data: CVData;
}

export const CVTemplateModern: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements, customSections } = data;
  const accent = data.customization?.accentColor || '#2C3E50';

  return (
    <div className="w-full bg-white text-[#111111] grid grid-cols-12 min-h-[900px] shadow-sm font-sans">
      {/* Left Sidebar */}
      <div className="col-span-4 p-6 sm:p-8 text-white space-y-6" style={{ backgroundColor: accent }}>
        {/* Name / Title */}
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight leading-tight">{personalInfo?.name || 'Your Name'}</h1>
          <p className="text-xs opacity-90 mt-1 font-medium">{personalInfo?.title || 'Professional Title'}</p>
        </div>

        {/* Contact */}
        <div className="space-y-2 text-[11px] opacity-90 border-t border-white/20 pt-4">
          <p className="font-bold uppercase text-[9px] tracking-widest text-white/60 mb-2">Contact</p>
          {personalInfo?.email && <div className="truncate">{personalInfo.email}</div>}
          {personalInfo?.phone && <div>{personalInfo.phone}</div>}
          {personalInfo?.location && <div>{personalInfo.location}</div>}
          {personalInfo?.website && <div className="truncate">{personalInfo.website}</div>}
          {personalInfo?.linkedin && <div className="truncate">{personalInfo.linkedin}</div>}
          {personalInfo?.github && <div className="truncate">{personalInfo.github}</div>}
        </div>

        {/* Skills Sidebar */}
        {skills && skills.length > 0 && (
          <div className="border-t border-white/20 pt-4">
            <p className="font-bold uppercase text-[9px] tracking-widest text-white/60 mb-3">Core Skills</p>
            <div className="space-y-2 text-[11px]">
              {skills.map((sk) => (
                <div key={sk.id || sk.name}>
                  <div className="font-semibold">{sk.name}</div>
                  <div className="text-[10px] opacity-75">{sk.level}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="border-t border-white/20 pt-4">
            <p className="font-bold uppercase text-[9px] tracking-widest text-white/60 mb-2">Languages</p>
            <div className="space-y-1 text-[11px]">
              {languages.map((l) => (
                <div key={l.id || l.language} className="flex justify-between">
                  <span>{l.language}</span>
                  <span className="opacity-75">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Right */}
      <div className="col-span-8 p-6 sm:p-8 space-y-6">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1 text-[#222222]" style={{ borderColor: accent }}>
              Profile
            </h2>
            <p className="text-xs leading-relaxed text-[#444444]">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 border-b pb-1 text-[#222222]" style={{ borderColor: accent }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id || exp.jobTitle} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-[#111111]">{exp.jobTitle}</span>
                    <span className="text-[10px] font-mono text-[#888888]">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-[#555555]">{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
                  {exp.description && <p className="text-xs text-[#555555] leading-relaxed mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 border-b pb-1 text-[#222222]" style={{ borderColor: accent }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id || edu.degree}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold">{edu.degree}</span>
                    <span className="text-[10px] font-mono text-[#888888]">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="text-[11px] text-[#555555]">{edu.institution}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 border-b pb-1 text-[#222222]" style={{ borderColor: accent }}>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id || p.name}>
                  <span className="text-xs font-bold text-[#111111]">{p.name}</span>
                  <p className="text-xs text-[#555555]">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Achievements */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1 text-[#222222]" style={{ borderColor: accent }}>
              Certifications
            </h2>
            <div className="space-y-1 text-xs text-[#444444]">
              {certifications.map((cert) => (
                <div key={cert.id || cert.name}>
                  <span className="font-semibold">{cert.name}</span> — {cert.organization} ({cert.issueDate})
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && (
          <div className="space-y-4">
            {customSections.map((sec) => (
              <section key={sec.id || sec.sectionTitle}>
                <h2 className="text-xs font-bold uppercase tracking-wider mb-1 border-b pb-1 text-[#222222]" style={{ borderColor: accent }}>
                  {sec.sectionTitle}
                </h2>
                <p className="text-xs text-[#444444] leading-relaxed">{sec.content}</p>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
