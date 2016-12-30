import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LoggerService } from './../service/logger.service';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        LoggerService
    ]
})
export class RllLoggerModule {}
