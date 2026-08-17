import React from 'react';
import { AchievementItem } from '../../../types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  items: AchievementItem[];
  onChange: (items: AchievementItem[]) => void;
}

export const AchievementsForm: React.FC<Props> = ({ items = [], onChange }) => {
  const handleAddItem = () => {
    const newItem: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: '',
      issuer: '',
      date: '',
      description: ''
    };
    onChange([...items, newItem]);
  };

  const handleUpdateItem = (index: number, field: keyof AchievementItem, value: any) => {
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
        <div key={item.id || `ach-${index}`} className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-black/5 pb-2">
            <span className="font-bold text-[#4F6B85] uppercase text-[10px] tracking-wider">
              Award / Achievement #{index + 1}
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
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Award / Honor Title *</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleUpdateItem(index, 'title', e.target.value)}
                placeholder="Hackathon 1st Place Winner"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Issuer / Organization</label>
              <input
                type="text"
                value={item.issuer || ''}
                onChange={(e) => handleUpdateItem(index, 'issuer', e.target.value)}
                placeholder="Bay Area Tech Summit"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Date</label>
              <input
                type="text"
                value={item.date || ''}
                onChange={(e) => handleUpdateItem(index, 'date', e.target.value)}
                placeholder="Oct 2023"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Description (Optional)</label>
              <textarea
                rows={2}
                value={item.description || ''}
                onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                placeholder="Brief context or competition details..."
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85] resize-none"
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
        <span>Add Achievement / Award</span>
      </button>
    </div>
  );
};
