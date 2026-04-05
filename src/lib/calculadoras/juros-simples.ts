export function calculateSimpleInterest(capital: number, rate: number, time: number) {
  const interest = capital * (rate / 100) * time;
  const total = capital + interest;
  return {
    interest,
    total,
  };
}
