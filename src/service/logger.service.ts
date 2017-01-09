import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { Level } from './../level.enum';

export const LOG_LEVEL = new OpaqueToken('LogLevel');
export const LOG_ENDPOINT = new OpaqueToken('LogEndpoint');

@Injectable()
export class LoggerService {

    private _endpoint: string;
    private _level: Level;

    constructor(
        @Inject(LOG_LEVEL) level: Level,
        @Inject(LOG_ENDPOINT) endpoint: string,
        private http: Http) {
        this._level = level;
        this._endpoint = endpoint;
    }

    debug(message: string): void {

        this.log(message, Level.DEBUG);
    }

    error(message: string): void {

        this.log(message, Level.ERROR);
    }

    private log(message: string, level: Level) {

        if (this._level >= level)
        {
            // Validate that the console object exists
            if (console && console.log)
            {
                console.log(message);
            }

            this.logToServer(message);
        }
    }

    private logToServer(message: string) {

        if (this._endpoint) {

            const logTrace = {
                trace: message
            };

            this.http.post(this._endpoint, logTrace);
        }
    }
}
