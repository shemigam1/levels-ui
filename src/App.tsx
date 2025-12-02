import { useState } from "react";
import { PackageSelection, RegistrationForm } from "./routes/register";

export default function App() {
  const [currentStep, setCurrentStep] = useState<"packages" | "register">(
    "packages"
  );

  const handleNext = () => setCurrentStep("register");
  const handlePrevious = () => setCurrentStep("packages");
  const handleSubmit = () => {
    alert("Registration completed successfully!");
    setCurrentStep("packages");
  };

  return (
    <>
      {currentStep === "packages" ? (
        <PackageSelection onNext={handleNext} />
      ) : (
        <RegistrationForm onPrevious={handlePrevious} onSubmit={handleSubmit} />
      )}
    </>
    </>
  );
}
