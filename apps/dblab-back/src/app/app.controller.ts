import { DataDto } from '@dblab/dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getallrows')
  async getAllRows(@Query('tableName') tableName)  {
    return this.appService.getAllRows(tableName);
  }

  @Post('updateRow')
  async updateRow(@Body('row') row: DataDto, @Body('tableName') tableName) {
    return this.appService.updateRow(tableName, row);
  }

  @Post('deleteRow')
  async deleteRow(@Body('row') row: DataDto, @Body('tableName') tableName) {
    return this.appService.deleteRow(tableName, row);
  }

  @Post('addRow')
  async addRow(@Body('row') row: DataDto, @Body('tableName') tableName) {
    return this.appService.addRow(tableName, row);
  }

  @Post('truncTable')
  async truncTable(@Body('tableName') tableName) {
    return this.appService.truncTable(tableName);
  }

  @Post('truncAllTables')
  async truncAllTables() {
    return this.appService.truncAllTables();
  }

  @Post('createDb')
  async createDb() {
    return this.appService.createDb();
  }

  @Post('dropDb')
  async dropDb() {
    return this.appService.dropDb();
  }

  @Post('fillTables')
  async fillTables() {
    return this.appService.fillTables();
  }
}
