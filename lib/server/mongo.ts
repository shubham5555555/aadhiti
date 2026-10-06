import { MongoClient } from 'mongodb';
const globalMongo = globalThis as typeof globalThis & { aadhiMongo?: Promise<MongoClient> };
export const mongoConfigured = () => Boolean(process.env.MONGODB_URI);
export async function mongoDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Database not configured');
  if (!globalMongo.aadhiMongo) {
    const client = new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 5000, connectTimeoutMS: 5000 });
    globalMongo.aadhiMongo = client.connect().catch(async () => {
      globalMongo.aadhiMongo = undefined;
      await client.close().catch(() => {});
      throw new Error('Database unavailable');
    });
  }
  const client = await globalMongo.aadhiMongo;
  return client.db(process.env.MONGODB_DB || 'aadhi_ti');
}
export type SavedTurn = { id:string; question:string; answer:string; savedAt:Date };
export type Customer = {
  _id:string;
  profile:{name:string;taluka:string;age:string|null;language:string;answerMode:string};
  consent:{profile:boolean;history:boolean;version:number;updatedAt:Date};
  history:SavedTurn[];
  createdAt:Date;
  updatedAt:Date;
};

export async function customerCollection(){return (await mongoDb()).collection<Customer>("customers");}
