import { Injector } from '@angular/core';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { TestBed, getTestBed, inject, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import 'rxjs';

import { Level } from './../src/level.enum';
import { LOG_LEVEL, LoggerService } from './../src/service/logger.service';
import { RllLoggerModule } from './../src/module/logger.module';

describe('RllLoggerService', () => {
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                RllLoggerModule.forRoot(Level.ERROR, 'loggingendpoint')
            ],
            providers: [
                MockBackend,
                // Add a custom Http object with a backend that doesn't generate real Http requests
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ]
        });
    });

    it('is defined', () => {
        expect(LOG_LEVEL).toBeDefined();
        expect(LoggerService).toBeDefined();
    });

    it('debug', async(inject([LoggerService, XHRBackend], (loggerService: LoggerService, mockBackend: MockBackend) => {
        expect(LOG_LEVEL).toBeDefined();
        expect(loggerService).toBeDefined();
        expect(mockBackend).toBeDefined();
        let mockResponse = {
            response: 'OK'
        };

        mockBackend.connections.subscribe((connection: MockConnection) => {
            let options = new ResponseOptions({
                body: JSON.stringify(mockResponse)
            });
            connection.mockRespond(new Response(options));
        });

        loggerService.debug('This is a debug test');
        loggerService.error('This is an error test');
    })));
});
