import React, { useState } from 'react';
import { Step, BookingState } from './types';
import { Button } from './components/ui';
import ServiceSelection from './components/ServiceSelection';
import StaffSelection from './components/StaffSelection';
import DateTimeSelection from './components/DateTimeSelection';
import UserDetails from './components/UserDetails';
import Summary from './components/Summary';
import { Check } from 'lucide-react';

const App: React.FC = () => {
  const [booking, setBooking] = useState<BookingState>({
    step: Step.SERVICE,
    selectedService: null,
    selectedStaff: null,
    selectedDate: null,
    selectedTimeSlot: null,
    customerDetails: { name: '', email: '', phone: '', notes: '' }
  });

  const updateBooking = (updates: Partial<BookingState>) => {
    setBooking(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => updateBooking({ step: booking.step + 1 });
  const prevStep = () => updateBooking({ step: Math.max(0, booking.step - 1) });

  // Progress Bar Component (Internal)
  const ProgressSteps = () => {
    const steps = ['Service', 'Professional', 'Time', 'Details', 'Review'];
    return (
      <div className="flex items-center justify-between md:justify-start md:space-x-12 mb-12 border-b border-neutral-200 pb-6 px-1">
        {steps.map((label, index) => {
          const isActive = index === booking.step;
          const isCompleted = index < booking.step;
          
          return (
            <div key={label} className={`flex items-center gap-3 ${index !== booking.step && 'hidden md:flex'}`}>
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${isActive ? 'bg-neutral-900 text-neutral-50 shadow-lg shadow-neutral-900/20' : ''}
                  ${isCompleted ? 'bg-neutral-200 text-neutral-900' : 'bg-transparent border border-neutral-300 text-neutral-500'}
                  ${!isActive && !isCompleted ? '' : ''}
                `}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className={`
                text-sm font-semibold tracking-wide
                ${isActive ? 'text-neutral-900' : 'text-neutral-500'}
              `}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderStep = () => {
    switch (booking.step) {
      case Step.SERVICE:
        return (
          <ServiceSelection 
            selectedService={booking.selectedService}
            onSelect={(s) => updateBooking({ selectedService: s })}
            onNext={nextStep}
          />
        );
      case Step.STAFF:
        return (
          <StaffSelection
            selectedStaff={booking.selectedStaff}
            selectedService={booking.selectedService!}
            onSelect={(s) => updateBooking({ selectedStaff: s })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case Step.DATETIME:
        return (
          <DateTimeSelection
            selectedDate={booking.selectedDate}
            selectedTimeSlot={booking.selectedTimeSlot}
            onSelectDate={(d) => updateBooking({ selectedDate: d })}
            onSelectTime={(t) => updateBooking({ selectedTimeSlot: t })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case Step.DETAILS:
        return (
          <UserDetails
            data={booking.customerDetails}
            onChange={(field, value) => 
              updateBooking({ customerDetails: { ...booking.customerDetails, [field]: value } })
            }
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case Step.CONFIRMATION:
        return (
          <Summary
            state={booking}
            onConfirm={() => {
              alert("Booking Confirmed! (This is a demo)");
              setBooking({
                step: Step.SERVICE,
                selectedService: null,
                selectedStaff: null,
                selectedDate: null,
                selectedTimeSlot: null,
                customerDetails: { name: '', email: '', phone: '', notes: '' }
              });
            }}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans flex items-center justify-center p-4 md:p-8">
      
      <div className="w-full max-w-6xl bg-neutral-100 rounded-3xl shadow-xl shadow-neutral-900/10 overflow-hidden border border-neutral-200 flex flex-col md:flex-row min-h-[600px] md:min-h-[750px]">
        
        {/* Sidebar */}
        <div className="bg-neutral-50 border-r border-neutral-200 p-8 md:p-10 md:w-80 lg:w-96 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center shadow-lg shadow-neutral-900/20">
                <span className="text-neutral-50 font-bold font-serif text-xl">L</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-900">Lumière</h1>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold leading-tight text-neutral-900">
                Book your <br/>
                <span className="text-neutral-500">next session.</span>
              </h2>
              <div className="w-12 h-1 bg-neutral-900 rounded-full"></div>
              <p className="text-neutral-500 text-sm font-medium leading-relaxed">
                Seamlessly schedule appointments with our top professionals. A tranquil experience starts here.
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="p-4 bg-neutral-100 rounded-xl border border-neutral-200 shadow-sm">
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-500">?</div>
                 <div className="text-sm font-bold text-neutral-900">Need Help?</div>
               </div>
               <p className="text-xs text-neutral-500 font-medium">Call us at +1 (555) 000-0000</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto bg-neutral-100">
          <div className="max-w-2xl mx-auto h-full flex flex-col">
            <ProgressSteps />
            <div className="flex-1">
              {renderStep()}
            </div>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default App;
