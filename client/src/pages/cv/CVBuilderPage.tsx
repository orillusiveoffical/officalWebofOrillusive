import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Download, 
  Eye, 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Languages, 
  Sliders, 
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { CVData } from '../../types/cv';
import { DEFAULT_INITIAL_CV } from '../../data/cvPresets';
import { TemplateRenderer } from '../../components/cv/templates/TemplateRenderer';
import { PersonalInfoForm } from '../../components/cv/builder/PersonalInfoForm';
import { SummaryForm } from '../../components/cv/builder/SummaryForm';
import { ExperienceForm } from '../../components/cv/builder/ExperienceForm';
import { EducationForm } from '../../components/cv/builder/EducationForm';
import { SkillsForm } from '../../components/cv/builder/SkillsForm';
import { ProjectsForm } from '../../components/cv/builder/ProjectsForm';
import { CertificationsForm } from '../../components/cv/builder/CertificationsForm';
import { LanguagesForm } from '../../components/cv/builder/LanguagesForm';
import { AchievementsForm } from '../../components/cv/builder/AchievementsForm';
import { CustomSectionsForm } from '../../components/cv/builder/CustomSectionsForm';
import { CustomizationPanel } from '../../components/cv/builder/CustomizationPanel';
import { GenerationConfirmModal } from '../../components/cv/GenerationConfirmModal';
import { LowCreditModal } from '../../components/cv/LowCreditModal';
import { CreditPurchaseModal } from '../../components/cv/CreditPurchaseModal';
import { downloadCVAsPDF, printOrExportCV } from '../../utils/pdfExport';
import { useAuth } from '../../context/AuthContext';

const GENERATION_COST = 5;

interface CVBuilderPageProps {
  onOpenAuth?: () => void;
}

export const CVBuilderPage: React.FC<CVBuilderPageProps> = ({ onOpenAuth }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, token, updateUserCredits } = useAuth();

  const [cvData, setCvData] = useState<CVData>(() => {
    const savedGuestDraft = localStorage.getItem('orillusive_guest_cv_draft');
    if (!id && savedGuestDraft) {
      try {
        return JSON.parse(savedGuestDraft);
      } catch (e) {
        // Fallback to default
      }
    }
    return DEFAULT_INITIAL_CV;
  });

  const [activeTab, setActiveTab] = useState<'info' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'achievements' | 'custom' | 'style'>('info');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('All changes saved');
  const [zoomScale, setZoomScale] = useState<number>(1);

  // Modals & Export Loading
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [confirmGenOpen, setConfirmGenOpen] = useState(false);
  const [lowCreditOpen, setLowCreditOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    try {
      await downloadCVAsPDF({ filename: cvData.title || 'My-Resume' });
    } catch (err) {
      console.error('PDF Export Error:', err);
    } finally {
      setDownloadingPDF(false);
    }
  };

  // Load CV from server or local state
  useEffect(() => {
    if (id && token) {
      fetchCV(id);
    }
  }, [id, token]);

  const fetchCV = async (cvId: string) => {
    try {
      const res = await fetch(`/api/cvs/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.cv) {
        setCvData(data.cv);
      }
    } catch (err) {
      console.warn('Using local draft');
    }
  };

  // Autosave logic
  const handleSave = async (updatedData: CVData = cvData) => {
    // Save to guest localStorage regardless of auth state
    localStorage.setItem('orillusive_guest_cv_draft', JSON.stringify(updatedData));

    if (!token) {
      setSaveStatus('Draft saved locally');
      return;
    }

    setSaving(true);
    setSaveStatus('Saving draft...');

    try {
      const url = updatedData._id ? `/api/cvs/${updatedData._id}` : '/api/cvs';
      const method = updatedData._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();

      if (res.ok && data.cv) {
        setCvData(data.cv);
        if (!updatedData._id && data.cv._id) {
          navigate(`/cv-maker/builder/${data.cv._id}`, { replace: true });
        }
        setSaveStatus('All changes saved');
      }
    } catch (err) {
      setSaveStatus('Draft saved locally');
    } finally {
      setSaving(false);
    }
  };

  const updateCv = (updater: (prev: CVData) => CVData) => {
    setCvData((prev) => {
      const next = updater(prev);
      handleSave(next);
      return next;
    });
  };

  // Handle Generation Request
  const handleStartGeneration = () => {
    if (!token || !user) {
      if (onOpenAuth) {
        onOpenAuth();
      } else {
        alert('Please sign in or create an account to generate and export your professional CV.');
      }
      return;
    }

    const userCredits = user?.credits ?? 0;
    if (userCredits < GENERATION_COST) {
      setLowCreditOpen(true);
    } else {
      setConfirmGenOpen(true);
    }
  };

  const handleOpenCreditsModal = () => {
    if (!token || !user) {
      if (onOpenAuth) {
        onOpenAuth();
      } else {
        alert('Please sign in or create an account to purchase credits.');
      }
      return;
    }
    setPurchaseModalOpen(true);
  };

  const handleConfirmGeneration = async () => {
    if (!token || !cvData._id) {
      await handleSave();
    }

    setGenerating(true);

    try {
      const saveRes = await fetch(cvData._id ? `/api/cvs/${cvData._id}` : '/api/cvs', {
        method: cvData._id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cvData)
      });
      const saveData = await saveRes.json();
      const targetCvId = saveData.cv?._id || cvData._id;

      const genRes = await fetch('/api/generation/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ cvId: targetCvId })
      });
      const genData = await genRes.json();

      if (!genRes.ok || !genData.success) {
        if (genRes.status === 402) {
          setConfirmGenOpen(false);
          setLowCreditOpen(true);
          return;
        }
        throw new Error(genData.error || 'Failed to generate CV');
      }

      updateUserCredits(genData.remainingCredits);
      setCvData((prev) => ({ ...prev, status: 'generated' }));
      setConfirmGenOpen(false);

      await downloadCVAsPDF({ filename: cvData.title || 'My-Resume' });
    } catch (err: any) {
      alert(err.message || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const userCredits = user?.credits ?? 25;

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111111] font-sans pt-0 pb-12">
      {/* Builder Top Bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-black/10 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="mx-auto max-w-[1500px] flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link
              to="/cv-maker/dashboard"
              className="p-2 rounded-full border border-black/10 hover:bg-[#F7F7F5] text-[#555555] transition-colors"
              title="Back to CV Dashboard"
            >
              <ArrowLeft className="size-4" />
            </Link>

            <div>
              <input
                type="text"
                value={cvData.title || ''}
                onChange={(e) => updateCv((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Untitled Resume"
                className="text-sm font-bold text-[#111111] bg-transparent focus:outline-none focus:border-b border-[#4F6B85]"
              />
              <div className="flex items-center gap-2 text-[10px] text-[#777777] font-mono">
                <span>{saveStatus}</span>
                {cvData.status === 'generated' && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 font-bold uppercase">
                    Generated
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Credits & Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-[#111111] text-white text-xs font-bold shadow-xs">
              <Sparkles className="size-3.5 text-[#C9A84C]" />
              <span>{userCredits} Credits</span>
              <button
                type="button"
                onClick={handleOpenCreditsModal}
                className="ml-1 text-[10px] uppercase font-bold text-[#C9A84C] hover:underline"
              >
                + Get Credits
              </button>
            </div>

            {cvData.status === 'generated' && (
              <button
                type="button"
                disabled={downloadingPDF}
                onClick={handleDownloadPDF}
                className="btn-sheen inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white border border-black/15 px-4 text-xs font-bold uppercase tracking-wider text-[#111111] hover:bg-[#F7F7F5] transition-all shadow-xs disabled:opacity-60"
              >
                {downloadingPDF ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin text-[#4F6B85]" />
                    <span>Rendering PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="size-3.5 text-[#4F6B85]" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              disabled={generating || downloadingPDF}
              onClick={handleStartGeneration}
              className="btn-sheen inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#111111] px-5 text-xs font-bold uppercase tracking-wider text-[#F7F7F5] hover:bg-[#2C1E16] hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Loader2 className="size-3.5 animate-spin text-[#C9A84C]" />
                  <span>Generating CV...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5 text-[#C9A84C]" />
                  <span>Generate CV ({GENERATION_COST} Credits)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Studio Layout */}
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Section Controls (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-black/10 p-5 shadow-xs space-y-4">
            
            {/* Section Switcher Tabs */}
            <div className="flex flex-wrap gap-1 p-1 rounded-2xl bg-[#F7F7F5] border border-black/5 text-[10px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'info' ? 'bg-white text-[#111111] shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <User className="size-3 text-[#4F6B85]" />
                <span>Info</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('summary')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'summary' ? 'bg-white text-[#111111] shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <FileText className="size-3 text-[#4F6B85]" />
                <span>Summary</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('experience')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'experience' ? 'bg-white text-[#111111] shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <Briefcase className="size-3 text-[#4F6B85]" />
                <span>Work</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('education')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'education' ? 'bg-white text-[#111111] shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <GraduationCap className="size-3 text-[#4F6B85]" />
                <span>Edu</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('skills')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'skills' ? 'bg-white text-[#111111] shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <Wrench className="size-3 text-[#4F6B85]" />
                <span>Skills</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'projects' ? 'bg-white text-[#111111] shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <FolderGit2 className="size-3 text-[#4F6B85]" />
                <span>Projects</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('certifications')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'certifications' ? 'bg-white text-[#111111] shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <Award className="size-3 text-[#4F6B85]" />
                <span>Certs</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('languages')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'languages' ? 'bg-white text-[#111111] shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <Languages className="size-3 text-[#4F6B85]" />
                <span>Lang</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('achievements')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'achievements' ? 'bg-white text-[#111111] shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <Award className="size-3 text-[#4F6B85]" />
                <span>Awards</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'custom' ? 'bg-white text-[#111111] shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <Sliders className="size-3 text-[#4F6B85]" />
                <span>Custom</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('style')}
                className={`py-1.5 px-2.5 rounded-xl transition-all flex items-center gap-1 ${
                  activeTab === 'style' ? 'bg-[#4F6B85] text-white shadow-2xs font-bold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                <Sliders className="size-3" />
                <span>Style</span>
              </button>
            </div>

            {/* Tab Form Views */}
            <div className="pt-2">
              {activeTab === 'info' && (
                <PersonalInfoForm
                  data={cvData.personalInfo}
                  onChange={(info) => updateCv((prev) => ({ ...prev, personalInfo: info }))}
                />
              )}

              {activeTab === 'summary' && (
                <SummaryForm
                  summary={cvData.summary}
                  objective={cvData.objective}
                  onChangeSummary={(sum) => updateCv((prev) => ({ ...prev, summary: sum }))}
                  onChangeObjective={(obj) => updateCv((prev) => ({ ...prev, objective: obj }))}
                />
              )}

              {activeTab === 'experience' && (
                <ExperienceForm
                  items={cvData.experience}
                  onChange={(exp) => updateCv((prev) => ({ ...prev, experience: exp }))}
                />
              )}

              {activeTab === 'education' && (
                <EducationForm
                  items={cvData.education}
                  onChange={(edu) => updateCv((prev) => ({ ...prev, education: edu }))}
                />
              )}

              {activeTab === 'skills' && (
                <SkillsForm
                  items={cvData.skills}
                  onChange={(sk) => updateCv((prev) => ({ ...prev, skills: sk }))}
                />
              )}

              {activeTab === 'projects' && (
                <ProjectsForm
                  items={cvData.projects}
                  onChange={(proj) => updateCv((prev) => ({ ...prev, projects: proj }))}
                />
              )}

              {activeTab === 'certifications' && (
                <CertificationsForm
                  items={cvData.certifications || []}
                  onChange={(cert) => updateCv((prev) => ({ ...prev, certifications: cert }))}
                />
              )}

              {activeTab === 'languages' && (
                <LanguagesForm
                  items={cvData.languages || []}
                  onChange={(lang) => updateCv((prev) => ({ ...prev, languages: lang }))}
                />
              )}

              {activeTab === 'achievements' && (
                <AchievementsForm
                  items={cvData.achievements || []}
                  onChange={(ach) => updateCv((prev) => ({ ...prev, achievements: ach }))}
                />
              )}

              {activeTab === 'custom' && (
                <CustomSectionsForm
                  items={cvData.customSections || []}
                  onChange={(custom) => updateCv((prev) => ({ ...prev, customSections: custom }))}
                />
              )}

              {activeTab === 'style' && (
                <CustomizationPanel
                  selectedTemplate={cvData.templateId}
                  customization={cvData.customization}
                  onSelectTemplate={(tId) => updateCv((prev) => ({ ...prev, templateId: tId }))}
                  onChangeCustomization={(cust) => updateCv((prev) => ({ ...prev, customization: cust }))}
                />
              )}
            </div>
          </div>

          {/* CENTER & RIGHT: Real-time A4 Live Preview (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs font-semibold text-[#666666]">
              <span className="flex items-center gap-1.5">
                <Eye className="size-4 text-[#4F6B85]" />
                <span>Live Real-Time A4 Preview</span>
              </span>

              {/* Interactive Zoom Controls */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-black/10 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.max(0.5, z - 0.1))}
                  className="p-1 text-[#555555] hover:text-[#111111] transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="size-3.5" />
                </button>
                <span className="font-mono text-[11px] font-bold text-[#111111] min-w-[42px] text-center">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.min(1.5, z + 0.1))}
                  className="p-1 text-[#555555] hover:text-[#111111] transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(1)}
                  className="p-1 text-[#555555] hover:text-[#111111] transition-colors ml-1 border-l border-black/10 pl-2"
                  title="Reset Zoom (100%)"
                >
                  <RotateCcw className="size-3" />
                </button>
              </div>
            </div>

            {/* Interactive A4 Document Container */}
            <div className="p-4 sm:p-8 rounded-3xl bg-[#EBEBE8] border border-black/10 overflow-x-auto flex justify-center min-h-[700px]">
              <div 
                id="cv-print-area" 
                className="w-full max-w-[800px] shadow-2xl rounded-xl overflow-hidden bg-white transition-transform duration-200"
                style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}
              >
                <TemplateRenderer data={cvData} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modals */}
      <CreditPurchaseModal
        isOpen={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        onSuccess={(newBal) => {
          updateUserCredits(newBal);
        }}
      />

      <LowCreditModal
        isOpen={lowCreditOpen}
        requiredCredits={GENERATION_COST}
        availableCredits={userCredits}
        onClose={() => setLowCreditOpen(false)}
        onOpenGetCredits={() => setPurchaseModalOpen(true)}
      />

      <GenerationConfirmModal
        isOpen={confirmGenOpen}
        cost={GENERATION_COST}
        currentBalance={userCredits}
        onClose={() => setConfirmGenOpen(false)}
        onConfirm={handleConfirmGeneration}
        loading={generating}
      />
    </div>
  );
};
