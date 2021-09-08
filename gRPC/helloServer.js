const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync('./hello.proto', {})

const hello = grpc.loadPackageDefinition(packageDefinition).hello;

function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name })
}

const server = new grpc.Server()
server.addService(hello.greeter.service, { sayHello: sayHello })