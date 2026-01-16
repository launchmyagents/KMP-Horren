import React, { useState } from 'react';
import { useCartStore } from '../store';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, User, MapPin, ChevronRight, Lock, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';

export const Checkout: React.FC = () => {
    const { items, total, clearCart } = useCartStore();
    const totalPrice = total();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    // Form state
    const [paymentMethod, setPaymentMethod] = useState('ideal');

    if (items.length === 0) {
        return <Navigate to="/cart" />;
    }

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulate API call / Payment processing
        setTimeout(() => {
            clearCart();
            // Generate a random order ID like KMP-2024-XXXX
            const orderId = 'KMP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
            navigate('/order-success', { state: { orderId } });
        }, 2000);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12 font-sans">
            <div className="container mx-auto px-4">
                {/* Progress Bar */}
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-bold uppercase tracking-wide">
                    <Link to="/cart" className="hover:text-kmp-blue transition-colors">Winkelwagen</Link>
                    <ChevronRight size={14} />
                    <span className="text-kmp-blue">Gegevens & Betaling</span>
                    <ChevronRight size={14} />
                    <span>Bevestiging</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Form */}
                    <div className="lg:col-span-7">
                        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
                            
                            {/* Personal Details */}
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="text-xl font-black text-kmp-blue uppercase mb-6 flex items-center gap-3">
                                    <div className="bg-kmp-orange/10 p-2 rounded-md text-kmp-orange"><User size={20} /></div>
                                    Uw Gegevens
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-kmp-blue uppercase">Voornaam</label>
                                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-colors" placeholder="Jan" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-kmp-blue uppercase">Achternaam</label>
                                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-colors" placeholder="Jansen" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-kmp-blue uppercase">Emailadres</label>
                                        <input required type="email" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-colors" placeholder="jan@voorbeeld.nl" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-kmp-blue uppercase">Telefoonnummer</label>
                                        <input required type="tel" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-colors" placeholder="06 12345678" />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="text-xl font-black text-kmp-blue uppercase mb-6 flex items-center gap-3">
                                    <div className="bg-kmp-orange/10 p-2 rounded-md text-kmp-orange"><MapPin size={20} /></div>
                                    Afleveradres
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                                    <div className="space-y-2 md:col-span-4">
                                        <label className="text-xs font-bold text-kmp-blue uppercase">Straatnaam</label>
                                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-colors" placeholder="Kerkstraat" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-kmp-blue uppercase">Huisnummer</label>
                                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-colors" placeholder="10" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-kmp-blue uppercase">Postcode</label>
                                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-colors" placeholder="1234 AB" />
                                    </div>
                                    <div className="space-y-2 md:col-span-4">
                                        <label className="text-xs font-bold text-kmp-blue uppercase">Plaats</label>
                                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-md focus:border-kmp-orange focus:ring-1 focus:ring-kmp-orange outline-none transition-colors" placeholder="Amsterdam" />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="text-xl font-black text-kmp-blue uppercase mb-6 flex items-center gap-3">
                                    <div className="bg-kmp-orange/10 p-2 rounded-md text-kmp-orange"><CreditCard size={20} /></div>
                                    Betaalmethode
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'ideal' ? 'border-kmp-orange bg-orange-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <input type="radio" name="payment" value="ideal" checked={paymentMethod === 'ideal'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-kmp-orange focus:ring-kmp-orange" />
                                        <span className="font-bold text-kmp-blue">iDEAL</span>
                                        <div className="ml-auto flex gap-2">
                                            {/* Bank icons placeholder */}
                                            <div className="w-8 h-6 bg-slate-200 rounded"></div>
                                            <div className="w-8 h-6 bg-slate-200 rounded"></div>
                                        </div>
                                    </label>
                                    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-kmp-orange bg-orange-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-kmp-orange focus:ring-kmp-orange" />
                                        <span className="font-bold text-kmp-blue">Creditcard</span>
                                        <div className="ml-auto flex gap-2">
                                            <div className="w-8 h-6 bg-slate-200 rounded"></div>
                                            <div className="w-8 h-6 bg-slate-200 rounded"></div>
                                        </div>
                                    </label>
                                    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'bancontact' ? 'border-kmp-orange bg-orange-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                                        <input type="radio" name="payment" value="bancontact" checked={paymentMethod === 'bancontact'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-kmp-orange focus:ring-kmp-orange" />
                                        <span className="font-bold text-kmp-blue">Bancontact / Mister Cash</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                                <div className="bg-kmp-blue p-6 text-white border-b-4 border-kmp-orange">
                                    <h3 className="font-black text-xl uppercase tracking-wider">Bestelling</h3>
                                </div>
                                <div className="p-6 max-h-[400px] overflow-y-auto space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                                            <div className="w-16 h-16 bg-slate-100 rounded-md overflow-hidden shrink-0">
                                                <img src={item.product.image} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-kmp-blue text-sm uppercase">{item.product.name}</h4>
                                                    <span className="font-bold text-slate-600 text-sm">€{item.totalPrice.toFixed(2)}</span>
                                                </div>
                                                <div className="text-xs text-slate-500 mt-1">
                                                    {item.configuration.widthMm} x {item.configuration.heightMm} mm
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-slate-50 p-6 border-t border-slate-100">
                                    <div className="flex justify-between text-slate-600 text-sm font-medium mb-2">
                                        <span>Subtotaal</span>
                                        <span>€ {totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-kmp-orange text-sm font-bold mb-4">
                                        <span>Verzending</span>
                                        <span>Gratis</span>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-slate-200 pt-4 mb-1">
                                        <span className="font-black text-kmp-blue uppercase">Totaal</span>
                                        <span className="font-black text-2xl text-kmp-blue">€ {totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="text-xs text-slate-400 text-right mb-6">Inclusief 21% BTW</div>
                                    
                                    <Button 
                                        type="submit" 
                                        form="checkout-form" 
                                        size="lg" 
                                        className="w-full text-lg h-14"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="animate-spin mr-2" /> Verwerken...
                                            </>
                                        ) : (
                                            <>
                                                <Lock size={18} className="mr-2" /> Bestelling Plaatsen
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl text-slate-500 text-sm">
                                <ShieldCheck size={24} className="text-kmp-orange shrink-0" />
                                <p className="leading-tight">Uw gegevens worden veilig verwerkt via een versleutelde verbinding.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};