import React from 'react';
import { PersonalInfo } from '../../../types/cv';

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. Alex Mercer"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
            Professional Title *
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="alex@company.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
            Location
          </label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
            Personal Website
          </label>
          <input
            type="text"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://alexmercer.dev"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
            LinkedIn Profile
          </label>
          <input
            type="text"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/alexmercer"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
            GitHub Profile
          </label>
          <input
            type="text"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="github.com/alexmercer"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};
