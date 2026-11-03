export default function decorateWithPagePadding<P extends object>(
  ComponentToDecorate: React.ComponentType<P>
) {
  return function WithPadding(props: P) {
    return (
      <div className="p-10">
        <ComponentToDecorate {...(props as P)} />
      </div>
    );
  };
}
