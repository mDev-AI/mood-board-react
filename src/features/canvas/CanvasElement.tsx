import { useState, useRef } from 'react';
import { useCanvas } from '../../contexts/CanvasContext';
import type { CanvasElement as CanvasElementType } from '../../contexts/CanvasContext';

type CanvasElementProps = {
  element: CanvasElementType;
};

export default function CanvasElement({ element }: CanvasElementProps) {
  const { 
    selectedElementId, 
    selectElement, 
    moveElement, 
    resizeElement 
  } = useCanvas();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const elementRef = useRef<HTMLDivElement>(null);
  
  const isSelected = selectedElementId === element.id;
  
  // Handle element selection
  const handleElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };
  
  // Handle dragging
  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (element.locked) return;
    
    setIsDragging(true);
    selectElement(element.id);
    
    const { x, y } = element.position;
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y,
    });
  };
  
  const handleDragMove = (e: React.MouseEvent) => {
    if (isDragging && !element.locked) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      moveElement(element.id, newX, newY);
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  // Handle resizing
  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (element.locked) return;
    
    setIsResizing(true);
    selectElement(element.id);
    
    const { width, height } = element.position;
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width,
      height,
    });
  };
  
  const handleResizeMove = (e: React.MouseEvent) => {
    if (isResizing && !element.locked) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      const newWidth = Math.max(50, resizeStart.width + deltaX);
      const newHeight = Math.max(50, resizeStart.height + deltaY);
      
      resizeElement(element.id, newWidth, newHeight);
    }
  };
  
  const handleResizeEnd = () => {
    setIsResizing(false);
  };
  
  // Set up event listeners
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleDragMove(e);
    } else if (isResizing) {
      handleResizeMove(e);
    }
  };
  
  const handleMouseUp = () => {
    handleDragEnd();
    handleResizeEnd();
  };
  
  // Render different types of elements
  const renderElementContent = () => {
    switch (element.type) {
      case 'image':
        return (
          <img 
            src={element.content.src} 
            alt={element.content.alt || 'Mood board image'}
            className="w-full h-full object-cover"
          />
        );
        
      case 'color':
        return (
          <div 
            className="w-full h-full"
            style={{ backgroundColor: element.content.color }}
          />
        );
        
      case 'text':
        return (
          <div 
            className="w-full h-full p-2 overflow-hidden"
            style={{ 
              fontFamily: element.content.fontFamily,
              fontSize: element.content.fontSize,
              color: element.content.color,
            }}
          >
            {element.content.text}
          </div>
        );
        
      case 'typography':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-center bg-white">
            <h3 
              style={{ fontFamily: element.content.fontFamily }}
              className="text-lg font-semibold mb-2"
            >
              {element.content.fontFamily}
            </h3>
            <p 
              style={{ fontFamily: element.content.fontFamily }}
              className="text-sm"
            >
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        );
        
      case 'texture':
        return (
          <div 
            className="w-full h-full"
            style={{ 
              backgroundImage: `url(${element.content.src})`,
              backgroundRepeat: 'repeat',
              backgroundSize: element.content.scale || '100px',
            }}
          />
        );
        
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            Unknown element type
          </div>
        );
    }
  };
  
  return (
    <div
      ref={elementRef}
      className={`absolute select-none ${
        isSelected ? 'ring-2 ring-primary-500 ring-offset-2' : ''
      } ${element.locked ? 'cursor-not-allowed' : 'cursor-move'}`}
      style={{
        top: element.position.y,
        left: element.position.x,
        width: element.position.width,
        height: element.position.height,
        zIndex: isSelected ? 999 : element.position.zIndex,
      }}
      onClick={handleElementClick}
      onMouseDown={handleDragStart}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {renderElementContent()}
      
      {/* Resize handle */}
      {isSelected && !element.locked && (
        <div
          className="absolute bottom-0 right-0 w-6 h-6 bg-primary-500 rounded-tl-md cursor-nwse-resize"
          onMouseDown={handleResizeStart}
        />
      )}
      
      {/* Locked indicator */}
      {element.locked && (
        <div className="absolute top-2 right-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-gray-600 dark:text-gray-400" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}
    </div>
  );
} 