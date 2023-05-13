export function Tag(props) {
  return (
    <>
      <div className={`tag ${props.className}`}>{ props.children }</div>
    </>
  );
}
