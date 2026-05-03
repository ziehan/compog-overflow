import MarkdownContent from "./MarkdownContent";

type Answer = {
    id: number;
    body: string;
    author: string;
};

type AnswerListProps = {
    answers: Answer[];
    onDelete: (id: number) => void;
};

export default function AnswerList({ answers, onDelete }: AnswerListProps) {
    return (
        <div className="space-y-4">
            {answers.map((answer) => (
                <div
                    key={answer.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                    <div className="space-y-3">
                        <MarkdownContent content={answer.body} />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                        <span>Dijawab oleh {answer.author}</span>
                        <button
                            onClick={() => onDelete(answer.id)}
                            className="font-semibold text-rose-600 transition hover:text-rose-500"
                        >
                            Hapus Jawaban
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
