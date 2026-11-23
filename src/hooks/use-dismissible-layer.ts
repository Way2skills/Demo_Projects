import { useEffect, type RefObject } from "react";

type LayerRef = RefObject<HTMLElement | null>;

export default function useDismissibleLayer(
  active: boolean,
  contentRef: LayerRef,
  onDismiss: () => void,
  triggerRef?: LayerRef,
) {
  useEffect(() => {
    if (!active) {
      return;
    }

    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Node)) {
        return;
      }

      const eventPath = event.composedPath();
      if (
        (contentRef.current &&
          (contentRef.current.contains(event.target) ||
            eventPath.includes(contentRef.current))) ||
        (triggerRef?.current &&
          (triggerRef.current.contains(event.target) ||
            eventPath.includes(triggerRef.current)))
      ) {
        return;
      }

      onDismiss();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onDismiss();
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, contentRef, onDismiss, triggerRef]);
}
