export function ContentsOutline() {
  return (
    <>
      <div>
        Table of Contents:
        <ul>
          {headings.map((heading) => (
            <li key={heading.value}>{heading.value}</li>
          ))}
        </ul>
      </div>
    </>
  );
}


