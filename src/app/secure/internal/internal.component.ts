import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { ThfSelectOption } from '@totvs/thf-core/components/thf-field-base/thf-select-base/thf-select-option.interface';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.css']
})
export class InternalComponent implements OnInit {

  date = "";
  dateStart = new Date('June 05, 2013 01:15:00').toISOString();
  dateEnd = new Date('August 15, 9999 01:15:00').toISOString();

  activityList: Array<ThfSelectOption> = [
    {value: '09', label: 'Atestado médico / Licença'},
    {value: '22', label: 'Falta ou descanço'},
    {value: '10', label: 'Férias'},
    {value: '11', label: 'Não alocação'},
    {value: '18', label: 'Reserva de agenda - Faturável'},
    {value: '94', label: 'Reserva de agenda - Perda'}
  ];

  atividade = '22';

  constructor(private route: Router,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.date = this.datePipe.transform(new Date(), "y-MM-dd");
  }

  goBack(): void {
    this.route.navigate(['/home']);
  }

  fillForm(form: any){
    console.log(form);
    let data_planing = this.datePipe.transform(new Date(form.date), "dd/MM/y");    

    var commands = `loadApointment(true, '99000', 'TOTVS S.A. (99000)', '${this.atividade}', '', '', '', '', '${data_planing}');`;
    console.log(commands);

    
                           
    chrome.tabs.executeScript(null,
        {
            code: `var scr = document.createElement('script');
                  scr.innerHTML = "${commands}";
                  document.body.appendChild(scr);`,
        }
    );
    window.close();
  }

}
