import { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('Services');

  const tabs = {
    Services: [
      { title: 'Editing', desc: 'Comprehensive editing services' },
      { title: 'SEO', desc: 'SEO-focused content and copywriting' },
      // ... other services
    ],
    // ... other tabs
  };

  return (
    <section id="about" className="py-24 bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-2/5 mb-12 md:mb-0">
            <img 
              src="/images/My.jpg" 
              alt="Profile" 
              className="rounded-xl w-full shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold text-white mb-8 uppercase tracking-wider animate-fadeIn">
              About Me
            </h2>
            
            <p className="mb-8 text-lg">
              {/* Your about text */}
            </p>

            <div className="flex space-x-8 mb-8">
              {Object.keys(tabs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xl font-semibold relative pb-2 transition-colors duration-300
                    ${activeTab === tab ? 'text-pink-600' : 'text-gray-400 hover:text-pink-600'}
                    after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] 
                    after:bg-pink-600 after:transition-all after:duration-300
                    ${activeTab === tab ? 'after:w-full' : 'after:w-0'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="animate-fadeIn">
              {tabs[activeTab]?.map((item, index) => (
                <div 
                  key={item.title}
                  className="pl-6 border-l-4 border-pink-600 mb-6"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h3 className="text-pink-600 font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 