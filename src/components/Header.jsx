import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full h-screen bg-gradient-to-br from-black/70 to-black/70 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <img 
            src="/images/logo_Muneeb.jpg" 
            alt="Logo" 
            className="w-40 transition-transform hover:scale-110 duration-300"
          />
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="text-white text-lg hover:text-pink-600 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-[3px] after:w-0 hover:after:w-full after:bg-pink-600 after:transition-all"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars text-2xl" />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-pink-600 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          {/* Mobile menu content */}
        </div>

        <div className="text-center mt-[20vh] animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Muneeb Ur Rehman
            <span className="block text-crimson font-serif mt-2">
              Solidity Smart Contract Developer
            </span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header; 