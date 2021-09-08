const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync('cms.proto', {})
const gprcObject = grpc.loadPackageDefinition(packageDef)
const cmsPackage = gprcObject.cmsPackage

// console.log(cms)
console.log(cmsPackage.agentService)
const server = new grpc.Server()

function getAll(call, callback) {
    console.log(call)
    agents
}

function create(call, callback) {
    console.log(call)
    callback(null, agents[0])
}

const agents = [{ 'id': 1, 'name': 'rockie' }]
server.addService(cmsPackage.agentService.service, {
    "create": create
})

server.bindAsync('0.0.0.0:4000', grpc.ServerCredentials.createInsecure(),
    () => {
        server.start()
    }
)
// server.bind('0.0.0.0:4000', grpc.ServerCredentials.createSsl())