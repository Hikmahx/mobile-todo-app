const Todo = require("../models/Todo");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    todo: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    tags: { type: new GraphQLList(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.find();
      }
    },
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Todo.findById(args.id)
      }
    }
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        todo: { type: new GraphQLNonNull(GraphQLString) },
        completed: { type: GraphQLBoolean, defaultValue: false },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        const todo = new Todo({
          todo: args.todo,
          completed: args.completed,
          tags: args.tags
        });

        return todo.save();
      }
    },
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        todo: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        return Todo.findByIdAndUpdate(
          args.id,
          {
            $set: {
              todo: args.todo,
              completed: args.completed,
              tags: args.tags
            }
          },
          { new: true }

        );
      }
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Todo.findByIdAndRemove(args.id);
      },
    },
  },
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});