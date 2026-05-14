
const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-6 md:px-12 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-8 max-w-6xl mx-auto w-full">
        <div className="text-[#0D4A22] text-2xl font-bold tracking-tight">Foodora</div>
        <div className="hidden md:flex gap-6 text-sm text-gray-500 font-medium">
          <a href="#" className="hover:text-gray-800">Home</a>
          <a href="#" className="hover:text-gray-800">Promos</a>
          <a href="#" className="hover:text-gray-800">History</a>
        </div>
        <div className="ml-auto flex items-center gap-6">
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=FoodoraUser" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;