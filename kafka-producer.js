const coap = require('coap')
const { KafkaClient, Producer } = require('kafka-node')

// Set up Kafka producer
const kafkaClient = new KafkaClient({ kafkaHost: 'localhost:9092' })
const producer = new Producer(kafkaClient)

// Set up CoAP server
const coapServer = coap.createServer(function (req, res) {
  // Handle incoming CoAP requests and send data to Kafka producer
  const data = req.payload.toString()
  producer.send([{ topic: 'my_topic', messages: data }], function (err, result) {
    if (err) console.error(err)
    console.log('Data sent to Kafka')
  })

  res.end('received')
})

// Start CoAP server
coapServer.listen(5683, '127.0.0.1', function () {
  console.log('CoAP server listening')
})
