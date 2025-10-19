"use client";

import { AnswerPayload, GradeResponse, Question } from "@/types/quiz";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Quiz } from "@/components/quiz";
import { Results } from "@/components/results";
import { useEffect, useState } from "react";
import { EmptyQuestion } from "@/components/message/emptyQuestion";
import { ErrorQuestion } from "@/components/message/errorQuestion";
import { LoadingQuestion } from "@/components/message/loadingQuestion";
import { toast } from "sonner";

const textQuestionSchema = z.object({
  type: z.literal("text"),
  answer: z.string().min(1, "Please provide an answer"),
});

const radioQuestionSchema = z.object({
  type: z.literal("radio"),
  answer: z.string().min(1, "Please select an option"),
});

const checkboxQuestionSchema = z.object({
  type: z.literal("checkbox"),
  answer: z.array(z.string()).min(1, "Please select at least one option"),
});


const formSchema = z.object({
  answers: z.array(
    z.discriminatedUnion("type", [
      textQuestionSchema,
      radioQuestionSchema,
      checkboxQuestionSchema,
    ])
  ),
});

type FormData = z.infer<typeof formSchema>;

const API_BASE_URL = "http://localhost:5151/api";

export default function Home() {
  const queryClient = useQueryClient();
  const [gradeResult, setGradeResult] = useState<GradeResponse | null>(null);
  const questions = useQuery({
    queryKey: ["questions"],
    queryFn: async (): Promise<Question[]> => {
      const res = await axios.get(`${API_BASE_URL}/quiz`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (answers: AnswerPayload[]) => {
      const res = await axios.post<GradeResponse>(`${API_BASE_URL}/grade`, {
        answers,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setGradeResult(data);
      form.reset();
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answers: [],
    },
  });

  useEffect(() => {
    if (questions.data) {
      const initialAnswers = questions.data.map((question) => {

        if (question.type === "checkbox") {
          return { type: "checkbox" as const, answer: [] };
        }
        return { type: question.type as "text" | "radio", answer: "" };
      });

      form.reset({ answers: initialAnswers });
    }
  }, [questions.data, form]);

  const onSubmit = (data: FormData) => {
    const payload: AnswerPayload[] = data.answers.map((answer, index) => {
      const question = questions.data![index];
      let value: string | number | number[];
      if (question.type === "text") {
        value = answer.answer as string;
      } else if (question.type === "radio") {
        value = question.choices!.indexOf(answer.answer as string);
      } else {
        value = (answer.answer as string[]).map((choice) =>
          question.choices!.indexOf(choice)
        );
      }
      return {
        id: question.id,
        value,
      };
    });

    toast.promise(mutation.mutateAsync(payload), {
      loading: "Submitting...",
      success: "Your score has been finalized..",
      error: "There's an error while submitting..",
    });
  };

  const handleReset = () => {
    setGradeResult(null);
    form.reset();
    queryClient.invalidateQueries({ queryKey: ["questions"] });
  };

  if (questions.isLoading) return <LoadingQuestion />;
  if (questions.error) return <ErrorQuestion questions={questions} />;
  if (!questions || questions?.data?.length === 0) return <EmptyQuestion />;

  return (
    <div className="font-sans max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz</h1>
      {gradeResult ? (
        <Results
          gradeResult={gradeResult}
          questions={questions}
          handleReset={handleReset}
        />
      ) : (
        <Quiz
          form={form}
          questions={questions}
          onSubmit={onSubmit}
          mutation={mutation}
        />
      )}
    </div>
  );
}
