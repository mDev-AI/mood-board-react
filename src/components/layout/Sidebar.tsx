import { useState } from 'react';

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'elements' | 'colors' | 'typography' | 'textures'>('elements');
  
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-10 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:w-72`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Tools</h2>
            <button
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium text-center focus:outline-none ${
              activeTab === 'elements'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('elements')}
          >
            Elements
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium text-center focus:outline-none ${
              activeTab === 'colors'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('colors')}
          >
            Colors
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium text-center focus:outline-none ${
              activeTab === 'typography'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('typography')}
          >
            Typography
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium text-center focus:outline-none ${
              activeTab === 'textures'
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('textures')}
          >
            Textures
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'elements' && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Images</h3>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-md cursor-pointer hover:ring-2 hover:ring-primary-500 hover:ring-offset-1 dark:hover:ring-offset-gray-800 transition-all flex items-center justify-center border border-gray-300 dark:border-gray-600 group"
                  >
                    <svg aria-hidden="true" className="w-10 h-10 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 transition-colors" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                    </svg>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <button
                  type="button"
                  className="w-full btn-outline text-sm py-1.5"
                >
                  Load More Images
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Color Palette</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-md bg-primary-500" />
                  <div className="text-sm text-gray-700 dark:text-gray-300">Primary</div>
                  <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">#0ea5e9</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-md bg-secondary-500" />
                  <div className="text-sm text-gray-700 dark:text-gray-300">Secondary</div>
                  <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">#8b5cf6</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-md bg-accent-500" />
                  <div className="text-sm text-gray-700 dark:text-gray-300">Accent</div>
                  <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">#f97316</div>
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 pt-4">Suggested Palettes</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((palette) => (
                  <div key={palette} className="flex space-x-1 cursor-pointer hover:opacity-90 transition-opacity">
                    <div className="flex-1 h-10 bg-blue-500 rounded-l-md" />
                    <div className="flex-1 h-10 bg-indigo-500" />
                    <div className="flex-1 h-10 bg-purple-500" />
                    <div className="flex-1 h-10 bg-pink-500" />
                    <div className="flex-1 h-10 bg-rose-500 rounded-r-md" />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'typography' && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Pairings</h3>
              <div className="space-y-4">
                {[
                  { heading: 'Inter', body: 'Roboto' },
                  { heading: 'Playfair Display', body: 'Source Sans Pro' },
                  { heading: 'Montserrat', body: 'Merriweather' },
                ].map((pair, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:border-primary-500 transition-colors"
                  >
                    <h4 style={{ fontFamily: pair.heading }} className="text-lg font-semibold mb-1">
                      {pair.heading}
                    </h4>
                    <p style={{ fontFamily: pair.body }} className="text-sm text-gray-600 dark:text-gray-400">
                      {pair.body} — The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'textures' && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Patterns & Textures</h3>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-md cursor-pointer hover:ring-2 hover:ring-primary-500 hover:ring-offset-1 dark:hover:ring-offset-gray-800 transition-all flex items-center justify-center border border-gray-300 dark:border-gray-600 group"
                  >
                    <svg aria-hidden="true" className="w-10 h-10 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 transition-colors" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.056a.957.957 0 01-.683 1.375c-.464.186-.993.041-1.32-.342l-.42-.63a1.125 1.125 0 00-1.879.205l-.175.525a1.125 1.125 0 01-1.879.205l-.175-.525a1.125 1.125 0 00-1.879-.205l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L3 21.125v-.568c0-.334-.148-.65-.405-.864l-1.068-.89a1.125 1.125 0 01-.216-1.49l.51-.766a2.25 2.25 0 011.161-.886l.143-.048a1.107 1.107 0 00.57-1.664c-.369-.555-.169-1.307.427-1.605L9 12.875l-.423-1.056a.957.957 0 01.683-1.375c.464-.186.993.041 1.32.342l.42.63.973-.292a1.125 1.125 0 00.39-1.969l-.42-.63a1.125 1.125 0 01.39-1.969l.973.292.42.63a1.125 1.125 0 001.969-.39l-.175-.525a1.125 1.125 0 01.205-1.879l.175-.525a1.125 1.125 0 00.205-1.879l-.175-.525a1.125 1.125 0 01-.205-1.879l-.175-.525a1.125 1.125 0 00-.205-1.879l.175-.525a1.125 1.125 0 01.39-1.969l-.973.292-.42-.63zM21.75 3.03v.568c0 .334-.148.65-.405.864l-1.068.89c-.442.369-.535 1.01-.216 1.49l.51.766c.242.363.242.863 0 1.225l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L15 13.125l.423 1.056a.957.957 0 01-.683 1.375c-.464.186-.993.041-1.32-.342l-.42-.63a1.125 1.125 0 00-1.879.205l-.175.525a1.125 1.125 0 01-1.879.205l-.175-.525a1.125 1.125 0 00-1.879-.205l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 21.125v-.568c0-.334.148-.65.405-.864l1.068-.89a1.125 1.125 0 01.216-1.49l-.51-.766a2.25 2.25 0 01-1.161-.886l-.143-.048a1.107 1.107 0 00-.57-1.664c-.369-.555-.169-1.307.427-1.605L15 12.875l-.423-1.056a.957.957 0 01.683-1.375c.464-.186.993.041 1.32.342l.42.63.973-.292a1.125 1.125 0 00.39-1.969l-.42-.63a1.125 1.125 0 01.39-1.969l.973.292.42.63a1.125 1.125 0 001.969-.39l-.175-.525a1.125 1.125 0 01.205-1.879l.175-.525a1.125 1.125 0 00.205-1.879l-.175-.525a1.125 1.125 0 01-.205-1.879l-.175-.525a1.125 1.125 0 00-.205-1.879l.175-.525a1.125 1.125 0 01.39-1.969l-.973.292-.42-.63z"></path>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            className="w-full btn-primary py-2"
          >
            Apply to Board
          </button>
        </div>
      </div>
    </div>
  );
} 