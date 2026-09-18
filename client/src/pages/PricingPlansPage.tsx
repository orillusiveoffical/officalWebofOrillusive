import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight, HelpCircle, Lock, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingPlansPage: React.FC = () => {
  const [annual, setAnnual] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'Essential UI patterns & code for individual designers & makers.',
      priceMonthly: 9,
      priceAnnual: 7,
      isPopular: false,
      features: [
        'Access to core curated UI library',
        'HTML/CSS & React source code downloads',
        'Authentic AI generation prompts',
        'Standard responsive preview controls',
        'Up to 50 saved designs',
        'Community support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Designer',
      tagline: 'Advanced UI systems & accelerated workflow for active product builders.',
      priceMonthly: 16,
      priceAnnual: 13,
      isPopular: true,
      features: [
        'Everything in Starter',
        'Extended premium UI systems & dashboards',
        'Full React & HTML code access',
        'Advanced prompt recipes with animation specs',
        'Early access to weekly releases',
        'Up to 500 saved designs',
        'Priority ticket support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Studio & Team',
      tagline: 'Unrestricted design power, token palette studio, and priority release access.',
      priceMonthly: 20,
      priceAnnual: 17,
      isPopular: false,
      features: [
        'Everything in Pro',
        'Unlimited design library access & future drops',
        'Live Token Palette Customization Studio',
        'Interactive sandbox variable presets',
        'Unlimited saved designs & collections',
        'Enterprise license for client projects',
        'Dedicated 1-on-1 design assistance'
      ]
    }
  ];

  const handleStartCheckout = (plan: any) => {
    setCheckoutPlan(plan);
    setPaymentSuccess(false);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111111] pb-24">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-xs font-semibold text-gray-700">
            <Sparkles size={13} className="text-amber-500" />
            <span>Fair, transparent pricing for serious designers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black">
            One subscription. <span className="text-[#4F6B85]">Infinite UI leverage.</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Stop recreating components from scratch. Get access to thousands of production-tested UI designs, complete React code, and authentic AI prompts.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-bold ${!annual ? 'text-black' : 'text-gray-400'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-12 h-6 bg-black rounded-full p-1 transition-colors relative"
            >
              <div
                className={`size-4 bg-white rounded-full transition-transform ${
                  annual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold ${annual ? 'text-black' : 'text-gray-400'}`}>
              Annual Billing <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 ml-1">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Plan Cards Matrix */}
      <main className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = annual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-8 shadow-sm flex flex-col justify-between transition-all ${
                  plan.isPopular
                    ? 'border-2 border-black shadow-xl relative scale-105 md:-translate-y-2'
                    : 'border border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] uppercase font-extrabold tracking-widest px-4 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-black">{plan.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 min-h-[32px] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-black">${price}</span>
                    <span className="text-xs text-gray-500 font-medium">/ month</span>
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Included in Plan:
                    </p>
                    <ul className="space-y-2.5 text-xs text-gray-700">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => handleStartCheckout(plan)}
                    className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs ${
                      plan.isPopular
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    }`}
                  >
                    Select {plan.name} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payoneer Gateway Trust Banner */}
        <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-black text-white">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-bold text-black text-sm">Secure Payoneer Global Payment Gateway</p>
              <p className="text-gray-500">Supports credit cards, international wire, and multi-currency billing worldwide.</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-gray-400">256-Bit SSL Encrypted</span>
        </div>

        {/* Feature Comparison Matrix */}
        <section className="mt-20 space-y-6">
          <h2 className="text-2xl font-bold text-black text-center">
            Detailed Plan Comparison
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-bold text-black">Feature / Capability</th>
                  <th className="p-4 font-bold text-black text-center">Starter ($9/mo)</th>
                  <th className="p-4 font-bold text-black text-center bg-gray-100/60">Pro ($16/mo)</th>
                  <th className="p-4 font-bold text-black text-center">Studio ($20/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4 font-medium text-black">Core UI Library Access</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  <td className="p-4 text-center text-emerald-600 font-bold bg-gray-50/60">✓ Included</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-black">React TSX Source Code</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  <td className="p-4 text-center text-emerald-600 font-bold bg-gray-50/60">✓ Included</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-black">Authentic AI Prompts</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ Included</td>
                  <td className="p-4 text-center text-emerald-600 font-bold bg-gray-50/60">✓ Included</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-black">Advanced Dashboards & Systems</td>
                  <td className="p-4 text-center text-gray-300">—</td>
                  <td className="p-4 text-center text-emerald-600 font-bold bg-gray-50/60">✓ Included</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-black">Live Token Palette Studio</td>
                  <td className="p-4 text-center text-gray-300">—</td>
                  <td className="p-4 text-center text-emerald-600 font-bold bg-gray-50/60">✓ Included</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ Included</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-black">Saved Designs Limit</td>
                  <td className="p-4 text-center text-gray-600">50 Designs</td>
                  <td className="p-4 text-center text-black font-semibold bg-gray-50/60">500 Designs</td>
                  <td className="p-4 text-center text-black font-semibold">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Payoneer Checkout Modal */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-md w-full p-8 shadow-2xl relative space-y-6">
            <div className="text-center space-y-2">
              <div className="size-12 rounded-2xl bg-black mx-auto flex items-center justify-center text-white">
                <CreditCard size={20} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4F6B85]">
                Payoneer Secure Checkout
              </span>
              <h3 className="text-2xl font-bold text-black">
                Upgrade to {checkoutPlan.name}
              </h3>
              <p className="text-xs text-gray-500">
                Amount: <strong className="text-black">${annual ? checkoutPlan.priceAnnual * 12 : checkoutPlan.priceMonthly} USD</strong> ({annual ? 'Billed Annually' : 'Billed Monthly'})
              </p>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-6 space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 p-4">
                <div className="size-10 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-sm text-emerald-900">Subscription Activated!</h4>
                <p className="text-xs text-emerald-700">
                  Your account has been upgraded to {checkoutPlan.name}. All premium source codes and prompts are now unlocked.
                </p>
                <button
                  onClick={() => {
                    setCheckoutPlan(null);
                    setPaymentSuccess(false);
                  }}
                  className="mt-2 px-5 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold"
                >
                  Return to Library
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black">Cardholder / Account Name</label>
                  <input
                    type="text"
                    defaultValue="Alex Drake"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black">Card Number / Payoneer ID</label>
                  <input
                    type="text"
                    defaultValue="•••• •••• •••• 4242"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-black font-mono"
                  />
                </div>

                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isProcessing ? 'Processing Payment with Payoneer...' : `Confirm & Pay $${annual ? checkoutPlan.priceAnnual * 12 : checkoutPlan.priceMonthly}`}
                </button>

                <button
                  onClick={() => setCheckoutPlan(null)}
                  className="w-full py-2 text-xs text-gray-500 hover:text-black font-medium text-center"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
