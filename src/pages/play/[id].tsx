import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { quizzesRouter } from "~/server/api/routers/example";
import { PrismaClient } from "@prisma/client";
import superjson from "superjson";
import { api } from "~/utils/api";
import QuizTaker from "~/components/QuizTaker";
import { Question } from "../create";

function playPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props;

  const query = api.quiz.getQuiz.useQuery({ id });

  const { data, isLoading } = query;
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="mt-20">
      <QuizTaker
        quizData={{
          title: data?.title!,
          questions: data?.questionData! as Question[],
        }}
      />
    </div>
  );
}

export default playPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: quizzesRouter,
    ctx: { prisma: new PrismaClient() },
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.getQuiz.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}
