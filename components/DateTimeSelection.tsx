import React, { useState, useMemo } from 'react';
import { TimeSlot } from '../types';
import { Button } from './ui';
import { TIME_SLOTS } from '../constants';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

interface Props {
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (slot: TimeSlot) => void;
  onNext: () => void;
  onBack: () => void;
}

const DateTimeSelection: React.FC<Props> = ({ 
  selectedDate, 
  selectedTimeSlot, 
  onSelectDate, 
  onSelectTime, 
  onNext, 
  onBack 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar days
  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    
    // Fill previous month padding
    const firstDayIndex = date.getDay(); // 0 is Sunday
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentMonth]);

  const changeMonth = (offset: number) => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    setCurrentMonth(newMonth);
  };

  const isSelected = (date: Date) => {
    return selectedDate && 
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex flex-col gap-2 pb-4 border-b border-neutral-200/60">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Date & Time</h2>
        <p className="text-neutral-500 text-lg">When works best for you?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calendar */}
        <div className="bg-neutral-100 rounded-2xl border border-neutral-200/50 shadow-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-neutral-900">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-2">
              <button onClick={() => changeMonth(-1)} className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-400 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => changeMonth(1)} className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-400 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center mb-4">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <span key={d} className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2 gap-x-1">
            {daysInMonth.map((date, i) => {
              if (!date) return <div key={`empty-${i}`} />;
              
              const isPast = date < new Date(new Date().setHours(0,0,0,0));
              const selected = isSelected(date);
              
              return (
                <button
                  key={date.toISOString()}
                  disabled={isPast}
                  onClick={() => onSelectDate(date)}
                  className={`
                    h-10 w-10 mx-auto rounded-xl flex items-center justify-center text-sm font-medium transition-all relative
                    ${selected 
                      ? 'bg-neutral-900 text-neutral-50 shadow-lg shadow-neutral-900/20' 
                      : isPast 
                        ? 'text-neutral-300 cursor-not-allowed'
                        : 'text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900'
                    }
                    ${!selected && isToday(date) ? 'text-purple-400 font-bold bg-purple-500/10' : ''}
                  `}
                >
                  {date.getDate()}
                  {selected && <div className="absolute -bottom-1 w-1 h-1 bg-neutral-50 rounded-full opacity-50" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className={`space-y-6 transition-all duration-500 ${selectedDate ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4 pointer-events-none'}`}>
          <div className="flex items-center gap-2 text-neutral-900 pb-2 border-b border-neutral-200/60">
            <Clock className="w-5 h-5 text-neutral-500" />
            <h3 className="font-bold">Available Slots</h3>
            {selectedDate && <span className="text-neutral-500 font-normal ml-auto text-sm">{selectedDate.toLocaleDateString()}</span>}
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
            {TIME_SLOTS.map((time, i) => {
              const isBooked = i === 3 || i === 8; 
              const isSel = selectedTimeSlot?.id === time;
              
              return (
                <button
                  key={time}
                  disabled={isBooked}
                  onClick={() => onSelectTime({ id: time, label: time, available: true })}
                  className={`
                    py-3 px-2 rounded-xl text-sm font-semibold transition-all border
                    ${isSel 
                      ? 'bg-neutral-900 text-neutral-50 border-neutral-900 shadow-md transform scale-[1.02]'
                      : isBooked
                        ? 'bg-neutral-50 text-neutral-300 border-transparent decoration-slice line-through'
                        : 'bg-neutral-100 text-neutral-400 border-neutral-200 hover:border-neutral-400 hover:text-neutral-900 hover:shadow-sm'
                    }
                  `}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-between">
        <Button onClick={onBack} variant="outline" className="border-0 bg-transparent shadow-none hover:bg-neutral-200 text-neutral-500">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={onNext} disabled={!selectedDate || !selectedTimeSlot}>
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DateTimeSelection;
