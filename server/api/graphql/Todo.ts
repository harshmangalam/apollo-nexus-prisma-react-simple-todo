import {
  booleanArg,
  extendType,
  idArg,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { Context } from "../context";

export const Todo = objectType({
  name: "Todo",
  definition(t) {
    t.int("id");
    t.string("body");
    t.boolean("isCompleted");
  },
});

export const TodoQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("todos", {
      type: Todo,
      async resolve(_root, _args, ctx: Context) {
        return await ctx.db.todo.findMany();
      },
    });
  },
});

export const TodoMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTodo", {
      type: "Todo",
      args: {
        body: nonNull(stringArg()),
      },
      async resolve(_root, _args, ctx: Context) {
        const todo = await ctx.db.todo.create({
          data: {
            body: _args.body,
          },
        });

        return todo;
      },
    });

    t.nonNull.field("updateTodo", {
      type: "Todo",
      args: {
        id:nonNull(idArg()),
        body: nonNull(stringArg()),
        isCompleted: nonNull(booleanArg()),
      },
      async resolve(_root, _args, ctx: Context) {
       try {
        const updatedTodo = await ctx.db.todo.update({
          where:{
            id:Number(_args.id)
          },
          data: {
            body: _args.body,
            isCompleted: _args.isCompleted,
          },
        });
        return updatedTodo
       } catch (error) {
         throw new Error("Todo not found")
       }
      },
    });
  },
});
