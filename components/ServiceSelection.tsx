import React, { useState } from 'react';
import { Service } from '../types';
import { Card, Button } from './ui';
import { SERVICES } from '../constants';
import { Sparkles, ArrowRight, Loader2, Check } from 'lucide-react';
import { recommendService } from '../services/geminiService';

interface Props {
  selectedService: Service | null;
  onSelect: (service: Service) => void;
  onNext: () => void;
}

const ServiceSelection: React.FC<Props> = ({ selectedService, onSelect, onNext }) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [suggestionId, setSuggestionId] = useState<string | null>(null);

  const handleAiAsk = async () => {
    if (!aiPrompt.trim()) return;
    setIsThinking(true);
    setSuggestionId(null);
    
    try {
      const recommendedId = await recommendService(aiPrompt);
      if (recommendedId) {
        setSuggestionId(recommendedId);
        const service = SERVICES.find(s => s.id === recommendedId);
        if (service) {
          onSelect(service);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsThinking(false);
    }
  };

  // Group services
  const categories = Array.from(new Set(SERVICES.map(s => s.category)));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2 pb-4 border-b border-neutral-200">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Select Service</h2>
        <p className="text-neutral-500 text-lg">Choose a treatment to begin your journey.</p>
      </div>

      {/* AI Assistant */}
      <div className="bg-neutral-100 p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-neutral-400">
          <div className="p-1.5 bg-neutral-200 rounded-md">
             <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <span>AI Assistant</span>
        </div>
        <div className="flex gap-3">
          <input 
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
            placeholder="Tell us about your needs (e.g. 'Back pain relief')..."
            className="flex-1 text-sm bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-900 focus:border-purple-500 text-neutral-900 placeholder:text-neutral-500 transition-all font-medium"
          />
          <Button 
            onClick={handleAiAsk} 
            disabled={isThinking || !aiPrompt.trim()}
            variant="secondary"
            className="shrink-0 rounded-xl"
          >
            {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ask'}
          </Button>
        </div>
      </div>

      {/* Categories & Services */}
      <div className="space-y-10">
        {categories.map(category => (
          <div key={category} className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">{category}</h3>
            <div className="grid grid-cols-1 gap-3">
              {SERVICES.filter(s => s.category === category).map(service => {
                const isSelected = selectedService?.id === service.id;
                const isRecommended = suggestionId === service.id;
                
                return (
                  <Card 
                    key={service.id} 
                    selected={isSelected}
                    onClick={() => onSelect(service)}
                    className={`
                      relative flex items-center justify-between group
                      ${isRecommended ? 'ring-2 ring-purple-500 border-purple-500' : ''}
                    `}
                  >
                    {isRecommended && (
                      <span className="absolute -top-3 left-4 bg-purple-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                        Recommended
                      </span>
                    )}
                    
                    <div className="flex-1 pr-6">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-neutral-900 text-lg">{service.name}</h4>
                        <span className="px-2 py-0.5 bg-neutral-200 text-neutral-500 text-[10px] font-bold uppercase rounded-md tracking-wide">
                          {service.durationMin} min
                        </span>
                      </div>
                      <p className="text-sm text-neutral-400 font-medium leading-relaxed max-w-lg">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-center gap-1 pl-4 border-l border-neutral-200">
                      <span className="text-lg font-bold text-neutral-900">${service.price}</span>
                      {isSelected ? (
                         <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-neutral-50" />
                         </div>
                      ) : (
                         <div className="w-6 h-6 rounded-full border-2 border-neutral-300 group-hover:border-neutral-500 transition-colors" />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-neutral-100 to-transparent pt-8 pb-4 flex justify-end">
        <Button 
          onClick={onNext} 
          disabled={!selectedService}
          className="w-full md:w-auto shadow-xl"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelection;
