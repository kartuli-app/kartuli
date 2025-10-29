export const printCurrentTime = () => {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const milliseconds = now.getMilliseconds();
  console.log(`\ncurrent time: ${minutes}:${seconds}.${milliseconds}`);
};
