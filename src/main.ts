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
const currencyWrapper = document.querySelector(
  ".currency_wrapper",
) as HTMLDivElement;
const currencyButton = document.querySelector(".currency") as HTMLSpanElement;

const currencyDisplay = document.querySelector(".toggle") as HTMLSpanElement;

const inputs = document.querySelectorAll(
  ".main_inputs",
) as NodeListOf<HTMLInputElement>;

interface mortgageInputs {
  mortgageAmount: number;
  mortgageTerm: number;
  mortgageRate: number;
  mortgageType: "repayment" | "interest";
}

function getFormData(): mortgageInputs | null {
  const mortgage = parseFloat(mortgageInput.value);
  const term = parseInt(termInput.value);
  const rate = parseFloat(rateInput.value);

  const type = (
    document.querySelector('[name ="type"]:checked') as HTMLInputElement
  ).id;

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

let format: "en-US" | "ka-GE" | "en-GB" = "en-GB";

function getCurrency() {
  if (format === "en-US") return "USD";
  if (format === "ka-GE") return "GEL";
  return "GBP";
}

function updateResults() {
  const formatter = new Intl.NumberFormat(format, {
    style: "currency",
    currency: getCurrency(),
  });

  monthlySum.textContent = formatter.format(monthlyPayment);
  totalSum.textContent = formatter.format(totalPayment);
}

function calculateMortgage(e: Event) {
  e.preventDefault();

  const data = getFormData();

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
  } else {
    monthlyPayment = (mortgageAmount * (mortgageRate / 100)) / 12;
  }
  totalPayment = monthlyPayment * totalNumPayment;

  primaryChild.classList.add("hidden");
  resultHtml.classList.remove("hidden");

  updateResults();
}

function clear() {
  form.reset();

  format = "en-GB";
  currencyDisplay.textContent = "£";

  primaryChild.classList.remove("hidden");
  resultHtml.classList.add("hidden");

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

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement?.classList.add("active");
  });
});

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    input.parentElement?.classList.remove("active");
  });
});

document.addEventListener("click", (e: Event) => {
  const clickedEle: any = e.target;

  if (clickedEle?.classList.contains("main_inputs")) {
    return;
  } else {
    inputs.forEach((input) => {
      input.parentElement?.classList.remove("active");
    });
  }
});

form.addEventListener("submit", calculateMortgage);

clearBtn.addEventListener("click", clear);

currencyWrapper.addEventListener("click", (e: Event) => {
  const clicked = e.target as HTMLElement;
  const value = clicked.id;

  if (value === "USD") {
    format = "en-US";
    currencyDisplay.textContent = "$";
  }

  if (value === "GEL") {
    format = "ka-GE";
    currencyDisplay.textContent = "₾";
  }

  if (value === "GBP") {
    format = "en-GB";
    currencyDisplay.textContent = "£";
  }

  if (monthlyPayment > 0) {
    updateResults();
  }
  currencyWrapper.classList.remove("show");
});

currencyButton.addEventListener("click", () => {
  currencyWrapper.classList.toggle("show");
});
