type ButtonProps = {
  text: Number,
};

export function Button(props: ButtonProps) {
  return (
    <button>{props.text}</button>
  );
}