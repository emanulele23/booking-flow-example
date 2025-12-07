import React from 'react';
import { BookingState } from '../types';
import { Button, Input } from './ui';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  data: BookingState['customerDetails'];
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const UserDetails: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const isValid = data.name && data.email && data.phone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto lg:mx-0">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Your Details</h2>
        <p className="text-neutral-500">Where should we send the confirmation?</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Jane Doe"
          required
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="jane@example.com"
          required
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="+1 (555) 000-0000"
          required
        />
        <Input
          label="Additional Notes (Optional)"
          name="notes"
          value={data.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Any specific focus areas or allergies?"
          multiline
        />
      </div>

      <div className="bg-neutral-200/50 p-4 rounded-lg flex items-start gap-3 text-xs text-neutral-500 border border-neutral-200">
        <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
        <p>
          We respect your privacy. Your information is only used for appointment communication.
          Cancellations must be made 24 hours in advance.
        </p>
      </div>

      <div className="pt-8 flex justify-between">
        <Button type="button" onClick={onBack} variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent hover:text-neutral-400">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button type="submit" disabled={!isValid}>
          Review Booking <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
};

export default UserDetails;
