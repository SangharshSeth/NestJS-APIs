import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.setGlobalPrefix("/api")
  app.enableCors({
    origin: "http://127.0.0.1:5500",
    credentials: true
  })
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('REST-APIs')
    .setDescription('APIs for my backend development expert journey')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap().then(() => {
  console.log('Application started on port 3000....');
});
