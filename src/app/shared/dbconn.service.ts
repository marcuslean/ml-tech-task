import { Injectable } from '@angular/core';
// import { MongoClient } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class DbconnService {
  // private client;
  // private database;
  // private collection;

  // constructor(databaseName, collectionName) {
  //   this.client = new MongoClient('mongodb://127.0.0.1:27017');
  //   this.database = this.client.db(databaseName);
  //   this.collection = this.database.collection(collectionName);
  // }

  // async find(query) {
  //   const cursor = this.collection.find(query);
  //   return await cursor.toArray();
  // }

  // async insert(doc) {
  //   if (Array.isArray(doc)) {
  //     return await this.collection.insertMany(doc);
  //   } else {
  //     return await this.collection.insertOne(doc);
  //   }
  // }

  // async delete(query) {
  //   return await this.collection.deleteMany(query);
  // }

  // async update(query, doc) {
  //   return await this.collection.updateMany(query, doc);
  // }
}
