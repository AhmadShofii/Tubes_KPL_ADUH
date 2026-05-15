import { Link } from 'react-router-dom';

const VendorDetail = () => {
  return (
    <div className="min-h-screen bg-[#F6F5F0] font-sans text-gray-800 pb-10">
      {/* Navigation Bar */}
      <nav className="bg-white py-4 px-6 md:px-12 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="text-[#135029] text-2xl font-bold tracking-tight">Foodora</div>
          <div className="hidden md:flex gap-6 text-sm text-gray-500 font-medium">
            <a href="#" className="text-gray-800">Home</a>
            <a href="#">Promos</a>
            <a href="#">History</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>
          <button className="text-gray-600 hover:text-gray-900 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span className="absolute -top-2 -right-2 bg-[#B84018] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">2</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-gray-200 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-6">
        
        {/* Restaurant Banner */}
        <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-8 shadow-sm">
          {/* Placeholder image for restaurant background */}
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <div className="flex justify-between items-end">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#FF6B35] text-white text-xs font-semibold px-2 py-0.5 rounded">Partner</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    4.8 (500+ ratings)
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Dapur Amanda</h1>
                <div className="flex items-center gap-4 text-sm text-gray-200">
                  <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 20-30 min</span>
                  <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> 1.2 km</span>
                  <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"></path></svg> Indonesian Heritage</span>
                </div>
              </div>
              <button className="bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 hover:bg-gray-50 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Store Info
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Menu */}
          <div className="w-full lg:w-2/3">
            {/* Category Header */}
            <div className="bg-[#EAEBE8] px-6 py-3 rounded-lg mb-6">
              <h2 className="text-[#2F4D35] font-semibold">Signature Packages</h2>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <button className="bg-[#135029] text-white px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">All</button>
              <button className="bg-[#EAEBE8] text-gray-600 px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-300">Rice Sets</button>
              <button className="bg-[#EAEBE8] text-gray-600 px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-300">Sides</button>
              <button className="bg-[#EAEBE8] text-gray-600 px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-300">Drinks</button>
            </div>

            {/* Menu Items List */}
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 border border-gray-100">
                <div className="w-24 h-24 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#366847] text-6xl font-bold font-serif opacity-80">B</span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-gray-800 font-semibold mb-1">Paket B (Smoky Sate Ayam)</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">10 skewers of charcoal-grilled chicken breast glazed with sweet soy and chunky peanut sauce. Includes lontong.</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 sm:mt-0">
                    <span className="text-[#B84018] font-bold">Rp 38.000</span>
                    <button className="bg-[#135029] hover:bg-[#0c3a1d] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 border border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0 shadow-inner">
                   <span className="text-white text-6xl font-bold font-sans drop-shadow-md">A</span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-gray-800 font-semibold mb-1">Paket A (Heritage Rendang)</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Authentic beef rendang slow-cooked for 8 hours, served with jasmine rice, cassava leaves, and green chili sambal.</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[#B84018] font-bold">Rp 45.000</span>
                      <span className="text-gray-400 text-sm line-through">Rp 55.000</span>
                    </div>
                    <button className="bg-[#135029] hover:bg-[#0c3a1d] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 border border-gray-100">
                <div className="w-24 h-24 bg-[#111] rounded-lg flex flex-col items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-[#3FA8B5] border-[6px] border-[#225A62] shadow-lg"></div>
                  <span className="text-gray-500 text-[8px] tracking-widest mt-1">PAKET</span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-800 font-semibold">Paket C (Green Balance)</h3>
                      <span className="bg-green-100 text-[#135029] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Veggie</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">Tahu Tempe bacem set with stir-fry beans and signature spicy "kangkung" salad. Served with brown rice.</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 sm:mt-0">
                    <span className="text-[#B84018] font-bold">Rp 32.000</span>
                    <button className="bg-[#135029] hover:bg-[#0c3a1d] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cart */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              
              {/* Cart Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#135029]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  <h2 className="font-semibold text-gray-800">Cart</h2>
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-md">2 Items</span>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {/* Cart Item 1 */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center bg-gray-50 rounded px-1.5 py-1 h-fit">
                    <button className="text-gray-400 hover:text-green-700 font-bold leading-none">+</button>
                    <span className="text-sm font-semibold text-gray-800 my-1">1</span>
                    <button className="text-gray-400 hover:text-red-700 font-bold leading-none">-</button>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-gray-800">Paket A (Heritage Rendang)</h4>
                      <span className="text-sm font-semibold text-gray-800 whitespace-nowrap ml-2">Rp 45.000</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Extra Sambal Hijau</p>
                  </div>
                </div>

                {/* Cart Item 2 */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center bg-gray-50 rounded px-1.5 py-1 h-fit">
                    <button className="text-gray-400 hover:text-green-700 font-bold leading-none">+</button>
                    <span className="text-sm font-semibold text-gray-800 my-1">1</span>
                    <button className="text-gray-400 hover:text-red-700 font-bold leading-none">-</button>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-gray-800">Paket B (Smoky Sate)</h4>
                      <span className="text-sm font-semibold text-gray-800 whitespace-nowrap ml-2">Rp 38.000</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">No cucumber</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-800">Rp 83.000</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery Fee</span>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-gray-400 text-xs">Rp 12.000</span>
                    <span className="text-gray-800">Rp 0</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Service Fee</span>
                  <span className="text-gray-800">Rp 2.000</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#135029] font-bold text-lg">Total</span>
                  <span className="text-[#135029] font-bold text-lg">Rp 85.000</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-[#B84018] hover:bg-[#9a3513] text-white font-medium py-3 rounded-lg flex justify-center items-center gap-2 transition mb-3"
              >
                Checkout Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              
              <p className="text-center text-[10px] text-gray-400 font-medium tracking-wider mb-6">TAXES INCLUDED IN TOTAL</p>

              {/* Promo Badge */}
              <div className="bg-[#1A5023] rounded-lg p-3 flex items-start gap-3 text-white">
                <div className="mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Free Delivery applied!</h4>
                  <p className="text-[10px] text-gray-300">Promo code: AMANDAFRESH</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-[#F6F5F0] pt-12 pb-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <h2 className="text-[#135029] text-xl font-bold tracking-tight mb-4">Foodora</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Bringing the soul of Indonesian heritage kitchens to your modern doorstep.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 text-sm">Explore</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-800">About Us</a></li>
              <li><a href="#" className="hover:text-gray-800">Partner with Us</a></li>
              <li><a href="#" className="hover:text-gray-800">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4 text-sm">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-800">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-800">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4 text-sm">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="mailto:support@foodora.id" className="hover:text-gray-800">support@foodora.id</a></li>
              <li><a href="#" className="hover:text-gray-800">WhatsApp Business</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-left">
            © 2024 Foodora Indonesia. Fresh Heritage, Delivered.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default VendorDetail;