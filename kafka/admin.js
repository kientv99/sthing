const { Kafka } = require("kafkajs")
const kafka = new Kafka({
    clientId: "app-1",
    brokers: ["127.0.0.1:29092", "127.0.0.1:39092"]
})
const admin = kafka.admin()

const init = async () => {
    await admin.connect()
    console.log(await admin.listTopics())

    await admin.createTopics({
        validateOnly: false,
        topics: [
            {
                topic: "topic-1",
                numPartitions: 4,
                replicationFactor: 2,
                replicaAssignment: []

            }
        ]
    })
    // await admin.createPartitions({
    //     topicPartitions: [
    //         {
    //             topic: "sub1",
    //             count: 3,
    //             assignments: [[0, 1], [1, 2], [0, 2]]
    //         }
    //     ]
    // })
}
init().catch(err => {
    console.log(err)
})