import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemePromptInput() {
  const { setThemePrompt, themeData, isGenerating, setIsGenerating } = useTheme();
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isGenerating) {
      setIsGenerating(true);
      setThemePrompt(inputValue.trim());
      
      // In a real application, we would make an API call to generate the theme
      // For now, we'll simulate the generation with a timeout
      setTimeout(() => {
        setIsGenerating(false);
      }, 2000);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        Generate Mood Board
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Describe the mood, style, or theme you want to create
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <textarea
            className="input min-h-24 resize-y"
            placeholder="e.g., 'Cyberpunk nostalgia with organic elements' or 'Mediterranean summer with coastal vibes'"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isGenerating}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Be descriptive for better results
          </div>
          <button
            type="submit"
            className={`btn-primary px-4 py-2 ${
              isGenerating ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isGenerating || !inputValue.trim()}
          >
            {isGenerating ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </button>
        </div>
      </form>
      
      {themeData.prompt && !isGenerating && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Current Theme
          </div>
          <div className="text-sm text-gray-800 dark:text-gray-200">
            {themeData.prompt}
          </div>
        </div>
      )}
    </div>
  );
} 