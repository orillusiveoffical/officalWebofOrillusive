import React from 'react';
import { ExperienceItem } from '../../../types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ items = [], onChange }) => {
  const handleAddItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      responsibilities: '',
      achievements: ''
    };
    onChange([...items, newItem]);
  };

  const handleUpdateItem = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemoveItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      {items.map((item, index) => (
        <div key={item.id || index} className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs space-y-3 relative">
          <div className="flex items-center justify-between border-b border-black/5 pb-2">
            <span className="font-bold text-[#111111] uppercase text-[10px] tracking-wider text-[#4F6B85]">
              Experience #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="text-[#888888] hover:text-red-600 transition-colors p-1"
              title="Remove entry"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Job Title *</label>
              <input
                type="text"
                value={item.jobTitle || ''}
                onChange={(e) => handleUpdateItem(index, 'jobTitle', e.target.value)}
                placeholder="Senior Software Engineer"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Company Name *</label>
              <input
                type="text"
                value={item.company || ''}
                onChange={(e) => handleUpdateItem(index, 'company', e.target.value)}
                placeholder="Apex Technologies"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Start Date</label>
              <input
                type="text"
                value={item.startDate || ''}
                onChange={(e) => handleUpdateItem(index, 'startDate', e.target.value)}
                placeholder="Jan 2022"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">End Date</label>
              <input
                type="text"
                disabled={item.isCurrent}
                value={item.isCurrent ? 'Present' : item.endDate || ''}
                onChange={(e) => handleUpdateItem(index, 'endDate', e.target.value)}
                placeholder="Present / Dec 2024"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85] disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id={`current-${index}`}
              checked={item.isCurrent || false}
              onChange={(e) => handleUpdateItem(index, 'isCurrent', e.target.checked)}
              className="rounded text-[#4F6B85] focus:ring-[#4F6B85]"
            />
            <label htmlFor={`current-${index}`} className="text-xs text-[#555555] font-medium cursor-pointer">
              I currently work here
            </label>
          </div>

          <div>
            <label className="block text-[#555555] font-semibold text-[10px] mb-1">Description & Key Responsibilities</label>
            <textarea
              rows={3}
              value={item.description || ''}
              onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
              placeholder="Describe your role, team leadership, architectural contributions..."
              className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85] resize-none"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddItem}
        className="w-full py-2.5 rounded-2xl border-2 border-dashed border-black/15 text-[#4F6B85] hover:bg-[#4F6B85]/5 font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="size-4" />
        <span>Add Work Experience</span>
      </button>
    </div>
  );
};
