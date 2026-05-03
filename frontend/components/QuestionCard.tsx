import Link from "next/link";

type Question = {
    id: number;
    title: string;
    author: string;
    answer_count?: number;
    latest_answer_body?: string | null;
};

type QuestionCardProps = {
    question: Question;
    onDelete: (id: number) => void;
};

export default function QuestionCard({ question, onDelete }: QuestionCardProps) {
    const hasAnswer = (question.answer_count || 0) > 0;
    const preview = hasAnswer
        ? question.latest_answer_body || "Jawaban terbaru tersedia"
        : "Belum ada jawaban";

    return (
        <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-2">
                    <Link href={`/question/${question.id}`} className="block">
                        <h3 className="line-clamp-2 break-all text-lg font-semibold text-slate-900 transition group-hover:text-slate-700">
                            {question.title}
                        </h3>
                    </Link>
                    <p className="break-all text-sm text-slate-500">Oleh {question.author}</p>
                    <p
                        className={`line-clamp-1 break-all text-sm ${hasAnswer ? "text-slate-600" : "text-slate-400"
                            }`}
                    >
                        {preview}
                    </p>
                </div>
                <button
                    onClick={() => onDelete(question.id)}
                    className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
                >
                    Hapus
                </button>
            </div>
        </div>
    );
}
