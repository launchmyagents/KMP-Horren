import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setSubmitted(true);
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header / Hero */}
            <div className="bg-kmp-blue text-white py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                   <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Contact</h1>
                   <p className="text-xl text-slate-300 max-w-2xl font-light">
                       Heeft u vragen over onze producten of wilt u advies op maat? 
                       Ons team van specialisten staat voor u klaar.
                   </p>
                </div>
                 {/* Decorative background element similar to Home */}
                <div className="absolute right-0 top-0 w-1/3 h-full bg-[#1c263f] transform -skew-x-12 translate-x-20 opacity-50 hidden md:block"></div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        {/* Info Card */}
                        <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100">
                             <h3 className="text-xl font-black text-kmp-blue uppercase mb-6 flex items-center gap-2">
                                <span className="bg-kmp-orange/10 p-2 rounded-md text-kmp-orange"><MapPin size={20} /></span>
                                Gegevens
                             </h3>
                             <ul className="space-y-4 text-slate-600">
                                 <li className="flex items-start gap-3">
                                     <span className="font-bold text-kmp-blue min-w-[80px]">Adres:</span>
                                     <span>Industrieweg 10<br/>1234 AB, Amsterdam</span>
                                 </li>
                                 <li className="flex items-start gap-3">
                                     <span className="font-bold text-kmp-blue min-w-[80px]">Tel:</span>
                                     <a href="tel:0881234567" className="hover:text-kmp-orange transition-colors">088 - 123 45 67</a>
                                 </li>
                                 <li className="flex items-start gap-3">
                                     <span className="font-bold text-kmp-blue min-w-[80px]">Email:</span>
                                     <a href="mailto:info@kmp-horren.nl" className="hover:text-kmp-orange transition-colors">info@kmp-horren.nl</a>
                                 </li>
                                 <li className="flex items-start gap-3">
                                     <span className="font-bold text-kmp-blue min-w-[80px]">KVK:</span>
                                     <span>12345678</span>
                                 </li>
                             </ul>
                        </div>

                         {/* Hours Card */}
                         <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100">
                             <h3 className="text-xl font-black text-kmp-blue uppercase mb-6 flex items-center gap-2">
                                <span className="bg-kmp-orange/10 p-2 rounded-md text-kmp-orange"><Clock size={20} /></span>
                                Openingstijden
                             </h3>
                             <ul className="space-y-2 text-sm text-slate-600">
                                 <li className="flex justify-between border-b border-slate-50 pb-2">
                                     <span>Maandag - Vrijdag</span>
                                     <span className="font-bold text-kmp-blue">08:30 - 17:00</span>
                                 </li>
                                 <li className="flex justify-between border-b border-slate-50 pb-2 pt-2">
                                     <span>Zaterdag</span>
                                     <span className="font-bold text-kmp-blue">10:00 - 16:00</span>
                                 </li>
                                 <li className="flex justify-between pt-2">
                                     <span>Zondag</span>
                                     <span className="text-kmp-orange font-bold">Gesloten</span>
                                 </li>
                             </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-slate-100 h-full">
                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                                        <Send size={40} />
                                    </div>
                                    <h3 className="text-2xl font-black text-kmp-blue uppercase mb-2">Bedankt!</h3>
                                    <p className="text-slate-500 max-w-md">We hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.</p>
                                    <Button className="mt-8" onClick={() => setSubmitted(false)}>Nog een bericht sturen</Button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-black text-kmp-blue uppercase mb-2">Stuur een bericht</h3>
                                    <p className="text-slate-500 mb-8">Vul het formulier in en wij reageren binnen 1 werkdag.</p>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-kmp-blue uppercase">Naam</label>
                                                <input 
                                                    type="text" 
                                                    required
                                                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-all"
                                                    placeholder="Uw naam"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-kmp-blue uppercase">Email</label>
                                                <input 
                                                    type="email" 
                                                    required
                                                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-all"
                                                    placeholder="uw@email.nl"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-kmp-blue uppercase">Onderwerp</label>
                                            <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-all">
                                                <option>Advies over product</option>
                                                <option>Vraag over bestelling</option>
                                                <option>Inmeetservice aanvragen</option>
                                                <option>Garantie / Reparatie</option>
                                                <option>Overig</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-kmp-blue uppercase">Bericht</label>
                                            <textarea 
                                                required
                                                rows={6}
                                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-all resize-none"
                                                placeholder="Typ hier uw bericht..."
                                            ></textarea>
                                        </div>

                                        <Button type="submit" size="lg" className="w-full md:w-auto min-w-[200px]">
                                            Verstuur Bericht
                                        </Button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
             {/* FAQ Teaser */}
             <div className="container mx-auto px-4 mt-20">
                <div className="bg-kmp-blue/5 border border-kmp-blue/10 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-kmp-orange shadow-sm shrink-0">
                            <MessageSquare size={32} />
                        </div>
                        <div>
                            <h3 className="font-black text-xl text-kmp-blue uppercase mb-1">Veelgestelde vragen</h3>
                            <p className="text-slate-600">Bekijk onze FAQ voor snelle antwoorden op veelvoorkomende vragen.</p>
                        </div>
                    </div>
                    <Link to="/faq">
                        <Button variant="outline" className="shrink-0 bg-white">Bekijk FAQ</Button>
                    </Link>
                </div>
             </div>
        </div>
    );
};