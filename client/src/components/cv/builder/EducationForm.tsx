import React from 'react';
import { EducationItem } from '../../../types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

export const EducationForm: React.FC<Props> = ({ items = [], onChange }) => {
  const handleAddItem = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    };
    onChange([...items, newItem]);
  };

  const handleUpdateItem = (index: number, field: keyof EducationItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      {items.map((item, index) => (
        <div key={item.id || index} className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-black/5 pb-2">
            <span className="font-bold text-[#4F6B85] uppercase text-[10px] tracking-wider">
              Education #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="text-[#888888] hover:text-red-600 transition-colors p-1"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Degree / Qualification *</label>
              <input
                type="text"
                value={item.degree || ''}
                onChange={(e) => handleUpdateItem(index, 'degree', e.target.value)}
                placeholder="B.S. in Computer Science"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Institution / University *</label>
              <input
                type="text"
                value={item.institution || ''}
                onChange={(e) => handleUpdateItem(index, 'institution', e.target.value)}
                placeholder="UC Berkeley"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Start Date</label>
              <input
                type="text"
                value={item.startDate || ''}
                onChange={(e) => handleUpdateItem(index, 'startDate', e.target.value)}
                placeholder="Sep 2015"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">End Date</label>
              <input
                type="text"
                value={item.endDate || ''}
                onChange={(e) => handleUpdateItem(index, 'endDate', e.target.value)}
                placeholder="May 2019"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddItem}
        className="w-full py-2.5 rounded-2xl border-2 border-dashed border-black/15 text-[#4F6B85] hover:bg-[#4F6B85]/5 font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="size-4" />
        <span>Add Education</span>
      </button>
    </div>
  );
};
