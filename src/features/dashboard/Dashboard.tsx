import { useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Canvas from '../canvas/Canvas';
import ThemePromptInput from '../theme-interpreter/ThemePromptInput';
import { useCanvas } from '../../contexts/CanvasContext';

export default function Dashboard() {
  const { addElement } = useCanvas();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Add demo elements to the canvas when clicking the demo button
  const addDemoElements = () => {
    // Add color element
    addElement('color', { color: '#3b82f6' }, { x: 100, y: 100, width: 200, height: 150 });
    
    // Add text element
    addElement(
      'text',
      {
        text: 'Mood Board Title',
        fontFamily: 'Inter',
        fontSize: '24px',
        color: '#111827',
      },
      { x: 350, y: 100, width: 300, height: 80 }
    );
    
    // Add typography element
    addElement(
      'typography',
      { fontFamily: 'Montserrat' },
      { x: 100, y: 300, width: 250, height: 150 }
    );
    
    // Add a mock image (in a real app, we would use actual images)
    addElement(
      'image',
      {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=300&q=80',
        alt: 'Abstract colors',
      },
      { x: 400, y: 300, width: 300, height: 200 }
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 lg:mb-0">
              AI-Powered Mood Board
            </h1>
            
            <div className="flex space-x-2">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? 'Hide Tools' : 'Show Tools'}
              </button>
              
              <button 
                type="button"
                className="btn-primary"
                onClick={addDemoElements}
              >
                Add Demo Elements
              </button>
            </div>
          </div>
          
          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-3 xl:col-span-1 mb-6 lg:mb-0">
              <ThemePromptInput />
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Board Controls
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Board Background
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {['#ffffff', '#f3f4f6', '#374151', '#111827', '#fef2f2', '#ecfdf5'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          className="aspect-square rounded-md border border-gray-300 dark:border-gray-700"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Board Size
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        className="btn-outline py-1.5 text-sm"
                      >
                        Instagram Post
                      </button>
                      <button
                        type="button"
                        className="btn-outline py-1.5 text-sm"
                      >
                        Pinterest Pin
                      </button>
                      <button
                        type="button"
                        className="btn-outline py-1.5 text-sm"
                      >
                        A4 Document
                      </button>
                      <button
                        type="button"
                        className="btn-outline py-1.5 text-sm"
                      >
                        Custom Size
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 xl:col-span-2 h-[600px] flex">
              <Canvas />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 