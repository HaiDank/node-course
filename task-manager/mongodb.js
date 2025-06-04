import mongodb from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new mongodb.MongoClient(url);

// Database Name
const dbName = 'task-manager';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users');

  const result = await collection.insertOne({
    name: 'Dank',
    age: 22
  })

  console.log(result)

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());