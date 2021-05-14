const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const graphql = require('graphql')
const app = express()

const agents = [{ 'agent_id': 1, 'name': 'rockie' }]
const products = [{ 'product_id': 1, 'name': 'iphone' }]
const campaigns = [{ 'campaign_id': 1, 'name': 'big sale' }]
const orders = [{ 'order_id': 1, 'product_id': 1, order_id: 1, agent_id: 1, sale: 1, month: 1 }]

const AgentType = new graphql.GraphQLObjectType({
    name: 'Agent',
    description: 'Agent',
    fields: () => ({
        agent_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        orders: {
            type: graphql.GraphQLList(OrderType),
            args: {
                month: { type: graphql.GraphQLInt }
            },
            resolve: (parent, args) => orders.filter(o => o.agent_id === parent.agent_id)
            // TODO with an argment in a sub resolve does not work :-/
            // resolve: (parent, args) => {
            //     console.log(args)
            //     orders.filter(o => {
            //         if (month in args) {
            //             return o.agent_id === parent.agent_id && o.month === args.month
            //         }
            //         else {
            //             return o.agent_id = parent.agent_id
            //         }
            //     })
            // }
        }
    })
})

const ProductType = new graphql.GraphQLObjectType({
    name: 'Product',
    description: 'Product',
    fields: () => ({
        product_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
    })
})

const CampaignType = new graphql.GraphQLObjectType({
    name: 'Campaign',
    description: 'Campaign',
    fields: () => ({
        campaign_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
    })
})

const OrderType = new graphql.GraphQLObjectType({
    name: 'Order',
    description: 'Order',
    fields: () => ({
        order_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        agent_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        product_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        campaign_id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        sale: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) }
    })
})

const rootQueryType = new graphql.GraphQLObjectType({
    name: 'query',
    fields: () => ({
        agent: {
            type: AgentType,
            args: { agent_id: { type: graphql.GraphQLInt } },
            resolve: (parent, args) => agents.find(d => d.agent_id == args.agent_id)
        },
        agents: {
            type: new graphql.GraphQLList(AgentType),
            resolve: () => agents
        },
        products: {
            type: new graphql.GraphQLList(ProductType),
            resolve: () => products
        },
        orders: {
            type: new graphql.GraphQLList(OrderType),
            resolve: () => orders
        },
        campaigns: {
            type: new graphql.GraphQLList(CampaignType),
            resolve: () => campaigns
        }
    })
})

const schema = new graphql.GraphQLSchema({
    query: rootQueryType
})
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))
app.listen(5000, () => {
    console.log('listening on 5000')
})