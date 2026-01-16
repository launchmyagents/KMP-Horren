import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Check, ArrowRight, Printer, Mail } from 'lucide-react';
import { Button } from '../components/Button';

export const OrderSuccess: React.FC = () => {
    const location = useLocation();
    const state = location.state as { orderId: string } | null;

    if (!state) {
        return <Navigate to="/" />;
    }

    return (
        <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="bg-white p-12 rounded-2xl shadow-xl border border-slate-100 text-center">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
                        <Check size={48} className="text-white" strokeWidth={4} />
                    </div>
                    
                    <h1 className="text-4xl font-black text-kmp-blue uppercase mb-4 tracking-tight">Bedankt voor uw bestelling!</h1>
                    <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
                        We hebben uw bestelling succesvol ontvangen. U ontvangt binnen enkele minuten een bevestiging per e-mail.
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10 max-w-sm mx-auto">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ordernummer</div>
                        <div className="text-3xl font-mono font-bold text-kmp-blue tracking-wider">{state.orderId}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
                        <div className="flex flex-col items-center p-4 bg-blue-50/50 rounded-lg">
                            <Mail className="text-kmp-blue mb-2" />
                            <span className="text-sm font-bold text-kmp-blue">Bevestiging verstuurd</span>
                            <span className="text-xs text-slate-500">Check uw inbox</span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-orange-50/50 rounded-lg">
                            <Printer className="text-kmp-orange mb-2" />
                            <span className="text-sm font-bold text-kmp-orange">Factuur</span>
                            <span className="text-xs text-slate-500">In de bijlage</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/">
                            <Button size="lg" className="w-full sm:w-auto">
                                Terug naar Home
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Klantenservice
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};