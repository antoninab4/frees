import { LucideIcon } from 'lucide-react';

export interface Message {
  type: 'user' | 'system';
  content: string;
  timestamp: Date;
}

export interface Command {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
}