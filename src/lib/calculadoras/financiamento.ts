import Decimal from 'decimal.js';

export function calculateFinancing(
  totalValue: number,
  downPayment: number,
  annualRate: number,
  months: number,
  system: 'SAC' | 'PRICE' = 'SAC'
) {
  const principal = new Decimal(totalValue).minus(downPayment);
  const monthlyRate = new Decimal(annualRate).div(100).div(12);
  
  const schedule = [];
  let balance = principal;
  let totalPaid = new Decimal(0);
  let totalInterest = new Decimal(0);

  if (system === 'PRICE') {
    // Formula: PMT = P * [i * (1 + i)^n] / [(1 + i)^n - 1]
    const pmt = principal.times(
      monthlyRate.times(monthlyRate.plus(1).pow(months))
      .div(monthlyRate.plus(1).pow(months).minus(1))
    );

    for (let i = 1; i <= months; i++) {
      const interest = balance.times(monthlyRate);
      const amortization = pmt.minus(interest);
      balance = balance.minus(amortization);
      
      totalPaid = totalPaid.plus(pmt);
      totalInterest = totalInterest.plus(interest);

      if (i <= 12 || i % 12 === 0 || i === months) {
        schedule.push({
          month: i,
          payment: pmt.toNumber(),
          interest: interest.toNumber(),
          amortization: amortization.toNumber(),
          balance: Math.max(0, balance.toNumber()),
        });
      }
    }
  } else {
    // SAC: Amortization is constant
    const amortization = principal.div(months);

    for (let i = 1; i <= months; i++) {
      const interest = balance.times(monthlyRate);
      const pmt = amortization.plus(interest);
      balance = balance.minus(amortization);
      
      totalPaid = totalPaid.plus(pmt);
      totalInterest = totalInterest.plus(interest);

      if (i <= 12 || i % 12 === 0 || i === months) {
        schedule.push({
          month: i,
          payment: pmt.toNumber(),
          interest: interest.toNumber(),
          amortization: amortization.toNumber(),
          balance: Math.max(0, balance.toNumber()),
        });
      }
    }
  }

  return {
    principal: principal.toNumber(),
    totalPaid: totalPaid.toNumber(),
    totalInterest: totalInterest.toNumber(),
    firstPayment: schedule[0].payment,
    lastPayment: schedule[schedule.length - 1].payment,
    schedule,
  };
}
