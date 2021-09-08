const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDef = protoLoader.loadSync('cms.proto', {})
const gprcObject = grpc.loadPackageDefinition(packageDef)
const cmsPackage = gprcObject.cmsPackage

const client = new cmsPackage.agentService('localhost:4000', grpc.credentials.createInsecure())

client.create({ id: 1, name: 'agent' }, (err, response) => {
    console.log(response, err)
})