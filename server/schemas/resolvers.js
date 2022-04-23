const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {

        // async getSingleUser({ user = null, params }, res) {
        //     const foundUser = await User.findOne({
        //       $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        //     });
        
        //     if (!foundUser) {
        //       return res.status(400).json({ message: 'Cannot find a user with this id!' });
        //     }
        
        //     res.json(foundUser);
        //   },
        // get user
        // me: async (parent, args, context) => {
        //     if (context.user) {
        //         const userData = await User.findOne({ _id: context.user._id })
        //             .select('-__v -password')
        //             .populate('thoughts')
        //             .populate('friends');

        //         return userData;
        //     }

        //     throw new AuthenticationError('Not logged in');
        // },

        // get all books
        // books: async (parent, { username }) => {
        //     const params = username ? { username } : {};
        //     return Book.find(params).sort({ createdAt: -1 });
        // }
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
        saveBook: async (parent, args) => {

        },
        removeBook: async (parent, args) => {
            
        }
    }
}
