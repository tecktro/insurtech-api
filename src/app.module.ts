import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InsuranceQuoteModule } from './modules/insurance-quote/insurance-quote.module';

@Module({
	imports: [InsuranceQuoteModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
