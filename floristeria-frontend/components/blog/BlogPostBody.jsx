import Link from "next/link";
import ReactMarkdown from "react-markdown";

const markdownComponents = {
  h2: ({ children }) => (
    <h2 className="text-2xl sm:text-3xl font-serif text-foreground mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-serif text-foreground mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-muted leading-relaxed mb-5">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-2 mb-6 text-muted">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-2 mb-6 text-muted">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-rose pl-5 py-2 my-8 bg-rose-light/50 rounded-r-xl text-foreground italic">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  a: ({ href, children }) => {
    const isInternal = href?.startsWith("/");
    const className =
      "text-rose font-medium hover:underline underline-offset-2";

    if (isInternal) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
};

export default function BlogPostBody({ content }) {
  return (
    <div className="blog-content">
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
  );
}
