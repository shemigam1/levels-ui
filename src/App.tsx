import  { useState } from 'react';
import { BookingProvider } from './context/BookingContext';
import { Header, PackageSelection, RegistrationForm } from './routes/register';


export default function App() {
  const [currentStep, setCurrentStep] = useState<'packages' | 'register'>('packages');

  const handleNext = () => {
    setCurrentStep('register');
  };

  const handlePrevious = () => {
    setCurrentStep('packages');
  };

  const handleSubmit = () => {
    alert('Registration completed successfully!');
    setCurrentStep('packages');
  };

  return (
    <BookingProvider>
      <Header/>
      {currentStep === 'packages' ? (
        <PackageSelection onNext={handleNext} />
      ) : (
        <RegistrationForm onPrevious={handlePrevious} onSubmit={handleSubmit} />
      )}
    </BookingProvider>
  );
}
