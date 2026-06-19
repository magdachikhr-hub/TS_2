//  https://www.figma.com/design/2sEdZKMltXKCalHGx4AJwT/mortgage-repayment-calculator?node-id=7-2&p=f&t=SRl4UkkD6nXG8XL5-0

const form = document.querySelector("form") as HTMLFormElement;
const clearBtn = document.querySelector(".clear") as HTMLButtonElement;
// const calculateBtn = document.querySelector(".calc") as HTMLButtonElement;
const termInput = document.getElementById("term") as HTMLInputElement;
const rateInput = document.getElementById("rate") as HTMLInputElement;
const mortgageInput = document.getElementById(
  "mortgage_amount",
) as HTMLInputElement;

const monthlySum = document.getElementById("monthly_sum") as HTMLSpanElement;
const totalSum = document.querySelector(".total_sum") as HTMLSpanElement;
const primaryChild = document.querySelector(".child") as HTMLDivElement;
const resultHtml = document.querySelector(".results") as HTMLDivElement;
console.log(totalSum);

const inputs = document.querySelectorAll(
  ".main_inputs",
) as NodeListOf<HTMLInputElement>;

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
  // console.log(type);

  mortgageInput.parentElement?.classList.remove("error");
  termInput.parentElement?.classList.remove("error");
  rateInput.parentElement?.classList.remove("error");

  let hasError = false;

  if (isNaN(mortgage)) {
    hasError = true;
    mortgageInput.parentElement?.classList.add("error");
  }
  if (isNaN(term)) {
    hasError = true;
    termInput.parentElement?.classList.add("error");
  }
  if (isNaN(rate)) {
    hasError = true;
    rateInput.parentElement?.classList.add("error");
  }

  if (hasError === true) {
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
  } else {
    monthlyPayment = (mortgageAmount * (mortgageRate / 100)) / 12;
  }
  totalPayment = monthlyPayment * totalNumPayment;

  primaryChild.classList.add("hidden");
  resultHtml.classList.remove("hidden");

  monthlySum.textContent = pounds.format(monthlyPayment);
  totalSum.textContent = pounds.format(totalPayment);
}

function clear() {
  form.reset();
  primaryChild.classList.remove("hidden");
  resultHtml.classList.add("hidden");

  // reset(termInput);
  // reset(mortgageInput);
  // reset(rateInput);

  //another way
  // [termInput, mortgageInput, rateInput].forEach((input) => {
  //   input.parentElement?.classList.remove("error");
  // });

  //another way 3
  inputs.forEach((i) => {
    i.parentElement?.classList.remove("error");
  });
}

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    setTimeout(() => {
      input.parentElement?.classList.remove("error");
    }, 300);
  });
});

// let focusedInput;

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    // focusedInput = input;
    input.parentElement?.classList.add("active");
  });
});

document.addEventListener("click", (e: Event) => {
  const clickedEle: any = e.target;
  console.log(clickedEle);

  if (clickedEle?.classList.contains("main_inputs")) {
    console.log("clicked");
    return;
  } else {
    inputs.forEach((input) => {
      input.parentElement?.classList.remove("active");
    });
  }
});

form.addEventListener("submit", calculateMortgage);

clearBtn.addEventListener("click", clear);

// function reset(input: HTMLInputElement): void {
//   input.parentElement?.classList.remove("error");
// }
