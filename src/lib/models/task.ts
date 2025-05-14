export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'doing' | 'done';
  createdAt: number;
  updatedAt: number;
  
  // Enhanced features (target)
  assignee?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: number;
  
  // Advanced features (stretch)
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: number;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  createdAt: number;
}