"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoMutation = exports.TodoQuery = exports.Todo = void 0;
const nexus_1 = require("nexus");
exports.Todo = (0, nexus_1.objectType)({
    name: "Todo",
    definition(t) {
        t.int("id");
        t.string("body");
        t.boolean("isCompleted");
    },
});
exports.TodoQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("todos", {
            type: exports.Todo,
            async resolve(_root, _args, ctx) {
                return await ctx.db.todo.findMany();
            },
        });
    },
});
exports.TodoMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createTodo", {
            type: "Todo",
            args: {
                body: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            async resolve(_root, _args, ctx) {
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
                id: (0, nexus_1.nonNull)((0, nexus_1.idArg)()),
                body: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                isCompleted: (0, nexus_1.nonNull)((0, nexus_1.booleanArg)()),
            },
            async resolve(_root, _args, ctx) {
                try {
                    const updatedTodo = await ctx.db.todo.update({
                        where: {
                            id: Number(_args.id)
                        },
                        data: {
                            body: _args.body,
                            isCompleted: _args.isCompleted,
                        },
                    });
                    return updatedTodo;
                }
                catch (error) {
                    throw new Error("Todo not found");
                }
            },
        });
    },
});
//# sourceMappingURL=Todo.js.map