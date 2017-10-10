export class Planning {
  inicio: string;
  termino: string;
  alocacao: string;
  base: string;
  cfpProject: string;
  chamado: string;
  clientCode: string;
  clientName: string;
  equipe: string;
  hasAgenda: string;
  hasPms: string;
  motive: number;
  mpsbr: string;
  pmsProject: string;
  recurso: string;
  resumo: string;
  sequencial: number;

  constructor(inicio?: string, termino?: string, alocacao?: string, base?: string,
              cfpProject?: string, chamado?: string, clientCode?: string, clientName?: string,
              equipe?: string, hasAgenda?: string, hasPms?: string, motive?: number,
              mpsbr?: string, pmsProject?: string, recurso?: string, resumo?: string, sequencial?: number){
    this.inicio = inicio;
    this.termino = termino;
    this.alocacao = alocacao;
    this.base = base;
    this.cfpProject = cfpProject;
    this.chamado = chamado;
    this.clientCode = clientCode;
    this.clientName = clientName;
    this.equipe = equipe;
    this.hasAgenda = hasAgenda;
    this.hasPms = hasPms;
    this.motive = motive;
    this.mpsbr = mpsbr;
    this.pmsProject = pmsProject;
    this.recurso = recurso;
    this.resumo = resumo;
    this.sequencial = sequencial;
  }
}
