import React from 'react';
import { Command } from '../types';

interface CommandPanelProps {
  commands: Command[];
  onCommand: (commandId: string) => void;
}

const CommandPanel: React.FC<CommandPanelProps> = ({ commands, onCommand }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-4">Commands</h2>
      {commands.map((command) => (
        <button
          key={command.id}
          onClick={() => onCommand(command.id)}
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          <command.icon className="w-5 h-5 text-blue-400" />
          <div className="text-left">
            <div className="font-medium">{command.label}</div>
            <div className="text-sm text-gray-400">{command.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default CommandPanel;