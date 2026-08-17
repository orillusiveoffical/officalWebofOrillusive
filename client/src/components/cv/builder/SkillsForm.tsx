import React from 'react';
import { SkillItem } from '../../../types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  items: SkillItem[];
  onChange: (items: SkillItem[]) => void;
}

export const SkillsForm: React.FC<Props> = ({ items = [], onChange }) => {
  const handleAddItem = () => {
    const newItem: SkillItem = {
      id: `sk-${Date.now()}`,
      name: '',
      level: 'Advanced',
      category: 'Technical'
    };
    onChange([...items, newItem]);
  };

  const handleUpdateItem = (index: number, field: keyof SkillItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3 font-sans text-xs">
      <div className="grid grid-cols-1 gap-2.5">
        {items.map((item, index) => (
          <div key={item.id || index} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-black/10">
            <input
              type="text"
              value={item.name || ''}
              onChange={(e) => handleUpdateItem(index, 'name', e.target.value)}
              placeholder="e.g. React & TypeScript"
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
            />

            <select
              value={item.level || 'Advanced'}
              onChange={(e) => handleUpdateItem(index, 'level', e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>

            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="text-[#888888] hover:text-red-600 p-1 transition-colors"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddItem}
        className="w-full py-2.5 rounded-2xl border-2 border-dashed border-black/15 text-[#4F6B85] hover:bg-[#4F6B85]/5 font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="size-4" />
        <span>Add Skill</span>
      </button>
    </div>
  );
};
