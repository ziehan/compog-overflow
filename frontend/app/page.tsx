"use client";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import SubmitForm from "../components/SubmitForm";
import { createQuestion, deleteQuestion, getQuestions } from "../services/api";

type Question = {
  id: number;
  title: string;
  body: string;
  author: string;
  answer_count?: number;
  latest_answer_body?: string | null;
};

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data || []);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createQuestion({ title, body, author });
    setTitle("");
    setBody("");
    setAuthor("");
    fetchQuestions();
  };

  const handleDelete = async (id) => {
    await deleteQuestion(id);
    fetchQuestions();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-6 pb-16 pt-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Competitive Programming Lounge
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            Comprog Overflow
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600">
            Tempat berdiskusi strategi, optimasi, dan insight problem
            harian dengan komunitas.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Tanyakan Sesuatu
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Pertanyaan Baru
            </span>
          </div>
          <SubmitForm
            mode="question"
            title={title}
            body={body}
            author={author}
            onTitleChange={setTitle}
            onBodyChange={setBody}
            onAuthorChange={setAuthor}
            onSubmit={handleSubmit}
            submitLabel="Posting Pertanyaan"
          />
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Daftar Pertanyaan
            </h2>
            <span className="text-sm text-slate-500">
              {questions.length} topik
            </span>
          </div>
          <div className="grid gap-4">
            {questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}