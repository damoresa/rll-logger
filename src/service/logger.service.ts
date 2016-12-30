import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LoggerService implements OnInit {

    private loggingEndpoint: string;

    constructor(private http: Http) {}

    ngOnInit(): void {
        this.loggingEndpoint = 'logging';
    }

    debug(message: string): void {

        let logTrace = {
            trace: message
        };

        console.log(JSON.stringify(logTrace));
        this.logToServer(logTrace);
    }

    private logToServer(logTrace: any) {

         this.http.post(this.loggingEndpoint, logTrace)
             .map((response) => response ? response.json() : { })
             .subscribe((response) => console.log(JSON.stringify(response)));
    }
}
