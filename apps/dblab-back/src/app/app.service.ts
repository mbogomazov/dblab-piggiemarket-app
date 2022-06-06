import { Injectable } from '@nestjs/common';
import { getConnection, getRepository } from 'typeorm';
import { Customer } from '../model/customer.model';
import tableEntities from '../model/tableEntities.model';
import csvToJson = require('convert-csv-to-json');
import { Deal } from '../model/deal.model';
import { Delivery } from '../model/delivery.model';
import { Product } from '../model/product.model';
import { DataDto } from '@dblab/dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg');

@Injectable()
export class AppService {
  async getAllRows(tableName: string) {
    if (tableName === 'Deal') {
      return await getRepository(Deal)
        .createQueryBuilder('deal')
        .orderBy('deal.deal_number', 'ASC')
        .leftJoinAndSelect('deal.customer', 'customer')
        .leftJoinAndSelect('deal.product', 'product')
        .leftJoinAndSelect('deal.delivery', 'delivery')
        .getMany();
    }
    const columns = await getConnection()
      .getMetadata(tableEntities[tableName])
      .ownColumns.map((column) => column.propertyName);
    return await getRepository(tableEntities[tableName])
      .createQueryBuilder(tableName)
      .orderBy(columns[0], 'ASC')
      .getMany();
  }

  async updateRow(tableName: string, row: DataDto) {
    return await getRepository(tableEntities[tableName]).save(row);
  }

  async deleteRow(tableName: string, row: DataDto) {
    return await getRepository(tableEntities[tableName]).remove(row);
  }

  async addRow(tableName: string, row: DataDto) {
    const tableRepository = await getRepository(tableEntities[tableName]);
    const newTableRow = await tableRepository.create(row);
    return await tableRepository.save(newTableRow);
  }

  async truncTable(tableName: string) {
    return await getConnection().query(`TRUNCATE TABLE ${tableName} CASCADE`);
  }

  async truncAllTables() {
    return await getConnection().query(
      `TRUNCATE TABLE deal CASCADE; TRUNCATE TABLE customer CASCADE; TRUNCATE TABLE delivery CASCADE; TRUNCATE TABLE product CASCADE;`
    );
  }

  async createDb() {
    const client = new Client({
      user: 'root',
      host: process.env.DB_HOST,
      password: 'root',
      port: 5432,
    });
    await client.connect();
    await client.query('create database piggiemarket owner goblin;');
    await getConnection().driver.connect();
    return await getConnection().synchronize();
  }

  async dropDb() {
    await getConnection().driver.disconnect();
    const client = new Client({
      user: 'root',
      host: process.env.DB_HOST,
      password: 'root',
      port: 5432,
    });
    await client.connect();
    return await client.query('drop database piggiemarket');
    // const connectionOptions: ConnectionOptions = typeOrmConfig;
    // return await dropDatabase({ifExist: true}, connectionOptions);
  }

  fillTables() {
    let jsonCustomer = csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv('./apps/dblab-back/src/data/customer.csv');
    let jsonDelivery = csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv('./apps/dblab-back/src/data/delivery.csv');
    let jsonProduct = csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv('./apps/dblab-back/src/data/product.csv');

    let jsonDeal = csvToJson
      .fieldDelimiter(',')
      .getJsonFromCsv('./apps/dblab-back/src/data/deal.csv');
    jsonDeal = jsonDeal.map((row) => {
      const delivery_id = row['delivery_id'];
      const product_id = row['product_id'];
      const customer_id = row['customer_id'];

      jsonCustomer.filter((item) => item.id === customer_id)[0]['deal_number'] =
        row['deal_number'];
      jsonProduct.filter((item) => item.id === product_id)[0]['deal_number'] =
        row['deal_number'];
      jsonDelivery.filter((item) => item.id === delivery_id)[0]['deal_number'] =
        row['deal_number'];
      row['customer'] = jsonCustomer.filter(
        (item) => item.id === customer_id
      )[0];
      row['product'] = jsonProduct.filter((item) => item.id === product_id)[0];
      row['delivery'] = jsonDelivery.filter(
        (item) => item.id === delivery_id
      )[0];
      delete row['delivery_id'];
      delete row['customer_id'];
      delete row['product_id'];
      const deal = new Deal();
      for (const key in row) {
        deal[key] = row[key];
      }
      return deal;
    });

    jsonCustomer = jsonCustomer.map((row) => {
      const customer = new Customer();
      for (const key in row) {
        customer[key] = row[key];
      }
      return customer;
    });
    jsonProduct = jsonProduct.map((row) => {
      const product = new Product();
      for (const key in row) {
        product[key] = row[key];
      }
      return product;
    });
    jsonDelivery = jsonDelivery.map((row) => {
      const delivery = new Delivery();
      for (const key in row) {
        delivery[key] = row[key];
      }
      return delivery;
    });

    // getConnection()
    // .manager
    // .save(jsonCustomer);
    // getConnection()
    // .manager
    // .save(jsonProduct);
    // getConnection()
    // .manager
    // .save(jsonDelivery);
    getConnection().manager.save(jsonDeal);
  }
}
