const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Book {
		authors: [String]
		description: String!
		bookId: String!
		image: String
		link: String
		title: String!
	}

	type User {
		_id: ID
		username: String! @unique
		email: String! @unique
		bookCount: Int
		password: String!
		savedBooks: [Book]
	}

	type Query {
		me: [User]
	}

	type Auth {
		token: ID!
		user: [User]
	}

	input saveBookInput {
		authors: [String]
		description: String!
		bookId: String!
		image: String
		link: String
		title: String!
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		saveBook(input: saveBookInput): User
		removeBook(bookId: Int): User
	}
`;

module.exports = typeDefs;
