export function Tag(props) {
    
  var tagClass = "";
  switch (props.children) {
    case 'Mobile':
      tagClass = "mobile";
      break;
    case 'Product Design':
      tagClass = "product-design";
      break;
    case 'UX/UI':
      tagClass = "uxui";
      break;
    case 'Coming Soon':
      tagClass = "coming-soon";
      break;
    case 'NDA':
      tagClass = "nda";
      break;
    default:
      tagClass = "";
  }

  return (
    <>
      <div className={`tag ${props.className} ${tagClass}`}>{ props.children }</div>
    </>
  );
}
