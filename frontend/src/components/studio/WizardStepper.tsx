interface WizardStepperProps {
  steps: string[];
  currentStep: number;
  completedSteps?: number[];
}

export default function WizardStepper({ steps, currentStep, completedSteps = [] }: WizardStepperProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="flex items-center justify-between px-4 py-3 glass rounded-xl mb-6">
        <div>
          <div className="text-xs text-white/40">Step {currentStep + 1} of {steps.length}</div>
          <div className="text-sm font-bold text-white">{steps[currentStep]}</div>
        </div>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full transition-all"
              style={{ background: i === currentStep ? "hsl(44,96%,65%)" : completedSteps.includes(i) ? "hsl(142,70%,45%)" : "rgba(255,255,255,0.15)" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-0 mb-8 overflow-x-auto pb-2">
      {steps.map((step, i) => {
        const isDone = completedSteps.includes(i);
        const isCurrent = i === currentStep;
        const isFuture = i > currentStep && !isDone;
        return (
          <div key={i} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2
                ${isDone ? "border-green-500 bg-green-500/20 text-green-400" : isCurrent ? "border-amber-400 bg-amber-500/15 text-amber-400 shadow-lg" : "border-white/15 bg-white/5 text-white/30"}`}
                style={isCurrent ? { boxShadow: "0 0 20px rgba(251,191,36,0.3)" } : undefined}>
                {isDone ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] font-medium text-center max-w-[64px] leading-tight ${isCurrent ? "text-amber-400" : isDone ? "text-green-400" : "text-white/30"}`}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-12 h-0.5 mb-5 mx-1 flex-shrink-0 transition-all duration-300"
                style={{ background: isDone ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.08)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
