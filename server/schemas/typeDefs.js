const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`

type Query {
    me: User
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(author: [], description: String, title: String, _id: ID!, image: Img, link: String): User
    removeBook(_id: ID!): User
}
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}
type Book {
    bookId: google book API
    authors: []
    description: String
    title: String
    image: Img
    link: String
}
type Auth {
    token: ID!
    user: User
}
`;

// need to set up input type for saveBook
// book will relate to friend in deep thoughts

module.exports = typeDefs;