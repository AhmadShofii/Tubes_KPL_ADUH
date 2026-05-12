export default function Footer() {
  return (
    <footer className="bg-white mt-16 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-[#1A2E1A] mb-3">Foodora</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Bringing the soul of Indonesian heritage kitchens to your modern
            doorstep.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-[#1A2E1A] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#1A2E1A] transition-colors">
                Partner with Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#1A2E1A] transition-colors">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-[#1A2E1A] transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#1A2E1A] transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>support@foodora.id</li>
            <li>WhatsApp Business</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        © 2024 Foodora Indonesia. Fresh Heritage. Delivered.
      </div>
    </footer>
  );
}
