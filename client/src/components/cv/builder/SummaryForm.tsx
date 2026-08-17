import React from 'react';

interface Props {
  summary: string;
  objective?: string;
  onChangeSummary: (summary: string) => void;
  onChangeObjective?: (objective: string) => void;
}

export const SummaryForm: React.FC<Props> = ({ summary, objective = '', onChangeSummary, onChangeObjective }) => {
  return (
    <div className="space-y-4 font-sans text-xs">
      <div>
        <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
          Professional Summary
        </label>
        <textarea
          rows={4}
          value={summary || ''}
          onChange={(e) => onChangeSummary(e.target.value)}
          placeholder="Briefly describe your career background, core competencies, and key professional accomplishments..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none resize-none transition-all"
        />
      </div>

      {onChangeObjective && (
        <div>
          <label className="block text-[#555555] font-semibold uppercase text-[10px] tracking-wider mb-1">
            Career Objective (Optional)
          </label>
          <textarea
            rows={2}
            value={objective || ''}
            onChange={(e) => onChangeObjective(e.target.value)}
            placeholder="Specify your immediate career goals or target roles..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:border-[#4F6B85] focus:ring-1 focus:ring-[#4F6B85] focus:outline-none resize-none transition-all"
          />
        </div>
      )}
    </div>
  );
};
