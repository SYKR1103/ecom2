import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('Sungyeon;s ecommerce')
      .setDescription('ecommerce API study')
      .setVersion('1.0')
      .build();
  }
}
