import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Configurator } from '../components/Configurator';
import { Check, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '../components/Button';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-black text-kmp-blue mb-6 uppercase">Product niet gevonden</h1>
            <Link to="/products">
                <Button variant="outline">Terug naar overzicht</Button>
            </Link>
        </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
                <Link to="/" className="hover:text-kmp-orange transition-colors">Home</Link>
                <span>/</span>
                <Link to="/products" className="hover:text-kmp-orange transition-colors">Producten</Link>
                <span>/</span>
                <span className="text-kmp-blue">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left: Info */}
                <div className="lg:col-span-7 space-y-10">
                    <div>
                        <Link to="/products" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-kmp-orange mb-6 transition-colors uppercase tracking-wide">
                            <ArrowLeft size={16} className="mr-2"/> Terug
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-black text-kmp-blue uppercase leading-none tracking-tight mb-6">{product.name}</h1>
                        <p className="text-xl text-slate-600 font-light leading-relaxed max-w-2xl">{product.description}</p>
                    </div>
                    
                    <div className="relative aspect-[16/10] bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm group">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 right-4 bg-kmp-orange text-white text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-sm rounded-md">
                            Best Seller
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 border border-slate-200 shadow-sm rounded-xl">
                            <h3 className="font-black text-kmp-blue uppercase tracking-wide mb-6 border-b border-slate-100 pb-2">Product Specificaties</h3>
                            <ul className="space-y-4">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-700">
                                        <div className="mt-1 bg-kmp-blue/5 p-1 text-kmp-blue rounded-md">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span className="font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 bg-white p-4 border border-slate-200 rounded-xl">
                                <ShieldCheck size={32} className="text-kmp-orange shrink-0" strokeWidth={1.5} />
                                <div>
                                    <div className="font-bold text-kmp-blue uppercase text-sm">3 Jaar Garantie</div>
                                    <div className="text-xs text-slate-500">Op constructie en onderdelen</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-4 border border-slate-200 rounded-xl">
                                <Truck size={32} className="text-kmp-orange shrink-0" strokeWidth={1.5} />
                                <div>
                                    <div className="font-bold text-kmp-blue uppercase text-sm">Gratis Bezorging</div>
                                    <div className="text-xs text-slate-500">Bij bestellingen vanaf €250,-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Configurator */}
                <div className="lg:col-span-5 sticky top-24">
                    <Configurator product={product} />
                </div>
            </div>
        </div>
    </div>
  );
};