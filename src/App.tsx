import { useState } from "react";
import { PackageSelection, RegistrationForm } from "./routes/register";

export default function App() {
  const [currentStep, setCurrentStep] = useState<"packages" | "register" | "payment">(
    "packages"
  );

  const handleNext = () => setCurrentStep("register");

  const handlePrevious = () => setCurrentStep("packages");
  
  const handleSubmit = () => {
    alert("Registration completed successfully!");
    setCurrentStep("payment");
    
  };

  return (
    <>
      {currentStep === "packages" ? (
        <PackageSelection onNext={handleNext} />
      ) : (
        <RegistrationForm onPrevious={handlePrevious} onSubmit={handleSubmit} />
      )}
    </>
  );
}
