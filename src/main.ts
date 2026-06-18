//  https://www.figma.com/design/2sEdZKMltXKCalHGx4AJwT/mortgage-repayment-calculator?node-id=7-2&p=f&t=SRl4UkkD6nXG8XL5-0

const form = document.querySelector("form") as HTMLFormElement;
const clearBtn = document.querySelector(".clear") as HTMLButtonElement;
const calculateBtn = document.querySelector(".calc") as HTMLButtonElement;
const termInput = document.getElementById("term") as HTMLInputElement;
const rateInput = document.getElementById("rate") as HTMLInputElement;
const mortgageInput = document.getElementById(
  "mortgage_amount"
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

const pounds = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function getFormData(): mortgageInputs | null {
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
}

let monthlyPayment: number = 0;
let totalPayment: number = 0;

function calculateMortgage(e: Event) {
  e.preventDefault();
  const data = getFormData();
  console.log(data);

  if (!data) {
    return;
  }
  const { mortgageAmount, mortgageTerm, mortgageRate, mortgageType } = data;

  const monthlyRate = mortgageRate / 100 / 12;
  const totalNumPayment = mortgageTerm * 12;

  if (mortgageType === "repayment") {
    monthlyPayment =
      mortgageAmount *
      ((monthlyRate * (1 + monthlyRate) ** totalNumPayment) /
        ((1 + monthlyRate) ** totalNumPayment - 1));
    // console.log(monthlyPayment);
    totalPayment = monthlyPayment * totalNumPayment;
  }

  pounds.format(monthlyPayment);
  console.log(pounds.format(monthlyPayment));
  console.log(pounds.format(totalPayment));
}

form.addEventListener("submit", calculateMortgage);
