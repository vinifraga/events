import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { HTTPModule } from './http.module';

import { PrismaService } from './prisma.service';

@Module({
  imports: [HTTPModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
