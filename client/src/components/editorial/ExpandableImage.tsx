import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ExpandableImageProps = {
  src: string;
  alt: string;
  caption: string;
  hint?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  className?: string;
};

export function ExpandableImage({ src, alt, caption, hint = "View larger", width, height, loading = "lazy", className }: ExpandableImageProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <button ref={triggerRef} type="button" className={`expandable-image${className ? ` ${className}` : ""}`} onClick={() => setOpen(true)} aria-label={`Open larger image: ${caption}`} aria-haspopup="dialog">
        <img src={src} alt={alt} loading={loading} width={width} height={height} />
        <span className="expandable-image__hint" aria-hidden="true">{hint}</span>
      </button>
      {open && createPortal(
        <div className="image-lightbox" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <section className="image-lightbox__dialog" role="dialog" aria-modal="true" aria-label={caption}>
            <header><span>Implementation evidence</span><button ref={closeRef} type="button" onClick={close} aria-label="Close enlarged image">Close ×</button></header>
            <figure><img src={src} alt={alt} /><figcaption>{caption}</figcaption></figure>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}
