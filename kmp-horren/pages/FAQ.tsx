import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const FAQS: FAQItem[] = [
    // Producten
    { category: 'Producten', question: 'Wat is het verschil tussen een inzethor en een voorzet-inzethor?', answer: 'Een inzethor klemt zichzelf vast in het kozijn door middel van een veerconstructie, ideaal voor draai-kiep ramen. Een voorzet-inzethor wordt op het kozijn geplaatst als er te weinig inbouwdiepte is voor een normale inzethor.' },
    { category: 'Producten', question: 'Welk type gaas moet ik kiezen?', answer: 'Standaard gaas is prima voor normale insectenwering. Heeft u hooikoorts? Kies dan voor anti-pollengaas. Heeft u huisdieren? Dan raden wij extra sterk petscreen gaas aan.' },
    { category: 'Producten', question: 'Zijn de horren geschikt voor kunststof kozijnen?', answer: 'Ja, onze inzethorren zijn speciaal ontwikkeld voor kunststof, aluminium en houten draai-kiep kozijnen en worden geplaatst zonder boren of schroeven.' },
    
    // Meten & Monteren
    { category: 'Meten & Monteren', question: 'Hoe moet ik mijn raam opmeten?', answer: 'Voor een inzethor meet u de dagmaat: de strakke opening van het kozijn in de breedte en hoogte. Bekijk onze uitgebreide meetinstructies of gebruik onze AI-hulp op de homepagina.' },
    { category: 'Meten & Monteren', question: 'Doen jullie ook inmeten?', answer: 'Ja, wij bieden een inmeetservice aan voor €49,- (gratis bij bestellingen boven €750). Onze adviseur komt dan bij u thuis om alles exact op te meten.' },
    
    // Bestellen & Levering
    { category: 'Bestellen & Levering', question: 'Wat is de levertijd?', answer: 'Omdat wij alles op maat maken in onze eigen fabriek, is de levertijd gemiddeld 10 tot 15 werkdagen.' },
    { category: 'Bestellen & Levering', question: 'Kan ik mijn bestelling retourneren?', answer: 'Omdat het maatwerk betreft, is retourneren helaas niet mogelijk, tenzij er sprake is van een productiefout. Wij raden daarom aan de maten goed te controleren.' },
];

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const categories = Array.from(new Set(FAQS.map(f => f.category)));

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-kmp-blue text-white py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Veelgestelde Vragen</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Antwoorden op de meest voorkomende vragen over onze horren, het inmeten en de levering.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl">
                {categories.map((category, catIndex) => (
                    <div key={catIndex} className="mb-12">
                        <h2 className="text-xl font-black text-kmp-blue uppercase mb-6 flex items-center gap-3 border-b border-slate-200 pb-2">
                            <span className="text-kmp-orange">#</span> {category}
                        </h2>
                        <div className="space-y-4">
                            {FAQS.map((faq, index) => {
                                if (faq.category !== category) return null;
                                const isOpen = openIndex === index;
                                return (
                                    <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
                                        <button 
                                            onClick={() => toggle(index)}
                                            className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                        >
                                            <span className="font-bold text-kmp-blue text-lg pr-4">{faq.question}</span>
                                            {isOpen ? <ChevronUp className="text-kmp-orange shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0" />}
                                        </button>
                                        {isOpen && (
                                            <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4 animate-in slide-in-from-top-2 fade-in">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="bg-kmp-blue/5 border border-kmp-blue/10 rounded-xl p-8 text-center mt-12">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-kmp-orange shadow-sm mx-auto mb-4">
                        <HelpCircle size={32} />
                    </div>
                    <h3 className="font-black text-xl text-kmp-blue uppercase mb-2">Staat uw vraag er niet tussen?</h3>
                    <p className="text-slate-600 mb-6">Neem contact op met onze klantenservice of start een chat met onze AI-adviseur.</p>
                    <Link to="/contact">
                        <Button>Contact Opnemen</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};