import React from 'react';
import { Staff, Service } from '../types';
import { Card, Button } from './ui';
import { STAFF } from '../constants';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';

interface Props {
  selectedStaff: Staff | null;
  selectedService: Service;
  onSelect: (staff: Staff | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const StaffSelection: React.FC<Props> = ({ selectedStaff, selectedService, onSelect, onNext, onBack }) => {
  // Filter staff that can perform the selected service
  const availableStaff = STAFF.filter(s => s.specialties.includes(selectedService.id));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Select Professional</h2>
        <p className="text-neutral-500">Who would you like to see for your {selectedService.name}?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* "Any Professional" Option */}
        <Card
          selected={selectedStaff === null}
          onClick={() => onSelect(null)}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-400">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-medium text-neutral-900">Any Available</h4>
            <p className="text-sm text-neutral-500">Maximum availability</p>
          </div>
        </Card>

        {availableStaff.map(staff => (
          <Card
            key={staff.id}
            selected={selectedStaff?.id === staff.id}
            onClick={() => onSelect(staff)}
            className="flex items-center gap-4"
          >
            <img 
              src={staff.avatarUrl} 
              alt={staff.name} 
              className="w-12 h-12 rounded-full object-cover border border-neutral-200"
            />
            <div>
              <h4 className="font-medium text-neutral-900">{staff.name}</h4>
              <p className="text-sm text-neutral-500">{staff.role}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-8 flex justify-between">
        <Button onClick={onBack} variant="ghost" className="pl-0 hover:pl-0 hover:bg-transparent hover:text-neutral-400">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={onNext}>
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StaffSelection;
