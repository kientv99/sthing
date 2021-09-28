const { Kafka, CompressionTypes, PartitionAssigners } = require('kafkajs')

const kafka = new Kafka({
    clientId: "app-1",
    brokers: ["127.0.0.1:29092", "127.0.0.1: 39092"]
})

const consumer = kafka.consumer({
    groupId: "group-A"
})

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'topic-1' })
    // await consumer.subscribe({ topic: 'topic-b' })

    await consumer.run({
        eachBatch: async ({ batch, heartbeat, resolveOffset }) => {
            for (m of batch.messages) {
                console.log(m)
                resolveOffset(m.offset)
                await heartbeat()
            }
        },
        eachBatchAutoResolve: true,
        eachMessage: async ({ topic, partition, message }) => {
            console.log(topic)
            console.log(partition)
            console.log(message.value.toString())
        }
    })
}
run().then().catch(err => console.log(err))