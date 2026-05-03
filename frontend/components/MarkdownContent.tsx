import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
    content: string;
};

export default function MarkdownContent({ content }: MarkdownContentProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ children }) => (
                    <h1 className="break-all text-2xl font-semibold text-slate-900">{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 className="break-all text-xl font-semibold text-slate-900">{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 className="break-all text-lg font-semibold text-slate-900">{children}</h3>
                ),
                p: ({ children }) => (
                    <p className="break-all leading-7 text-slate-700">{children}</p>
                ),
                a: ({ children, href }) => (
                    <a
                        href={href}
                        className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4"
                    >
                        {children}
                    </a>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc space-y-2 break-all pl-6 text-slate-700">{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal space-y-2 break-all pl-6 text-slate-700">{children}</ol>
                ),
                li: ({ children }) => <li className="break-all leading-7">{children}</li>,
                code: ({ inline, children }) => {
                    if (inline) {
                        return (
                            <code className="rounded-lg bg-slate-100 px-2 py-0.5 text-[0.85em] font-mono text-slate-700">
                                {children}
                            </code>
                        );
                    }
                    return (
                        <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
                            <code className="font-mono">{String(children).replace(/\n$/, "")}</code>
                        </pre>
                    );
                },
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-slate-200 pl-4 text-slate-600">
                        {children}
                    </blockquote>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
