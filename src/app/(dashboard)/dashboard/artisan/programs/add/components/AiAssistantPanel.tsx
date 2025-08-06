import React from 'react';

interface AiAssistantPanelProps {
  showAiAssistant: boolean;
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
  isAiAssisting: boolean;
  handleAiAssist: () => Promise<void>;
  setShowAiAssistant: (show: boolean) => void;
}

export function AiAssistantPanel({
  showAiAssistant,
  aiPrompt,
  setAiPrompt,
  isAiAssisting,
  handleAiAssist,
  setShowAiAssistant,
}: AiAssistantPanelProps) {
  if (!showAiAssistant) return null;

  return (
    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
      <h4 className="text-sm font-medium text-gray-900 mb-2">
        ✍️ Description Writing Assistant
      </h4>
      <p className="text-sm text-gray-600 mb-3">
        Describe your program idea and we'll help you create a detailed description.
      </p>
      <div className="space-y-3">
        <textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="Example: This program teaches traditional batik tulis from Yogyakarta. Participants will learn classic patterns and natural dyeing techniques..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleAiAssist}
            disabled={isAiAssisting || !aiPrompt.trim()}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isAiAssisting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              "Generate Description"
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowAiAssistant(false)}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}