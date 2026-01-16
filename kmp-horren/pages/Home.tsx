import React from 'react';
import { Button } from '../components/Button';
import { ArrowRight, Check, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { VisualAnalyzer } from '../components/VisualAnalyzer';

export const Home: React.FC = () => {
  return (
    <div className="pb-20 bg-white">
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center bg-kmp-blue overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
             <div className="absolute right-0 top-0 w-1/2 h-full bg-[#1c263f] transform -skew-x-12 translate-x-20"></div>
             <img 
                src="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern window" 
                className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30 mix-blend-luminosity"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-kmp-blue via-kmp-blue/95 to-transparent z-10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 py-20">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-kmp-orange/10 border border-kmp-orange/20 px-4 py-2 text-kmp-orange text-sm font-bold uppercase tracking-wider mb-8 rounded-full">
                    <span className="w-2 h-2 bg-kmp-orange rounded-full"></span>
                    Nu met AI-Inmeethulp
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] uppercase tracking-tight">
                    Maatwerk horren<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Voor elk raam</span>
                </h1>
                <p className="text-xl text-slate-300 mb-10 max-w-xl font-light leading-relaxed">
                    De specialist in insectenwering. Bestel direct online uw inzethorren, hordeuren en rolhorren op maat. Gemaakt in onze eigen Nederlandse fabriek.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/products">
                        <Button size="lg" className="w-full sm:w-auto px-10">
                            Bekijk Producten <ArrowRight className="ml-2" size={20}/>
                        </Button>
                    </Link>
                    <Link to="/contact">
                         <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-kmp-blue">
                             Inmeetservice
                         </Button>
                    </Link>
                </div>
                
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-3 text-white/90">
                        <div className="p-1.5 bg-kmp-orange rounded-md"><Check size={16} strokeWidth={4} /></div>
                        <span className="font-semibold text-sm">Gratis Verzending</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                         <div className="p-1.5 bg-kmp-orange rounded-md"><Check size={16} strokeWidth={4} /></div>
                        <span className="font-semibold text-sm">3 Jaar Garantie</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                         <div className="p-1.5 bg-kmp-orange rounded-md"><Check size={16} strokeWidth={4} /></div>
                        <span className="font-semibold text-sm">Snelle Levering</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* AI Tool Section - Floating Card Style */}
      <section className="container mx-auto px-4 -mt-16 relative z-30">
          <VisualAnalyzer />
      </section>

      {/* Popular Products - Grid Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-black text-kmp-blue uppercase tracking-tight mb-2">Onze Collectie</h2>
                    <p className="text-slate-500 font-medium">Hoogwaardige oplossingen voor elke situatie.</p>
                </div>
                <Link to="/products" className="hidden md:flex items-center font-bold text-kmp-orange hover:text-kmp-blue transition-colors uppercase tracking-wide text-sm">
                    Alles bekijken <ArrowRight size={18} className="ml-2" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.map(product => (
                    <Link to={`/products/${product.slug}`} key={product.id} className="group block">
                        <div className="relative bg-slate-50 overflow-hidden border border-slate-100 transition-all duration-300 group-hover:shadow-xl group-hover:border-kmp-orange/20 h-full flex flex-col rounded-xl">
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-bold uppercase tracking-wider text-sm flex items-center">
                                        Configureren <ChevronRight size={16} className="ml-1 text-kmp-orange" />
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col border-t border-slate-100 bg-white">
                                <h3 className="font-bold text-xl text-kmp-blue mb-2 group-hover:text-kmp-orange transition-colors uppercase">{product.name}</h3>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs text-slate-400 font-semibold uppercase">Vanaf</span>
                                    <span className="text-lg font-black text-kmp-blue">€{product.minPrice},-</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
                <Button variant="outline" className="w-full">Alle Producten Bekijken</Button>
            </div>
        </div>
      </section>

      {/* Feature / USP Section */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-16 h-16 bg-white border border-slate-200 flex items-center justify-center text-kmp-orange shrink-0 mx-auto md:mx-0 shadow-sm rounded-2xl">
                          <Check size={32} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-black text-xl mb-2 text-kmp-blue uppercase">100% Maatwerk</h3>
                        <p className="text-slate-600 leading-relaxed">Geen standaardmaten, maar tot op de millimeter nauwkeurig geproduceerd in onze eigen Nederlandse fabriek.</p>
                      </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-16 h-16 bg-white border border-slate-200 flex items-center justify-center text-kmp-orange shrink-0 mx-auto md:mx-0 shadow-sm rounded-2xl">
                          <Star size={32} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-black text-xl mb-2 text-kmp-blue uppercase">Premium Kwaliteit</h3>
                        <p className="text-slate-600 leading-relaxed">Wij gebruiken uitsluitend hoogwaardig aluminium en UV-bestendig gaas voor een jarenlange levensduur.</p>
                      </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-16 h-16 bg-white border border-slate-200 flex items-center justify-center text-kmp-orange shrink-0 mx-auto md:mx-0 shadow-sm rounded-2xl">
                          <ShieldCheck size={32} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-black text-xl mb-2 text-kmp-blue uppercase">Uitstekende Service</h3>
                        <p className="text-slate-600 leading-relaxed">Van gratis kleurmonsters tot professionele inmeetservice en montage aan huis.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};