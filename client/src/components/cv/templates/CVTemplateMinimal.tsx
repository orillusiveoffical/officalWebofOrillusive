import React from 'react';
import type { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const CVTemplateMinimal: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, objective, experience, education, skills, projects, certifications, languages, achievements, customSections, customization } = data;
  const accent = customization?.accentColor || '#4F6B85';
  const fontFamily = customization?.fontFamily || 'Inter';

  return (
    <div 
      className="w-full bg-white text-[#111111] p-8 sm:p-12 shadow-sm font-sans"
      style={{ fontFamily: `${fontFamily}, 'Plus Jakarta Sans', 'Inter', sans-serif` }}
    >
      {/* Header */}
      <header className="border-b pb-6 mb-6" style={{ borderColor: `${accent}30` }}>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#111111]" style={{ color: accent }}>
              {personalInfo?.name || 'Your Full Name'}
            </h1>
            <p className="text-base font-semibold text-[#555555] mt-1">
              {personalInfo?.title || 'Professional Title'}
            </p>
          </div>

          {/* Contact Details */}
          <div className="text-xs text-[#555555] space-y-1 sm:text-right">
            {personalInfo?.email && <div className="flex items-center sm:justify-end gap-1.5"><Mail className="size-3 text-[#777777]" /><span>{personalInfo.email}</span></div>}
            {personalInfo?.phone && <div className="flex items-center sm:justify-end gap-1.5"><Phone className="size-3 text-[#777777]" /><span>{personalInfo.phone}</span></div>}
            {personalInfo?.location && <div className="flex items-center sm:justify-end gap-1.5"><MapPin className="size-3 text-[#777777]" /><span>{personalInfo.location}</span></div>}
            {personalInfo?.website && <div className="flex items-center sm:justify-end gap-1.5"><Globe className="size-3 text-[#777777]" /><span>{personalInfo.website}</span></div>}
            {personalInfo?.linkedin && <div className="flex items-center sm:justify-end gap-1.5"><Linkedin className="size-3 text-[#777777]" /><span>{personalInfo.linkedin}</span></div>}
            {personalInfo?.github && <div className="flex items-center sm:justify-end gap-1.5"><Github className="size-3 text-[#777777]" /><span>{personalInfo.github}</span></div>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {(summary || objective) && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-[#333333]">
            {summary || objective}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b" style={{ color: accent, borderColor: `${accent}20` }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id || exp.jobTitle} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-[#111111]">{exp.jobTitle} — <span className="font-semibold text-[#555555]">{exp.company}</span></span>
                  <span className="text-[11px] font-mono text-[#777777]">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <p className="text-[11px] text-[#888888] font-mono">{exp.location}</p>}
                {exp.description && <p className="text-xs text-[#444444] mt-1 leading-relaxed">{exp.description}</p>}
                {exp.responsibilities && <p className="text-xs text-[#555555] mt-1 italic">{exp.responsibilities}</p>}
                {exp.achievements && <p className="text-xs font-semibold text-[#111111] mt-1">Key Achievement: {exp.achievements}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b" style={{ color: accent, borderColor: `${accent}20` }}>
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id || edu.degree} className="flex justify-between items-baseline">
                <div>
                  <div className="text-xs font-bold text-[#111111]">{edu.degree}</div>
                  <div className="text-xs text-[#555555]">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</div>
                  {edu.gpa && <div className="text-[11px] text-[#777777]">GPA: {edu.gpa}</div>}
                </div>
                <span className="text-[11px] font-mono text-[#777777]">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b" style={{ color: accent, borderColor: `${accent}20` }}>
            Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((sk) => (
              <span key={sk.id || sk.name} className="px-2.5 py-1 rounded text-xs font-medium bg-[#F4F4F2] text-[#222222]">
                {sk.name} <span className="text-[10px] text-[#777777]">({sk.level})</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b" style={{ color: accent, borderColor: `${accent}20` }}>
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id || proj.name}>
                <div className="text-xs font-bold text-[#111111]">{proj.name}</div>
                <p className="text-xs text-[#444444] mt-0.5">{proj.description}</p>
                {proj.techStack && <p className="text-[11px] font-mono text-[#777777] mt-0.5">Tech Stack: {proj.techStack}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>Certifications</h2>
            <div className="space-y-1.5 text-xs text-[#333333]">
              {certifications.map((cert, idx) => (
                <div key={cert.id || `cert-${idx}`}>
                  <span className="font-semibold">{cert.name}</span> — {cert.organization} ({cert.issueDate})
                </div>
              ))}
            </div>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>Languages</h2>
            <div className="space-y-1 text-xs text-[#333333]">
              {languages.map((lang, idx) => (
                <div key={lang.id || `lang-${idx}`}>
                  <span className="font-semibold">{lang.language}</span> — <span className="text-[#666666]">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Achievements & Honors */}
      {achievements && achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}20` }}>
            Honors & Achievements
          </h2>
          <div className="space-y-2 text-xs text-[#333333]">
            {achievements.map((ach, idx) => (
              <div key={ach.id || `ach-${idx}`}>
                <span className="font-semibold">{ach.title}</span> — {ach.issuer} ({ach.date})
                {ach.description && <p className="text-[11px] text-[#555555] mt-0.5">{ach.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <div className="mt-6 space-y-4">
          {customSections.map((sec, idx) => (
            <section key={sec.id || `custom-${idx}`}>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>{sec.sectionTitle}</h2>
              <p className="text-xs text-[#333333] leading-relaxed">{sec.content}</p>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};
