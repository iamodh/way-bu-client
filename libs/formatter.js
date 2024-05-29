export function addCommaintoMoney(money) {
  const formattedMoney =
    (money + "").slice(0, (money + "").length - 3) +
    "," +
    (money + "").slice((money + "").length - 3, (money + "").length);
  return formattedMoney;
}
