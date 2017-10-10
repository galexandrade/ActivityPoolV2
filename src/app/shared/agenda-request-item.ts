import { Task } from './task';

export class AgendaRequestItem {

  ticket: string;
  clientCode: string;
  clientName: string;
  project: string;
  front: string;
  tasks: Task[];

  constructor(ticket?: string, clientCode?: string, clientName?: string, project?: string, front?: string, tasks?: Task[]) {
    this.ticket = ticket;
    this.clientCode = clientCode;
    this.clientName = clientName;
    this.project = project;
    this.front = front;
    this.tasks = tasks;
  }
}
