import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { Level } from './../level.enum';
import { LOG_ENDPOINT, LOG_LEVEL, LoggerService } from './../service/logger.service';

@NgModule({
    imports: [
        HttpModule
    ]
})
export class RllLoggerModule {
    static forRoot(level: Level = Level.ERROR, endpoint?: string): ModuleWithProviders {
        return {
            ngModule: RllLoggerModule,
            providers: [
                {
                    provide: LOG_LEVEL,
                    useValue: level
                },
                {
                    provide: LOG_ENDPOINT,
                    useValue: endpoint
                },
                LoggerService
            ]
        };
    }
}
