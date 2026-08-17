import React from 'react';
import { CertificationItem } from '../../../types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  items: CertificationItem[];
  onChange: (items: CertificationItem[]) => void;
}

export const CertificationsForm: React.FC<Props> = ({ items = [], onChange }) => {
  const handleAddItem = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      organization: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: ''
    };
    onChange([...items, newItem]);
  };

  const handleUpdateItem = (index: number, field: keyof CertificationItem, value: any) => {
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
              Certification #{index + 1}
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
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Certification Name *</label>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => handleUpdateItem(index, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Issuing Organization *</label>
              <input
                type="text"
                value={item.organization || ''}
                onChange={(e) => handleUpdateItem(index, 'organization', e.target.value)}
                placeholder="Amazon Web Services"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Issue Date</label>
              <input
                type="text"
                value={item.issueDate || ''}
                onChange={(e) => handleUpdateItem(index, 'issueDate', e.target.value)}
                placeholder="Mar 2023"
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs focus:outline-none focus:border-[#4F6B85]"
              />
            </div>

            <div>
              <label className="block text-[#555555] font-semibold text-[10px] mb-1">Expiration Date (Optional)</label>
              <input
                type="text"
                value={item.expiryDate || ''}
                onChange={(e) => handleUpdateItem(index, 'expiryDate', e.target.value)}
                placeholder="Mar 2026 / No Expiration"
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
        <span>Add Certification</span>
      </button>
    </div>
  );
};
