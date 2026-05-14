

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-6 md:px-12 flex items-center shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-8 max-w-6xl mx-auto w-full">
        <div className="text-[#135029] text-2xl font-bold tracking-tight">Foodora</div>
        <div className="hidden md:flex gap-6 text-sm text-gray-500 font-medium">
          <a href="#" className="hover:text-gray-800">Home</a>
          <a href="#" className="hover:text-gray-800">Promos</a>
          <a href="#" className="hover:text-gray-800">History</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;