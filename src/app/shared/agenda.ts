import { Task } from './task';

export class Agenda {
  key: string;
  date: string;
  entry1: string;
  exit1: string;
  entry2: string;
  exit2: string;
  entry3: string;
  exit3: string;
  entry4: string;
  exit4: string;
  hours: number;
  tasks: Task[];

  constructor(key?: string, date?: string, entry1?: string, exit1?: string, entry2?: string,
              exit2?: string, entry3?: string, exit3?: string, entry4?: string,
              exit4?: string, hours?: number, tasks?: Task[]) {
    this.key = key;
    this.date = date;
    this.entry1 = entry1;
    this.exit1 = exit1;
    this.entry2 = entry2;
    this.exit2 = exit2;
    this.entry3 = entry3;
    this.exit3 = exit3;
    this.entry4 = entry4;
    this.exit4 = exit4;
    this.hours = hours;
    this.tasks = tasks;
  }
}
