import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { AIChat } from './components/AIChat';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { PRODUCTS } from './constants';
import { ProductType } from './types';
import { Button } from './components/Button';

interface ProductsListProps {
  title?: string;
  description?: string;
  filterType?: ProductType;
}

const ProductsList: React.FC<ProductsListProps> = ({ 
  title = "Ons Assortiment", 
  description = "Ontdek onze hoogwaardige collectie horren. Op maat gemaakt voor ieder type raam en deur.", 
  filterType 
}) => {
    const filteredProducts = filterType 
        ? PRODUCTS.filter(p => p.type === filterType)
        : PRODUCTS;

    return (
    <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-2xl mx-auto mb-16">
                 <h1 className="text-5xl font-black text-kmp-blue uppercase mb-6 tracking-tight">{title}</h1>
                 <p className="text-slate-500 text-lg">{description}</p>
            </div>
           
            {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xl text-slate-400 font-medium">Nog geen producten gevonden in deze categorie.</p>
                    <div className="mt-6">
                        <a href="#/products">
                            <Button variant="outline">Bekijk alle producten</Button>
                        </a>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {filteredProducts.map(p => (
                         <div key={p.id} className="border border-slate-100 bg-white p-0 shadow-sm hover:shadow-2xl transition duration-500 group flex flex-col rounded-xl overflow-hidden">
                            <div className="overflow-hidden h-64 bg-slate-50 relative">
                                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
                                <div className="absolute top-0 left-0 bg-kmp-blue text-white text-xs font-bold px-4 py-2 uppercase tracking-widest rounded-br-lg">
                                    {p.type === 'WINDOW' ? 'Raam' : 'Deur'}
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="font-black text-2xl mb-3 text-kmp-blue uppercase group-hover:text-kmp-orange transition-colors">{p.name}</h3>
                                <p className="text-slate-500 mb-8 leading-relaxed line-clamp-2">{p.description}</p>
                                <div className="mt-auto">
                                    <a href={`#/products/${p.slug}`}>
                                        <Button className="w-full" variant="secondary">Bekijk & Configureer</Button>
                                    </a>
                                </div>
                            </div>
                         </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    );
};

const Footer = () => (
    <footer className="bg-kmp-blue text-white pt-20 pb-10 mt-auto border-t-4 border-kmp-orange font-sans">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
                <h3 className="font-black text-2xl mb-6 uppercase tracking-wider">KMP<span className="text-kmp-orange">Horren</span></h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    De specialist in maatwerk insectenwering. Kwaliteit van Nederlandse bodem, direct geleverd uit eigen fabriek.
                </p>
                <div className="flex gap-4">
                    {/* Social placeholders */}
                    <div className="w-8 h-8 bg-white/10 hover:bg-kmp-orange transition-colors cursor-pointer rounded-md"></div>
                    <div className="w-8 h-8 bg-white/10 hover:bg-kmp-orange transition-colors cursor-pointer rounded-md"></div>
                </div>
            </div>
            <div>
                <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">Producten</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                    <li><a href="#/products/windows" className="hover:text-kmp-orange transition-colors">Raamhorren</a></li>
                    <li><a href="#/products/doors" className="hover:text-kmp-orange transition-colors">Hordeuren</a></li>
                    <li><a href="#/products" className="hover:text-kmp-orange transition-colors">Alle producten</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">Service</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                    <li><a href="#/contact" className="hover:text-kmp-orange transition-colors">Inmeetservice</a></li>
                    <li><a href="#/contact" className="hover:text-kmp-orange transition-colors">Montage instructies</a></li>
                    <li><a href="#/contact" className="hover:text-kmp-orange transition-colors">Garantie & Reparatie</a></li>
                    <li><a href="#/faq" className="hover:text-kmp-orange transition-colors">Veelgestelde vragen</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">Contact</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-3">
                        <span className="text-white font-bold min-w-[60px]">Tel:</span> 
                        <span>+31 6 43 06 50 41</span>
                    </li>
                    <li className="flex items-start gap-3">
                         <span className="text-white font-bold min-w-[60px]">Email:</span> 
                         <span>Info@kozijnmontagepartners.nl</span>
                    </li>
                    <li className="flex items-start gap-3">
                         <span className="text-white font-bold min-w-[60px]">Adres:</span> 
                         <span>100land 111<br/>2676 LT, Maasdijk</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto px-4 pt-8 border-t border-white/10 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>&copy; 2026 KMP Horren. Alle rechten voorbehouden.</div>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white">Algemene Voorwaarden</a>
                <a href="#" className="hover:text-white">Privacy Policy</a>
            </div>
        </div>
    </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/products" element={<ProductsList />} />
            
            <Route 
                path="/products/windows" 
                element={
                    <ProductsList 
                        title="Raamhorren" 
                        description="De perfecte oplossing voor elk type raam. Van draai-kiep tot dakraam, perfect op maat gemaakt." 
                        filterType={ProductType.WINDOW} 
                    />
                } 
            />
            
            <Route 
                path="/products/doors" 
                element={
                    <ProductsList 
                        title="Deurhorren" 
                        description="Houd insecten buiten en frisse lucht binnen met onze luxe hordeuren. Geschikt voor schuifpuien en openslaande deuren." 
                        filterType={ProductType.DOOR} 
                    />
                } 
            />

            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <AIChat />
      </div>
    </Router>
  );
};

export default App;