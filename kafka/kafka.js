const { Kafka } = require('kafkajs')
const dotenv=require('dotenv')
dotenv.config()
const kafka = new Kafka({
  clientId: 'lkc-259yym',
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
});


const producer = kafka.producer();

const produceMessage = async ( message) => {
  await producer.connect();
  await producer.send({
    topic:"demo_testing1",
    messages: [{ value: JSON.stringify(message) }],
  });
  await producer.disconnect();
};


const consumer = kafka.consumer({ groupId: 'demo-testing-group' });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic:'demo_testing1' });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received message:', JSON.parse(message.value.toString()));
    },
  });
};

module.exports={consumeMessages,produceMessage}