// Function to show the sidebar
function showSidebar() {
  document.querySelector(".sidebar").style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Function to hide the sidebar
function hideSidebar() {
  document.querySelector(".sidebar").style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Add event listeners to close the sidebar when a link is clicked
document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", hideSidebar);
});

const loanAmountSlider = document.getElementById("loanAmount");
const loanPeriodSlider = document.getElementById("loanPeriod");
const amountBubble = document.getElementById("amountBubble");
const periodBubble = document.getElementById("periodBubble");
const monthlyPaymentDisplay = document.getElementById("monthlyPayment");
const totalInterestDisplay = document.getElementById("totalInterest");
const totalRepaymentDisplay = document.getElementById("totalRepayment");
const initiationFeeDisplay = document.getElementById("initiationFee");
const adminFeeDisplay = document.getElementById("adminFee");

const adminFeePerMonth = 60;
const interestRate = 0.03; // 3% interest rate per month

function calculateInitiationFee(loanAmount) {
  let initiationFee = 0;
  if (loanAmount <= 1000) {
    initiationFee = Math.min(0.15 * loanAmount, 200); // Cap at R200
  } else if (loanAmount <= 10000) {
    initiationFee = Math.min(0.15 * loanAmount, 300); // Cap at R300
  } else {
    initiationFee = Math.min(0.15 * loanAmount, 1000); // Cap at R1000
  }
  return initiationFee;
}

function setBubblePosition(slider, bubble) {
  const val = slider.value;
  const min = slider.min ? slider.min : 0;
  const max = slider.max ? slider.max : 100;
  const newVal = ((val - min) * 100) / (max - min);
  bubble.innerHTML = `R ${val}`;
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

function setPeriodBubblePosition(slider, bubble) {
  const val = slider.value;
  const min = slider.min ? slider.min : 0;
  const max = slider.max ? slider.max : 100;
  const newVal = ((val - min) * 100) / (max - min);
  bubble.innerHTML = `${val} Month${val > 1 ? "s" : ""}`;
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

function calculateLoan() {
  const loanAmount = parseInt(loanAmountSlider.value);
  const loanPeriod = parseInt(loanPeriodSlider.value);

  const initiationFee = calculateInitiationFee(loanAmount);
  const totalAdminFee = adminFeePerMonth * loanPeriod;
  const interest = loanAmount * interestRate * loanPeriod;
  const totalRepayment = loanAmount + interest + initiationFee + totalAdminFee;
  const monthlyPayment = totalRepayment / loanPeriod;

  monthlyPaymentDisplay.textContent = monthlyPayment.toFixed(2);
  totalInterestDisplay.textContent = (
    interest +
    initiationFee +
    totalAdminFee
  ).toFixed(2);
  totalRepaymentDisplay.textContent = totalRepayment.toFixed(2);
  initiationFeeDisplay.textContent = initiationFee.toFixed(2);
  adminFeeDisplay.textContent = totalAdminFee.toFixed(2);

  setBubblePosition(loanAmountSlider, amountBubble);
  setPeriodBubblePosition(loanPeriodSlider, periodBubble);
}

loanAmountSlider.addEventListener("input", calculateLoan);
loanPeriodSlider.addEventListener("input", calculateLoan);

// Initial calculation and bubble positioning
calculateLoan();
