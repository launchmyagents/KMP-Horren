"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Gegevens", description: "Uw contactgegevens" },
  { id: 2, name: "Overzicht", description: "Controleer uw bestelling" },
  { id: 3, name: "Betaling", description: "Veilig afrekenen" },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
              "relative"
            )}
          >
            {step.id < currentStep ? (
              // Completed step
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-kmp-orange" />
                </div>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-kmp-orange">
                  <Check className="h-5 w-5 text-white" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : step.id === currentStep ? (
              // Current step
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-kmp-orange bg-white"
                  aria-current="step"
                >
                  <span className="text-kmp-orange font-bold">{step.id}</span>
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : (
              // Upcoming step
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span className="text-gray-500">{step.id}</span>
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            )}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span
                className={cn(
                  "text-sm font-medium",
                  step.id <= currentStep ? "text-kmp-blue" : "text-gray-500"
                )}
              >
                {step.name}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
