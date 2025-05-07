import { useRef, useEffect, useState } from 'react';
import { useCanvas } from '../../contexts/CanvasContext';
import CanvasElement from './CanvasElement';

export default function Canvas() {
  const { 
    elements, 
    boardDimensions, 
    scale, 
    offset,
    setScale,
    setOffset,
    selectedElementId,
    selectElement
  } = useCanvas();
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Handle zooming with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    const newScale = Math.max(0.1, Math.min(2, scale + delta));
    
    setScale(newScale);
  };
  
  // Handle canvas dragging for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging if no element is selected and it's a left-click
    if (e.button === 0 && !selectedElementId) {
      setIsDraggingCanvas(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingCanvas) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      setOffset({
        x: offset.x + dx,
        y: offset.y + dy
      });
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };
  
  // Clear selection when clicking the canvas background
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectElement(null);
    }
  };
  
  // Clean up event listeners
  useEffect(() => {
    const handleMouseUpOutside = () => {
      setIsDraggingCanvas(false);
    };
    
    window.addEventListener('mouseup', handleMouseUpOutside);
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUpOutside);
    };
  }, []);
  
  return (
    <div 
      className={`relative flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg ${
        isDraggingCanvas ? 'cursor-grabbing' : !selectedElementId ? 'cursor-grab' : 'cursor-default'
      }`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleCanvasClick}
    >
      <div 
        ref={canvasRef}
        className="absolute"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          width: boardDimensions.width,
          height: boardDimensions.height,
          background: 'white',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Render all canvas elements */}
        {elements.map((element) => (
          <CanvasElement 
            key={element.id} 
            element={element} 
          />
        ))}
      </div>
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          className="p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => setScale(Math.max(0.1, scale - 0.1))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button
          className="p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => {
            setScale(1);
            setOffset({ x: 0, y: 0 });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.18l.877-.577a8.25 8.25 0 000-4.244l-.877-.577a1.651 1.651 0 011.18-.142l.635.091a8.25 8.25 0 004.243 0l.635-.091a1.651 1.651 0 011.18.142l-.877.577a8.25 8.25 0 000 4.244l.877.577a1.651 1.651 0 010 1.18l-.877.577a8.25 8.25 0 000 4.244l.877.577a1.651 1.651 0 01-1.18.142l-.635-.091a8.25 8.25 0 00-4.243 0l-.635.091a1.651 1.651 0 01-1.18-.142l.877-.577a8.25 8.25 0 000-4.244L.664 10.59zM10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button
          className="p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => setScale(Math.min(2, scale + 0.1))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Scale indicator */}
      <div className="absolute bottom-4 left-4 px-2 py-1 bg-white dark:bg-gray-800 rounded-md shadow-sm text-xs text-gray-600 dark:text-gray-400">
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
} 