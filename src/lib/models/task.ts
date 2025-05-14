export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt: number;
  updatedAt: number;
  
  // Enhanced features (target)
  assignee?: string;
  priority?: Priority;
  dueDate?: number;
  
  // Advanced features (stretch)
  comments?: Comments;
  attachments?: Attachments;
}

export type Status = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";
export type Comments = Comment[];
export type Attachments = Attachment[];

export interface Comment {
  id: string;
  text: string;
  createdAt: num