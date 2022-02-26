import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const pckg = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle(pckg.name)
  .setDescription(pckg.description)
  .setVersion(pckg.version)
  .addTag('interestPoints', 'Configuração de Pontos de Interesse')
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
