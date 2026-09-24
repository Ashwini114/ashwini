export default function Caret({ hidden = false }: { hidden?: boolean }) {
  return <span className={`caret${hidden ? " caret-off" : ""}`} aria-hidden="true" />;
}
