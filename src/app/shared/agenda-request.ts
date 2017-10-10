import { AgendaRequestItem } from './agenda-request-item';

export class AgendaRequest {

  mailTo: string;
  mailCC: string;
  items: AgendaRequestItem[];

  constructor(mailTo?: string, mailCC?: string, items?: AgendaRequestItem[]) {
    this.mailTo = mailTo;
    this.mailCC = mailCC;
    this.items = items;
  }
}
