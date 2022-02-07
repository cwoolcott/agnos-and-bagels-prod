const { gql } = require('apollo-server-express');

const typeDefs = gql`

type MenuItems {
    _id: ID
    name: String!
    description: String
    price: Float
    taxCategory: TaxCategory
    promotion: String
  }

  type Order {
    _id: ID
    email: String
    createdAt: Float
    orderReadyTime: Float
    menuItems: [MenuItems]
    subTotal: Float
    discount: Float
    taxes: Float
    total: Float
    notified: Boolean
  }

  type TaxCategory {
    _id: ID
    description: String
    taxRate: Float
  }
  
  type Query {
    orderById(id: ID!): Order
    orderByEmail(email: String!): Order
    menuItems: [MenuItems]
    allOrders: [Order]
  }

  type Mutation {
    addOrder(email: String!, menuItems: [String]!): Order
    updateNotificationOrder(id: ID!) : Order
    deleteOrder(id: ID!) : Order
  }
`;

module.exports = typeDefs;
