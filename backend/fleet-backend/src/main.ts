import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
  });


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,          
      whitelist: true,         
      forbidNonWhitelisted: false,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Fleet Diagnostics API')
    .setDescription('API for vehicle diagnostic events')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
