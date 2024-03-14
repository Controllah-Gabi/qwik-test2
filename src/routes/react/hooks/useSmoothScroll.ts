/** @jsxImportSource react */
type SmoothScroll = (
  scrollOffset: number,
  ref: React.RefObject<HTMLElement>,
) => void;

export const smoothScroll: SmoothScroll = (scrollOffset, ref) => {
  if (!ref.current) {
    return; // Element is not attached to the ref
  }

  const start = ref.current.scrollLeft;
  const target = start + scrollOffset;
  const duration = 200; // Set the duration of the scrolling animation (in milliseconds)
  const startTime = performance.now();

  const scrollStep = (timestamp: number) => {
    const currentTime = timestamp - startTime;
    if (currentTime < duration) {
      const progress = currentTime / duration;
      const ease = 0.5 * (1 - Math.cos(Math.PI * progress)); // Smooth easing function
      const scrollPosition = start + scrollOffset * ease;
      ref.current!.scrollLeft = scrollPosition; // Non-null assertion since we check at the start
      requestAnimationFrame(scrollStep);
    } else {
      ref.current!.scrollLeft = target; // Ensure we reach the target position precisely
    }
  };

  requestAnimationFrame(scrollStep);
};
