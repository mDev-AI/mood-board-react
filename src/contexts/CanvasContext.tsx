import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Types for canvas elements
export type ElementPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
};

export type ElementType = 'image' | 'color' | 'text' | 'typography' | 'texture';

export type CanvasElement = {
  id: string;
  type: ElementType;
  position: ElementPosition;
  content: any; // The actual content depends on the element type
  locked: boolean;
};

export type BoardDimensions = {
  width: number;
  height: number;
};

type CanvasContextType = {
  elements: CanvasElement[];
  selectedElementId: string | null;
  boardDimensions: BoardDimensions;
  scale: number;
  offset: { x: number; y: number };
  addElement: (type: ElementType, content: any, position?: Partial<ElementPosition>) => string;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  moveElement: (id: string, x: number, y: number) => void;
  resizeElement: (id: string, width: number, height: number) => void;
  setBoardDimensions: (dimensions: BoardDimensions) => void;
  setScale: (scale: number) => void;
  setOffset: (offset: { x: number; y: number }) => void;
  arrangeElement: (id: string, direction: 'front' | 'back' | 'forward' | 'backward') => void;
  lockElement: (id: string, locked: boolean) => void;
};

// Default canvas state
const defaultBoardDimensions: BoardDimensions = {
  width: 1200,
  height: 800,
};

// Create context
const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

// Provider component
export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [boardDimensions, setBoardDimensions] = useState<BoardDimensions>(defaultBoardDimensions);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Add a new element to the canvas
  const addElement = (
    type: ElementType,
    content: any,
    position?: Partial<ElementPosition>
  ): string => {
    const id = uuidv4();
    const defaultPosition: ElementPosition = {
      x: boardDimensions.width / 2 - 100,
      y: boardDimensions.height / 2 - 100,
      width: 200,
      height: 200,
      zIndex: elements.length + 1,
    };

    const newElement: CanvasElement = {
      id,
      type,
      content,
      position: { ...defaultPosition, ...position },
      locked: false,
    };

    setElements((prev) => [...prev, newElement]);
    return id;
  };

  // Update an existing element
  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  // Remove an element
  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  };

  // Select an element
  const selectElement = (id: string | null) => {
    setSelectedElementId(id);
  };

  // Move an element
  const moveElement = (id: string, x: number, y: number) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === id
          ? {
              ...element,
              position: {
                ...element.position,
                x,
                y,
              },
            }
          : element
      )
    );
  };

  // Resize an element
  const resizeElement = (id: string, width: number, height: number) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === id
          ? {
              ...element,
              position: {
                ...element.position,
                width,
                height,
              },
            }
          : element
      )
    );
  };

  // Arrange elements (bring to front, send to back, etc.)
  const arrangeElement = (id: string, direction: 'front' | 'back' | 'forward' | 'backward') => {
    const element = elements.find((el) => el.id === id);
    if (!element) return;

    const sortedElements = [...elements].sort((a, b) => a.position.zIndex - b.position.zIndex);
    const index = sortedElements.findIndex((el) => el.id === id);

    if (direction === 'front') {
      // Bring to front
      const highestZIndex = Math.max(...elements.map((el) => el.position.zIndex)) + 1;
      updateElement(id, {
        position: { ...element.position, zIndex: highestZIndex },
      });
    } else if (direction === 'back') {
      // Send to back
      const lowestZIndex = Math.min(...elements.map((el) => el.position.zIndex)) - 1;
      updateElement(id, {
        position: { ...element.position, zIndex: lowestZIndex },
      });
    } else if (direction === 'forward' && index < sortedElements.length - 1) {
      // Bring forward
      const nextElement = sortedElements[index + 1];
      updateElement(id, {
        position: { ...element.position, zIndex: nextElement.position.zIndex + 1 },
      });
      updateElement(nextElement.id, {
        position: { ...nextElement.position, zIndex: element.position.zIndex },
      });
    } else if (direction === 'backward' && index > 0) {
      // Send backward
      const prevElement = sortedElements[index - 1];
      updateElement(id, {
        position: { ...element.position, zIndex: prevElement.position.zIndex - 1 },
      });
      updateElement(prevElement.id, {
        position: { ...prevElement.position, zIndex: element.position.zIndex },
      });
    }
  };

  // Lock/unlock an element
  const lockElement = (id: string, locked: boolean) => {
    updateElement(id, { locked });
  };

  return (
    <CanvasContext.Provider
      value={{
        elements,
        selectedElementId,
        boardDimensions,
        scale,
        offset,
        addElement,
        updateElement,
        removeElement,
        selectElement,
        moveElement,
        resizeElement,
        setBoardDimensions,
        setScale,
        setOffset,
        arrangeElement,
        lockElement,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

// Custom hook to use the canvas context
export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
}; 