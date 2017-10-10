export class Task {
  date: string;
  timeStart: string;
  timeEnd: string;
  timeInterval: string;
  ticket: string;
  project: string;
  front: string;
  clientCode: string;
  clientName: string;
  activity: string;

  constructor(date?: string, timeStart?: string, timeEnd?: string, timeInterval?: string,
              ticket?: string, project?: string, front?: string, clientCode?: string,
              clientName?: string, activity?: string){
    this.date = date;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.timeInterval = timeInterval;
    this.ticket = ticket;
    this.project = project;
    this.front = front;
    this.clientCode = clientCode;
    this.clientName = clientName;
    this.activity = activity;
  }
}
