# rll-logger
Simple logging Angular2 library.

## Usage example
In order to use **rll-logger** in your application, you should follow these steps:
1. Add the dependency to your project:
```bash
npm install --save rll-logger
```
2. Import it on your application.  
You can configure the *logging level* by injecting the desired level using the *Level* class.
```typescript
import { Level, RllLoggerModule } from 'rll-logger';

@NgModule({
    imports: [
      ...
      RllLoggerModule.forRoot(Level.DEBUG),
      ...
    ],
    declarations: [
      ...
    ],
    providers: [
      ...
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
```
3. Add it on your services:
```typescript
import { LoggerService } from 'rll-logger';

@Injectable()
export class YourService {
    ...
    constructor(private logger: LoggerService) {
    
    }
    ...
    yourFunction() {
        this.logger.debug('This is a debug trace');
    }
    ...
}
```