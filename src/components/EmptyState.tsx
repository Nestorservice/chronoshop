type EmptyStateProps = {
  title: string;
  text: string;
};

function EmptyState({ title, text }: EmptyStateProps) {
  return (
    <div className="text-center flex items-center flex-col pt-10 px-2">
      <svg data-testid="shopping-cart-icon" className="mb-4">
        <use xlinkHref="/shopping-cart.svg#img"></use>
      </svg>
      <h2 className="font-semibold text-indigo-800 mb-1">{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default EmptyState;
