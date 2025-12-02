import { useState } from 'react';
import { Header, PackageSelection, RegistrationForm } from './routes/register';
import { useNavigate } from '@tanstack/react-router'; // 1. Import navigation hook



export default function App() {
  const [currentStep, setCurrentStep] = useState<'packages' | 'register'>('packages');

  const navigate = useNavigate();


  const handleNext = () => {
    setCurrentStep('register');
  };

  const handlePrevious = () => {
    setCurrentStep('packages');
  };

  const handleSubmit = () => {
    navigate({ to: '/payment' });
  };

  return (
    <> 
      <Header/>
      {currentStep === 'packages' ? (
        <PackageSelection onNext={handleNext} />
      ) : (
        <RegistrationForm onPrevious={handlePrevious} onSubmit={handleSubmit} />
      )}
    </>
  );
}
