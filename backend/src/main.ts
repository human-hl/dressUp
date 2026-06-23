import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { json, urlencoded } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(json({ limit: '10mb' }));
    app.use(urlencoded({ extended: true, limit: '10mb' }));

    const expressApp = app.getHttpAdapter().getInstance();
    if (expressApp && typeof expressApp.use === 'function') {
        expressApp.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
    }

    app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

    await app.listen(3000, '127.0.0.1');
}
bootstrap();