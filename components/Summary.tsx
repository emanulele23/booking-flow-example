import React from 'react';
import { BookingState } from '../types';
import { Button } from './ui';
import { ArrowLeft, Check, Calendar, Clock, User, CheckCircle2 } from 'lucide-react';

interface Props {
  state: BookingState;
  onConfirm: () => void;
  onBack: () => void;
}

const Summary: React.FC<Props> = ({ state, onConfirm, onBack }) => {
  const { selectedService, selectedStaff, selectedDate, selectedTimeSlot, customerDetails } = state;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Review & Confirm</h2>
        <p className="text-neutral-500">Please verify your appointment details.</p>
      </div>

      <div className="bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        {/* Header - Service */}
        <div className="bg-neutral-200/50 p-6 border-b border-neutral-200">
           <h3 className="font-semibold text-lg text-neutral-900">{selectedService?.name}</h3>
           <p className="text-sm text-neutral-500">{selectedService?.durationMin} mins • ${selectedService?.price}</p>
        </div>

        {/* Body - Details */}
        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-neutral-200 rounded-lg text-neutral-500">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 uppercase">Date</p>
              <p className="text-neutral-900 font-medium">
                {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-neutral-200 rounded-lg text-neutral-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 uppercase">Time</p>
              <p className="text-neutral-900 font-medium">{selectedTimeSlot?.label}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-neutral-200 rounded-lg text-neutral-500">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 uppercase">Professional</p>
              <p className="text-neutral-900 font-medium">{selectedStaff ? selectedStaff.name : 'Any Available Professional'}</p>
            </div>
          </div>
          
           <div className="flex items-start gap-4 border-t border-neutral-200 pt-4">
            <div className="p-2 bg-neutral-200 rounded-lg text-neutral-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500 uppercase">Guest</p>
              <p className="text-neutral-900 font-medium">{customerDetails.name}</p>
              <p className="text-sm text-neutral-500">{customerDetails.email}</p>
              <p className="text-sm text-neutral-500">{customerDetails.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-between">
        <Button onClick={onBack} variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent hover:text-neutral-400">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={onConfirm} className="bg-neutral-900 text-neutral-50 hover:bg-neutral-800 px-8">
          Confirm Booking <Check className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Summary;
