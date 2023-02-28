import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const quizzesRouter = createTRPCRouter({
  saveQuiz: publicProcedure
    .input(
      z.object({
        title: z.string(),
        quizData: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            mode: z.string(),
            options: z.array(z.string()),
            qNum: z.number(),
          })
        ),
      })
    )
    .mutation(({ input, ctx }) => {
      const { prisma } = ctx;

      const res = prisma.quiz.create({
        data: {
          title: input.title,
          questionData: input.quizData,
        },
      });

      return res;
    }),
});
