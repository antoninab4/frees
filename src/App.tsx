import React, { useState } from 'react';
import { MessageSquare, Coins, Bridge, GasPump, FileText, MessageCircleMore } from 'lucide-react';
import CommandPanel from './components/CommandPanel';
import ChatInterface from './components/ChatInterface';
import { Message, Command } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([{
    type: 'system',
    content: 'Welcome to CryptoFeeBot! I can help you check withdrawal fees, token prices, bridge costs, and gas prices. Use the commands below or type "? amount token" (e.g., ?1 ETH) to check prices.',
    timestamp: new Date(),
  }]);

  const commands: Command[] = [
    { id: 'fees', icon: Coins, label: 'Check Fees', description: 'View withdrawal fees for different tokens' },
    { id: 'bridges', icon: Bridge, label: 'Bridge Fees', description: 'Check cross-chain bridge fees' },
    { id: 'gas', icon: GasPump, label: 'Gas Prices', description: 'View current gas prices' },
    { id: 'patchnotes', icon: FileText, label: 'Updates', description: 'See recent changes' },
    { id: 'requests', icon: MessageCircleMore, label: 'Feedback', description: 'Submit feature requests' },
  ];

  const handleCommand = (commandId: string) => {
    let response = '';
    switch (commandId) {
      case 'fees':
        response = 'Please select a token:\n• ETH (Ethereum)\n• BTC (Bitcoin)\n• USDT (Tether)\n• BNB (Binance)';
        break;
      case 'bridges':
        response = 'Available bridges:\n• Ethereum ↔ Arbitrum\n• Ethereum ↔ Optimism\n• Ethereum ↔ Polygon\nSelect source and destination chains to view fees.';
        break;
      case 'gas':
        response = 'Current gas prices:\n• Ethereum: 25 Gwei ($2.15)\n• BSC: 5 Gwei ($0.15)\n• Polygon: 80 Gwei ($0.02)\n• Arbitrum: 0.1 Gwei ($0.05)';
        break;
      case 'patchnotes':
        response = '🔄 Recent Updates:\n• Added support for more tokens\n• Improved price accuracy\n• New bridge fee calculator\n• Real-time gas tracking';
        break;
      case 'requests':
        response = 'Your feedback helps us improve! Share your suggestions or report issues, and we\'ll work on implementing them in future updates.';
        break;
      default:
        response = 'Command not recognized. Please try again.';
    }

    setMessages(prev => [...prev, 
      { type: 'user', content: `/${commandId}`, timestamp: new Date() },
      { type: 'system', content: response, timestamp: new Date() }
    ]);
  };

  const handleMessage = (message: string) => {
    if (message.startsWith('?')) {
      const query = message.substring(1).trim().split(' ');
      if (query.length === 2) {
        const [amount, token] = query;
        const mockPrice = {
          ETH: 3500,
          BTC: 65000,
          USDT: 1,
          BNB: 450,
        }[token.toUpperCase()] || 0;

        const response = mockPrice 
          ? `${amount} ${token.toUpperCase()} = $${(parseFloat(amount) * mockPrice).toLocaleString()}`
          : 'Token not found. Try ETH, BTC, USDT, or BNB.';

        setMessages(prev => [...prev,
          { type: 'user', content: message, timestamp: new Date() },
          { type: 'system', content: response, timestamp: new Date() }
        ]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="flex items-center gap-3 mb-8">
          <MessageSquare className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold">CryptoFeeBot</h1>
        </header>
        
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          <CommandPanel commands={commands} onCommand={handleCommand} />
          <div className="lg:col-span-2">
            <ChatInterface 
              messages={messages}
              onSendMessage={handleMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;