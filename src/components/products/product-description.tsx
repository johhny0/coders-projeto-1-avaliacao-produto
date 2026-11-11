import sanitizeHtml from "sanitize-html";
import { cn } from "cn";

interface ProductDescriptionProps {
  description: string;
  className?: string;
}

const HTML_TAG_PATTERN = /<\/?[a-z][^>]*>/i;

const richTextClassName = [
  "[&_p]:mb-4 [&_p:last-child]:mb-0",
  "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5",
  "[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5",
  "[&_li]:mb-1",
  "[&_a]:text-ink [&_a]:underline",
  "[&_strong]:font-semibold [&_strong]:text-ink",
  "[&_h1]:mb-3 [&_h1]:font-display [&_h1]:text-2xl [&_h1]:font-bold",
  "[&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold",
  "[&_h3]:mb-2 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold",
  "[&_blockquote]:mb-4 [&_blockquote]:border-l-2 [&_blockquote]:border-rule [&_blockquote]:pl-4 [&_blockquote]:italic",
  "[&_img]:my-4 [&_img]:max-w-full [&_img]:rounded",
  "[&_hr]:my-6 [&_hr]:border-rule",
  "[&_table]:mb-4 [&_table]:w-full [&_table]:border-collapse",
  "[&_td]:border [&_td]:border-rule [&_td]:p-2",
  "[&_th]:border [&_th]:border-rule [&_th]:p-2 [&_th]:text-left",
].join(" ");

function sanitizeDescription(description: string): string {
  return sanitizeHtml(description, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noopener noreferrer",
      }),
      img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }),
    },
  });
}

export function ProductDescription({
  description,
  className,
}: ProductDescriptionProps) {
  const containsHtml = HTML_TAG_PATTERN.test(description);

  if (!containsHtml) {
    return <p className={className}>{description}</p>;
  }

  return (
    <div
      className={cn(richTextClassName, className)}
      dangerouslySetInnerHTML={{ __html: sanitizeDescription(description) }}
    />
  );
}
