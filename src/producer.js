const amqp = require('amqplib');

const queueName = 'task_queue';

async function connectAndSend(message) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    const task = {
      fileName: `dinero`,
      content: 'lorem ipsum lorem',
    };

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(task)));
    console.log( `Sent task: ${task.fileName}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

connectAndSend();
