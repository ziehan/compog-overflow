import type { FormEvent } from "react";

type SubmitFormProps = {
    mode: "question" | "answer";
    title: string;
    body: string;
    author: string;
    onTitleChange: (value: string) => void;
    onBodyChange: (value: string) => void;
    onAuthorChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
};

export default function SubmitForm({
    mode,
    title,
    body,
    author,
    onTitleChange,
    onBodyChange,
    onAuthorChange,
    onSubmit,
    submitLabel,
}: SubmitFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {mode === "question" ? (
                <input
                    type="text"
                    placeholder="Judul Pertanyaan"
                    value={title}
                    onChange={(event) => onTitleChange(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                    required
                />
            ) : null}
            <textarea
                placeholder={
                    mode === "question"
                        ? "Detail masalah, batasan, dan contoh input output"
                        : "Tulis jawaban, pendekatan, atau insight kamu"
                }
                value={body}
                onChange={(event) => onBodyChange(event.target.value)}
                className="h-32 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                required
            />
            <input
                type="text"
                placeholder="Nama atau Username"
                value={author}
                onChange={(event) => onAuthorChange(event.target.value)}
                maxLength={100}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                required
            />
            <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
                {submitLabel}
            </button>
        </form>
    );
}
