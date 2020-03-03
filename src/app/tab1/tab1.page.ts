import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BseAlerts {
  Table?: (TableEntity)[] | null;
}
export interface TableEntity {
  NEWSID: string;
  SCRIP_CD: number;
  XML_NAME: string;
  NEWSSUB: string;
  DT_TM: string;
  NEWS_DT: string;
  CRITICALNEWS: number;
  ANNOUNCEMENT_TYPE: string;
  QUARTER_ID?: null;
  FILESTATUS: string;
  ATTACHMENTNAME: string;
  MORE: string;
  HEADLINE: string;
  CATEGORYNAME?: string | null;
  OLD: number;
  RN: number;
  PDFFLAG: number;
  NSURL?: string | null;
  SLONGNAME?: string | null;
  AGENDA_ID: number;
  TotalPageCnt: number;
  News_submission_dt?: string | null;
  DissemDT: string;
  TimeDiff?: string | null;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any;
  error: string;
  constructor(private http: HttpClient) {
    this.data = '';
    this.error = '';
  }

  ionViewWillEnter() {
    // Load the data
    this.prepareDataRequest()
        .subscribe(
            data => {
              // Set the data to display in the template
              // @ts-ignore
              this.data = data.Table;
            },
            err => {
              // Set the error information to display in the template
              this.error = `An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}`;
            }
        );
  }

  private prepareDataRequest(): Observable<object> {

    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const dataUrl = `https://api.bseindia.com/BseIndiaAPI/api/AnnGetData/w?strCat=-1&strPrevDate=${today}
    &strScrip=&strSearch=P&strToDate=${today}&strType=C`;
    // Prepare the request
    return this.http.get(dataUrl);
  }

}
