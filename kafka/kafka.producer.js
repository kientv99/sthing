const { Kafka, CompressionTypes, Partitioners, } = require("kafkajs")
const kafka = new Kafka({
    clientId: "app-1",
    brokers: ["127.0.0.1:29092", "127.0.0.1:39092"]
})

const producer = kafka.producer({
    maxInFlightRequests: 1,
    idempotent: true,
    transactionalId: "transId"
});
const getRandomNumber = () => Math.round(Math.random(10) * 100)
const sendMes = () => {

    return producer.send({
        topic: "user-log",
        compression: CompressionTypes.GZIP,
        messages: JSON.stringify({ deviceId: getRandomNumber(), time: "XXX" })
    })
}
const run = async () => {
    try {
        await producer.connect()
        await producer.sendBatch({

            timeout: 20000,
            compression: CompressionTypes.GZIP,

        })
        // await producer.transaction()
        //     .then(async transaction => {
        //         try {
        //             await transaction.send({ topic: 'trans', messages: [{ key: 'trans', value: 'test transaction' }] })
        //             await transaction.commit()
        //         } catch (error) {
        //             transaction.abort()
        //         }
        //     })
    } catch (error) {
        console.log("errororoor")
        console.log(error)
    }

}
// run().then().catch(err => console.log(err))

const run1 = async () => {
    await producer.connect();
    setInterval(sendMes, 2000);
}
run1().catch(err => console.log(err))
// producer.connect()
//     .then(() => console.log("Kafka producer connected"))
//     .catch((error) => console.log("Kafka producer connect fail"))



