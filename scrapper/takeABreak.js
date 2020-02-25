export default function takeABreak(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
