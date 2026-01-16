import React from 'react';
import { useCartStore } from '../store';
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { COLORS, MESH_TYPES, PROFILES } from '../constants';

export const Cart: React.FC = () => {
  const { items, removeItem, total, clearCart } = useCartStore();
  const totalPrice = total();
  const hasItems = items.length > 0;

  // Helper to find name by ID
  const getColorName = (id: string) => COLORS.find(c => c.id === id)?.name || id;
  const getMeshName = (id: string) => MESH_TYPES.find(m => m.id === id)?.name || id;
  const getProfileName = (id: string) => PROFILES.find(p => p.id === id)?.depthMm + 'mm' || id;

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end gap-4 mb-10 border-b border-slate-200 pb-6">
            <h1 className="text-4xl font-black text-kmp-blue uppercase tracking-tight">Winkelwagen</h1>
            <span className="text-slate-500 font-bold mb-2">{items.length} Producten</span>
        </div>

        {!hasItems ? (
          <div className="bg-white border border-slate-200 p-16 text-center shadow-sm max-w-2xl mx-auto rounded-xl">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <ShoppingBag size={40} />
            </div>
            <h2 className="text-xl font-bold text-kmp-blue uppercase mb-4">Je winkelwagen is leeg</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Stel eenvoudig je horren samen met onze configurator en voeg ze toe aan je bestelling.</p>
            <Link to="/">
              <Button size="lg">Start met Configureren</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-8 group hover:border-kmp-orange/30 transition-colors rounded-xl">
                  <div className="w-full sm:w-32 h-32 bg-slate-100 shrink-0 overflow-hidden border border-slate-200 rounded-lg">
                      <img src={item.product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                          <div>
                              <div className="text-xs font-bold text-kmp-orange uppercase tracking-wider mb-1">Maatwerk</div>
                              <h3 className="text-xl font-black text-kmp-blue uppercase">{item.product.name}</h3>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-kmp-orange transition-colors p-2 rounded-full hover:bg-slate-50">
                              <Trash2 size={20} />
                          </button>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-slate-600 mb-6 bg-slate-50 p-4 border border-slate-100 rounded-lg">
                          <div><span className="font-bold text-kmp-blue text-xs uppercase block opacity-70">Afmeting</span> {item.configuration.widthMm} x {item.configuration.heightMm} mm</div>
                          <div><span className="font-bold text-kmp-blue text-xs uppercase block opacity-70">Oppervlakte</span> {item.areaM2.toFixed(2)} m²</div>
                          <div><span className="font-bold text-kmp-blue text-xs uppercase block opacity-70">Kleur</span> {getColorName(item.configuration.colorId)}</div>
                          <div><span className="font-bold text-kmp-blue text-xs uppercase block opacity-70">Gaas</span> {getMeshName(item.configuration.meshId)}</div>
                          <div><span className="font-bold text-kmp-blue text-xs uppercase block opacity-70">Profiel</span> {getProfileName(item.configuration.profileId)}</div>
                          {item.configuration.montageService && <div className="text-kmp-orange font-bold flex items-center gap-1 col-span-2 sm:col-span-1"><ShieldCheck size={14}/> + Montage</div>}
                      </div>

                      <div className="flex justify-end">
                        <div className="text-2xl font-black text-kmp-blue">€ {item.totalPrice.toFixed(2)}</div>
                      </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-200 shadow-xl sticky top-24 rounded-xl overflow-hidden">
                  <div className="bg-kmp-blue text-white p-6">
                    <h3 className="font-black text-xl uppercase tracking-wider">Overzicht</h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                      <div className="flex justify-between text-slate-600 text-sm font-medium">
                          <span>Subtotaal ({items.length} items)</span>
                          <span className="font-bold text-kmp-blue">€ {totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-kmp-orange text-sm font-bold border-b border-slate-100 pb-4">
                          <span>Verzending</span>
                          <span>Gratis</span>
                      </div>

                      <div className="flex justify-between items-end py-4">
                          <span className="font-black text-kmp-blue text-lg uppercase">Totaal</span>
                          <span className="font-black text-3xl text-kmp-blue">€ {totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-slate-400 text-right mb-6">Inclusief BTW</div>

                      <Link to="/checkout" className="block w-full">
                          <Button className="w-full text-lg py-6" size="lg">
                              Afrekenen <ArrowRight size={20} className="ml-2"/>
                          </Button>
                      </Link>
                      
                      <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide mt-6">
                          <ShieldCheck size={16} /> Veilig betalen met iDEAL
                      </div>
                  </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};