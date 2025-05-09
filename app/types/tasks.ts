export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  createdById: string
  createdAt: Date | null
  updatedAt: Date | null
  teamId: string
  assignedToId: string
  boardId: string
  title: string
  description: string | null
  priority: Priority
  completed: boolean
  dueDate: Date | null
  assignedTo?: string
  createdBy?: string
}

export interface Board {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  teamId: string
  userId: string
  tasks: Task[]
}

export interface CreateTaskInput {
  title: string
  description?: string
  priority: Priority
  assignedToId: string
  dueDate?: Date
  boardId: string
}

export interface CreateBoardInput {
  name: string
  teamId: string
  userId: string
}
