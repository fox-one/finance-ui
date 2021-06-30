import BigNumber from 'bignumber.js';

export function getDefaultPercision(n: string | number) {
  const v = new BigNumber(n);
  return v.gt(1e4) ? 2 : v.gt(1) ? 4 : v.gt(1e-4) ? 8 : 12;
}

export function format({
  n,
  p,
  mp,
}: {
  n: string | number;
  p?: number;
  mp?: number;
}): string {
  const v = new BigNumber(n);
  let dp = p || getDefaultPercision(n);
  if (mp) {
    dp = Math.min(dp, mp);
  }
  if (v.dp() > dp) {
    return v.decimalPlaces(dp, 1).toString();
  }
  return v.toString();
}

export function transfer(
  from: number,
  to: number,
  amount: string | number,
  quantity: string | number,
  mp: number,
) {
  const value = new BigNumber(amount)
    .times(quantity)
    .times(from)
    .div(to);
  return format({ n: value.toString(), mp });
}