import React from 'react';
import { ShoppingCart, Menu, Phone, Check } from 'lucide-react';
import { useCartStore } from '../store';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const cartItems = useCartStore((state) => state.items);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path 
    ? "text-kmp-orange font-bold relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-kmp-orange after:rounded-full" 
    : "text-kmp-blue font-medium hover:text-kmp-orange transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm font-sans">
      {/* Top bar */}
      <div className="bg-kmp-blue text-white text-xs py-2.5 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"><Check size={14} className="text-kmp-orange" strokeWidth={3} /> Maatwerk uit eigen fabriek</span>
            <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"><Check size={14} className="text-kmp-orange" strokeWidth={3} /> Gratis verzending vanaf €250</span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <Phone size={14} className="text-kmp-orange" /> +31 6 43 06 50 41
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-kmp-orange flex items-center justify-center text-white rounded-md shadow-sm transition-transform group-hover:scale-105">
                {/* Abstract logo icon representing a corner or frame */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                    <path d="M4 20h16V4" />
                </svg>
            </div>
            <span className="text-2xl font-black tracking-tighter text-kmp-blue uppercase group-hover:opacity-90 transition-opacity">
              KMP<span className="font-light">Horren</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 uppercase text-sm tracking-wide">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/products/windows" className={isActive('/products/windows')}>Raamhorren</Link>
            <Link to="/products/doors" className={isActive('/products/doors')}>Deurhorren</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative group">
              <div className="p-2 group-hover:bg-slate-50 rounded-md transition-colors">
                <ShoppingCart size={26} className="text-kmp-blue group-hover:text-kmp-orange transition-colors" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-kmp-orange text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>
            <button className="md:hidden p-2 text-kmp-blue">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};