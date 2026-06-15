//  https://www.figma.com/design/2sEdZKMltXKCalHGx4AJwT/mortgage-repayment-calculator?node-id=7-2&p=f&t=SRl4UkkD6nXG8XL5-0

const form = document.querySelector("form") as HTMLFormElement;
const clearBtn = document.querySelector(".clear") as HTMLButtonElement;
const calculateBtn = document.querySelector(".calc") as HTMLButtonElement;
const termInput = document.getElementById("term") as HTMLInputElement;
const rateInput = document.getElementById("rate") as HTMLInputElement;
const mortgageInput = document.getElementById(
  "mortgage_amount",
) as HTMLInputElement;

const monthlySum = document.getElementById("monthly_sum") as HTMLSpanElement;
const totalSum = document.getElementById("total_sum") as HTMLSpanElement;
const primaryChild = document.querySelector(".child") as HTMLDivElement;
const resultHtml = document.querySelector(".result") as HTMLDivElement;

interface mortgageInputs {
  mortgageAmount: number;
  mortgageTerm: number;
  mortgageRate: number;
  mortgageType: "repayment" | "interest";
}

form.addEventListener("submit", (e: Event): mortgageInputs | null => {
  e.preventDefault();

  const mortgage = parseFloat(mortgageInput.value);
  const term = parseInt(termInput.value);
  const rate = parseFloat(rateInput.value);

  const type = (
    document.querySelector('[name ="type"]:checked') as HTMLInputElement
  ).id;
  console.log(type);

  if (isNaN(mortgage) || isNaN(term) || isNaN(rate)) {
    return null;
  }

  const formData = {
    mortgageAmount: mortgage,
    mortgageTerm: term,
    mortgageRate: rate,
    mortgageType: type as "repayment" | "interest",
  };

  return formData;
});
