export default function wait(delayInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayInMs));
}
