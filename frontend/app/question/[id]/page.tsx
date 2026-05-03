"use client";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AnswerList from "../../../components/AnswerList";
import MarkdownContent from "../../../components/MarkdownContent";
import SubmitForm from "../../../components/SubmitForm";
import {
    createAnswer,
    deleteAnswer,
    getQuestionDetail,
} from "../../../services/api";

type Question = {
    id: number;
    title: string;
    body: string;
    author: string;
};

type Answer = {
    id: number;
    body: string;
    author: string;
};

type QuestionDetail = {
    question: Question;
    answers: Answer[];
};

export default function QuestionDetail() {
    const params = useParams();
    const rawId = params?.id;
    const questionId = Array.isArray(rawId) ? rawId[0] : rawId;
    const [questionData, setQuestionData] = useState<QuestionDetail | null>(null);
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");

    const fetchDetail = async () => {
        if (!questionId) return;
        const data = await getQuestionDetail(questionId);
        setQuestionData(data);
    };

    useEffect(() => {
        fetchDetail();
    }, [questionId]);

    const handleAnswerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!questionId) return;
        await createAnswer(questionId, { body, author });
        setBody("");
        setAuthor("");
        fetchDetail();
    };

    const handleAnswerDelete = async (answerId: number) => {
        await deleteAnswer(answerId);
        fetchDetail();
    };

    if (!questionData) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#f5f5f7] px-6 pb-16 pt-10">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                <Link
                    href="/"
                    className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                >
                    &larr; Kembali ke Home
                </Link>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="space-y-3">
                        <h1 className="break-all text-2xl font-semibold text-slate-900 sm:text-3xl">
                            {questionData.question.title}
                        </h1>
                        <div className="space-y-3">
                            <MarkdownContent content={questionData.question.body} />
                        </div>
                        <p className="break-all text-sm text-slate-500">
                            Ditanyakan oleh {questionData.question.author}
                        </p>
                    </div>
                </section>

                <section className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-slate-900">Jawaban</h2>
                        <span className="text-sm text-slate-500">
                            {questionData.answers.length} jawaban
                        </span>
                    </div>
                    <AnswerList answers={questionData.answers} onDelete={handleAnswerDelete} />
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h3 className="mb-5 text-lg font-semibold text-slate-900">
                        Tambahkan Jawaban
                    </h3>
                    <SubmitForm
                        mode="answer"
                        title=""
                        body={body}
                        author={author}
                        onTitleChange={() => null}
                        onBodyChange={setBody}
                        onAuthorChange={setAuthor}
                        onSubmit={handleAnswerSubmit}
                        submitLabel="Kirim Jawaban"
                    />
                </section>
            </div>
        </div>
    );
}