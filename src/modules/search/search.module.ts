import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { DataAccessModule } from 'modules/data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
