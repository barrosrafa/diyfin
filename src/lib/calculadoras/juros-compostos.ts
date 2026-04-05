export function calculateCompoundInterest(
  capital: number,
  monthlyContribution: number,
  rate: number,
  time: number,
  timeUnit: 'months' | 'years' = 'months'
) {
  const periods = timeUnit === 'years' ? time * 12 : time;
  const monthlyRate = rate / 100;
  
  let total = capital;
  const data = [];
  
  for (let i = 1; i <= periods; i++) {
    const interest = total * monthlyRate;
    total += interest + monthlyContribution;
    
    data.push({
      month: i,
      total: Number(total.toFixed(2)),
      invested: Number((capital + monthlyContribution * i).toFixed(2)),
      interest: Number((total - (capital + monthlyContribution * i)).toFixed(2)),
    });
  }
  
  return {
    total,
    totalInvested: capital + monthlyContribution * periods,
    totalInterest: total - (capital + monthlyContribution * periods),
    data,
  };
}
