import ReactMarkdown from 'react-markdown';

interface CalculatorContentProps {
  content: string;
}

export function CalculatorContent({ content }: CalculatorContentProps) {
  return (
    <div className="mt-12 prose prose-slate max-w-none border-t pt-8">
      <ReactMarkdown
        components={{
          h2: ({ ...props }) => <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
          h3: ({ ...props }) => <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3" {...props} />,
          p: ({ ...props }) => <p className="text-slate-600 leading-relaxed mb-4" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-600" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-slate-600" {...props} />,
          li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
          strong: ({ ...props }) => <strong className="font-bold text-slate-900" {...props} />,
          code: ({ ...props }) => <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-700 font-mono text-sm" {...props} />,
          blockquote: ({ ...props }) => <blockquote className="border-l-4 border-sky-200 pl-4 italic text-slate-500 my-6" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
