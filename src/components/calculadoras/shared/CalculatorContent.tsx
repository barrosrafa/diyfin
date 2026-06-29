import ReactMarkdown from 'react-markdown';

interface CalculatorContentProps {
  content: string;
}

export function CalculatorContent({ content }: CalculatorContentProps) {
  return (
    <div
      className="mt-12 max-w-none pt-8"
      style={{ borderTop: '1px solid #d2d2d7' }}
    >
      <ReactMarkdown
        components={{
          h2: ({ ...props }) => (
            <h2
              className="text-2xl font-semibold mt-8 mb-4"
              style={{ color: '#1d1d1f', letterSpacing: '-0.015em' }}
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="text-xl font-semibold mt-6 mb-3"
              style={{ color: '#1d1d1f', letterSpacing: '-0.01em' }}
              {...props}
            />
          ),
          p: ({ ...props }) => (
            <p
              className="leading-relaxed mb-4"
              style={{ color: '#6e6e73' }}
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul
              className="list-disc pl-6 mb-4 space-y-2"
              style={{ color: '#6e6e73' }}
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className="list-decimal pl-6 mb-4 space-y-2"
              style={{ color: '#6e6e73' }}
              {...props}
            />
          ),
          li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
          strong: ({ ...props }) => (
            <strong
              className="font-semibold"
              style={{ color: '#1d1d1f' }}
              {...props}
            />
          ),
          code: ({ ...props }) => (
            <code
              className="px-1.5 py-0.5 rounded-md font-mono text-sm"
              style={{
                background: '#f5f5f7',
                color: '#0071e3',
                border: '1px solid #e5e5ea',
              }}
              {...props}
            />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="pl-4 italic my-6"
              style={{
                borderLeft: '3px solid #0071e3',
                color: '#6e6e73',
              }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
