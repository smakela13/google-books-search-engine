const { AuthenticationError } = require('apollo-server-express');
const {User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		user: async (parent, { username }) => {
			return User.findOne({ username });
		},
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({_id: context.user._id}).populate('savedBooks')
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
	Mutation: {
		createMatchup: async (parent, args) => {
			const matchup = await Matchup.create(args);
			return matchup;
		},
		createVote: async (parent, { _id, techNum }) => {
			const vote = await Matchup.findOneAndUpdate(
				{ _id },
				{ $inc: { [`tech${techNum}_votes`]: 1 } },
				{ new: true }
			);
			return vote;
		},
	},
};

module.exports = resolvers;
