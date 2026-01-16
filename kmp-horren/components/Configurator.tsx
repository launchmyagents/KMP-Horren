import React, { useState, useEffect } from 'react';
import { Product, ColorOption, MeshOption, ProfileOption, Configuration } from '../types';
import { COLORS, MESH_TYPES, PROFILES, COSTS } from '../constants';
import { Button } from './Button';
import { Check, AlertCircle, Info, Ruler } from 'lucide-react';
import { useCartStore } from '../store';
import { useNavigate } from 'react-router-dom';

interface ConfiguratorProps {
  product: Product;
}

export const Configurator: React.FC<ConfiguratorProps> = ({ product }) => {
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);

  // State
  const [width, setWidth] = useState<number>(0); // mm
  const [height, setHeight] = useState<number>(0); // mm
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLORS[0]);
  const [selectedMesh, setSelectedMesh] = useState<MeshOption>(MESH_TYPES[0]);
  const [selectedProfile, setSelectedProfile] = useState<ProfileOption>(PROFILES[1]);
  const [montageService, setMontageService] = useState<boolean>(false);
  
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Constants derived from props
  const MIN_AREA = COSTS.minAreaM2; 

  useEffect(() => {
    calculatePrice();
  }, [width, height, selectedColor, selectedMesh, selectedProfile, montageService]);

  const calculatePrice = () => {
    // 1. Calculate Area
    const wCm = width / 10;
    const hCm = height / 10;
    const areaM2 = (wCm * hCm) / 10000;
    
    // 2. Apply Minimum Area logic
    const calcArea = Math.max(areaM2, MIN_AREA);

    // 3. Base Price
    let total = calcArea * product.basePricePerM2;

    // 4. Ensure min product price
    if (total < product.minPrice) total = product.minPrice;

    // 5. Add Surcharges (flat fees or per unit depending on business logic, here assumed flat for simplicity as per plan)
    total += selectedColor.surcharge;
    total += selectedMesh.surcharge;
    total += selectedProfile.surcharge;

    // 6. Service
    if (montageService) total += COSTS.montageService;

    setPrice(total);
  };

  const handleAddToCart = () => {
    if (width < 300 || height < 300) {
      setError("Minimale afmetingen zijn 300x300mm");
      return;
    }
    
    const config: Configuration = {
      widthMm: width,
      heightMm: height,
      colorId: selectedColor.id,
      meshId: selectedMesh.id,
      profileId: selectedProfile.id,
      montageService
    };

    const areaM2 = (width * height) / 1000000; // true m2

    addItem({
      id: Math.random().toString(36).substr(2, 9),
      product,
      configuration: config,
      totalPrice: price,
      areaM2
    });

    navigate('/cart');
  };

  return (
    <div className="bg-white border-2 border-slate-100 shadow-xl overflow-hidden rounded-xl">
      <div className="bg-kmp-blue text-white p-5 flex justify-between items-center border-b-4 border-kmp-orange">
          <span className="font-bold uppercase tracking-wider text-sm">Product Configurator</span>
          <span className="font-mono text-white/50 text-xs">ID: {product.slug.toUpperCase()}</span>
      </div>
      <div className="p-6 md:p-8 space-y-12">
        
        {/* Dimensions */}
        <section>
          <h3 className="text-sm font-black text-kmp-blue mb-6 uppercase tracking-widest flex items-center gap-3">
            <span className="bg-kmp-orange text-white w-6 h-6 flex items-center justify-center text-xs font-bold rounded-md">1</span>
            Maten invoeren
          </h3>
          <div className="bg-slate-50 p-6 border border-slate-200 rounded-lg">
            <div className="grid grid-cols-2 gap-8">
                <div>
                <label className="flex items-center gap-2 text-xs font-bold text-kmp-blue uppercase mb-3">
                    <Ruler size={14} className="text-kmp-orange"/> Breedte
                </label>
                <div className="relative group">
                    <input 
                        type="number" 
                        value={width || ''} 
                        onChange={(e) => { setWidth(Number(e.target.value)); setError(null); }}
                        className="w-full bg-white border-2 border-slate-200 p-4 font-mono text-xl font-bold text-kmp-blue focus:border-kmp-orange outline-none transition-all placeholder:text-slate-200 rounded-md"
                        placeholder="0000"
                        min="300"
                        max="3000"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold uppercase">mm</span>
                </div>
                </div>
                <div>
                <label className="flex items-center gap-2 text-xs font-bold text-kmp-blue uppercase mb-3">
                    <Ruler size={14} className="text-kmp-orange"/> Hoogte
                </label>
                <div className="relative group">
                    <input 
                        type="number" 
                        value={height || ''} 
                        onChange={(e) => { setHeight(Number(e.target.value)); setError(null); }}
                        className="w-full bg-white border-2 border-slate-200 p-4 font-mono text-xl font-bold text-kmp-blue focus:border-kmp-orange outline-none transition-all placeholder:text-slate-200 rounded-md"
                        placeholder="0000"
                        min="300"
                        max="3000"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold uppercase">mm</span>
                </div>
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center border-t border-slate-200 pt-3">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Minimaal: 300mm</span>
                {error && (
                    <span className="text-kmp-orange text-xs font-bold flex items-center gap-1 animate-pulse">
                    <AlertCircle size={14} /> {error}
                    </span>
                )}
            </div>
          </div>
        </section>

        {/* Colors */}
        <section>
          <h3 className="text-sm font-black text-kmp-blue mb-6 uppercase tracking-widest flex items-center gap-3">
            <span className="bg-kmp-orange text-white w-6 h-6 flex items-center justify-center text-xs font-bold rounded-md">2</span>
            Kleur profiel
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`group relative flex flex-col items-center p-4 border-2 transition-all duration-200 rounded-lg ${
                  selectedColor.id === color.id 
                    ? 'border-kmp-orange bg-white shadow-lg scale-105 z-10' 
                    : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-full border-4 border-white shadow-sm mb-3" 
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs font-black text-kmp-blue text-center uppercase tracking-tight">{color.name}</span>
                <span className="text-[10px] text-slate-400 font-mono mt-1">{color.ral}</span>
                
                {selectedColor.id === color.id && (
                  <div className="absolute top-2 right-2 text-kmp-orange bg-white rounded-full p-0.5 shadow-sm">
                    <Check size={14} strokeWidth={4} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Mesh */}
        <section>
          <h3 className="text-sm font-black text-kmp-blue mb-6 uppercase tracking-widest flex items-center gap-3">
            <span className="bg-kmp-orange text-white w-6 h-6 flex items-center justify-center text-xs font-bold rounded-md">3</span>
            Type Gaas
          </h3>
          <div className="space-y-3">
            {MESH_TYPES.map((mesh) => (
              <button
                key={mesh.id}
                onClick={() => setSelectedMesh(mesh)}
                className={`w-full flex items-center justify-between p-4 border-2 transition-all rounded-lg ${
                  selectedMesh.id === mesh.id
                    ? 'border-kmp-orange bg-white shadow-md'
                    : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 border-2 flex items-center justify-center rounded-md ${selectedMesh.id === mesh.id ? 'border-kmp-orange bg-kmp-orange text-white' : 'border-slate-300 bg-white'}`}>
                        {selectedMesh.id === mesh.id && <Check size={12} strokeWidth={4}/>}
                    </div>
                    <div className="text-left">
                        <div className="font-bold text-kmp-blue text-sm uppercase">{mesh.name}</div>
                        <div className="text-xs text-slate-500">{mesh.description}</div>
                    </div>
                </div>
                <div className="text-right">
                  {mesh.surcharge > 0 ? (
                    <span className="text-xs font-bold text-kmp-orange bg-orange-50 px-2 py-1 rounded">+€{mesh.surcharge}</span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Incl.</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>
        
        {/* Profile */}
         <section>
          <h3 className="text-sm font-black text-kmp-blue mb-6 uppercase tracking-widest flex items-center gap-3">
            <span className="bg-kmp-orange text-white w-6 h-6 flex items-center justify-center text-xs font-bold rounded-md">4</span>
            Profieldiepte
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROFILES.map((profile) => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile)}
                className={`p-4 border-2 text-left transition-all rounded-lg ${
                  selectedProfile.id === profile.id
                    ? 'border-kmp-orange bg-white shadow-md'
                    : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-kmp-blue text-lg">{profile.depthMm} <span className="text-sm font-normal text-slate-400">mm</span></span>
                    {profile.surcharge > 0 && <span className="text-xs text-kmp-orange font-bold">+€{profile.surcharge}</span>}
                </div>
                <div className="text-xs text-slate-500 font-medium">{profile.description}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Montage */}
        <section className="bg-kmp-blue/5 p-6 border-l-4 border-kmp-blue rounded-r-lg">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setMontageService(!montageService)}>
                <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 border-2 flex items-center justify-center transition-colors rounded-md ${montageService ? 'bg-kmp-blue border-kmp-blue text-white' : 'border-slate-300 bg-white'}`}>
                        {montageService && <Check size={16} strokeWidth={3} />}
                    </div>
                    <div>
                        <div className="font-black text-kmp-blue uppercase text-sm tracking-wide">Montage Service</div>
                        <div className="text-xs text-slate-500">Volledige ontzorging door onze specialisten</div>
                    </div>
                </div>
                <span className="font-bold text-kmp-blue">+€{COSTS.montageService.toFixed(2)}</span>
            </div>
        </section>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="bg-white border-t border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
        <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Totaalprijs (incl. BTW)</div>
            <div className="text-4xl font-black text-kmp-blue tracking-tight">€ {price.toFixed(2)}</div>
        </div>
        <Button 
            size="lg" 
            onClick={handleAddToCart}
            className="w-full sm:w-auto min-w-[240px] text-lg"
            disabled={!width || !height}
        >
            In Winkelwagen
        </Button>
      </div>
    </div>
  );
};