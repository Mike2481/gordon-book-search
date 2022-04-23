const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        // get user
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        // save book for user
        saveBook: async (parent, { newBook }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    // push new book to savedBooks and return new result
                    {$push: { savedBooks: newBook }},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('Must be logged in!')

        },
        removeBook: async (parent, { bookId }, context) => {
            if(context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    // pull book chosen by id from savedBooks and return new result
                    {$pull: {savedBooks: {bookId}}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('Must be logged in!')
        },
    },
};

module.exports = resolvers;
