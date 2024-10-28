const amqp = require('amqplib');
const {saveFile} = require("./utils.js");
const {processFile} = require("./utils.js");

const queueName = 'task_queue';

async function connectAndConsume() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    await channel.prefetch(1);

    channel.consume(queueName, (msg) => {
      if (msg) {
        const task = JSON.parse(msg.content.toString());
        console.log( `Received task: ${task.fileName} (Content: ${task.content})`);

          saveFile(task.fileName, task.content)
          processFile(task.fileName)
          console.log( `Task ${task.fileName} processed.`);
          channel.ack(msg);
      }
    }, { noAck: false });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

connectAndConsume();