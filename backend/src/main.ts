import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true }); // frontend ko API use karne ki permission; // frontend (port 3000) ko API use karne ki permission
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log('API chal raha hai: http://localhost:' + port + '/products');
}
bootstrap();