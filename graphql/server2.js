const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { graphql, buildSchema } = require('graphql')
const app = express()

const agents = [{ 'agent_id': 1, 'name': 'rockie' }]
const products = [{ 'product_id': 1, 'name': 'iphone' }]
const campaigns = [{ 'campaign_id': 1, 'name': 'big sale' }]
const orders = [{ 'order_id': 1, 'product_id': 1, order_id: 1, agent_id: 1, sale: 1, month: 1 }]

const schema = buildSchema(`
    type Agent {
        agent_id: Int!,
        name: String,
        orders(month: Int): [Order]
    }
    type Product {
        product_id: Int!,
        name: String
    }
    type Campaign {
        campaign_id: Int!,
        name: String
    }
    type Order {
        order_id: Int!,
        product_id: Int!,
        campaign_id: Int!,
        sale: Int!,
        month: Int
    }
    type Query {
        agent(agent_id: Int!): Agent
        agents: [Agent]
        order(order_id: Int!): Order
        orders: [Order]
        product(product_id: Int!): Product
        products: [Product]
        campaign(campaign_id: Int!): Campaign
        campaigns: [Campaign]
    }
`)


class Agent {
    constructor({ agent_id, name }) {
        this.agent_id = agent_id
        this.name = name
    }

    // https://github.com/graphql/graphql-js/issues/995
    // nested resolver
    orders({ month }) {
        console.log(this)
        return orders.filter(item => item.agent_id === this.agent_id && item.month === month)
    }
}

const rootValue = {
    agent: ({ agent_id }) => {
        return new Agent(agents.find(item => item.agent_id === agent_id))
    },
    agents: () => agents,
    order: ({ order_id }) => orders.find(item => item.order_id === order_id),
    orders: () => orders,
    product: ({ product_id }) => products.find(item => item.product_id === product_id),
    products: () => products,
    campaign: ({ campaign_id }) => campaigns.find(item => item.campaign_id === campaign_id),
    campaigns: () => campaigns,
}

app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }))
app.listen(5000, () => {
    console.log('listening on 5000')
})