import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { AnswerPayload, GradeResponse, Question } from "@/types/quiz";
import {
  QueryObserverPendingResult,
  QueryObserverPlaceholderResult,
  QueryObserverSuccessResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

export const Quiz = ({
  form,
  questions,
  onSubmit,
  mutation,
}: {
  form: UseFormReturn<
    {
      answers: (
        | {
            type: "text";
            answer: string;
          }
        | {
            type: "radio";
            answer: string;
          }
        | {
            type: "checkbox";
            answer: string[];
          }
      )[];
    },
    undefined,
    {
      answers: (
        | {
            type: "text";
            answer: string;
          }
        | {
            type: "radio";
            answer: string;
          }
        | {
            type: "checkbox";
            answer: string[];
          }
      )[];
    }
  >;
  questions:
    | QueryObserverSuccessResult<Question[], Error>
    | QueryObserverPendingResult<Question[], Error>
    | QueryObserverPlaceholderResult<Question[], Error>;
  onSubmit: (data: {
    answers: (
      | {
          type: "text";
          answer: string;
        }
      | {
          type: "radio";
          answer: string;
        }
      | {
          type: "checkbox";
          answer: string[];
        }
    )[];
  }) => void;
  mutation: UseMutationResult<GradeResponse, Error, AnswerPayload[], unknown>;
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        {questions?.data?.map((question, index) => (
          <FormField
            key={question.id}
            control={form.control}
            name={`answers.${index}.answer`}
            render={({ field }) => (
              <FormItem>
                <div className="bg-slate-100 p-4 space-y-4 rounded-2xl">
                  <FormLabel>{question.question}</FormLabel>
                  <FormControl>
                    {question.type === "text" ? (
                      <Input
                        placeholder="Enter your answer"
                        {...field}
                        value={
                          typeof field.value === "string" ? field.value : ""
                        }
                        onChange={(e) => field.onChange(e.target.value)}
                        className="mb-2"
                      />
                    ) : question.type === "radio" ? (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={
                          typeof field.value === "string" ? field.value : ""
                        }
                      >
                        {question.choices!.map((choice, choiceIndex) => (
                          <FormItem
                            key={choiceIndex}
                            className="flex items-center space-x-2"
                          >
                            <FormControl>
                              <RadioGroupItem value={choice} />
                            </FormControl>
                            <FormLabel>{choice}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div>
                        {question.choices!.map((choice, choiceIndex) => (
                          <FormItem
                            key={choiceIndex}
                            className="flex items-center mb-3 space-x-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={
                                  Array.isArray(field.value) &&
                                  field.value.includes(choice)
                                }
                                onCheckedChange={(checked) => {
                                  const currentValue = Array.isArray(
                                    field.value
                                  )
                                    ? field.value
                                    : [];
                                  const newValue = checked
                                    ? [...currentValue, choice]
                                    : currentValue.filter((v) => v !== choice);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel>{choice}</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          Submit Answer
        </Button>
      </form>
    </Form>
  );
};
