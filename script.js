// script.js - small interactive behaviors

// Set current year in footer
document.addEventListener('DOMContentLoaded', function () {
  const y = new Date().getFullYear();
  const yEl = document.getElementById('year');
  const y2El = document.getElementById('year2');
  if (yEl) yEl.textContent = y;
  if (y2El) y2El.textContent = y;
});

/**
 * handleDonate - form submit handler for donation page.
 * This example is a simulation: no real payment provider is connected.
 */
function handleDonate(evt) {
  evt.preventDefault();
  const form = evt.target;
  const name = form.donorName.value.trim();
  const email = form.donorEmail.value.trim();
  const radios = form.amount;
  let amount = null;

  // check radio amounts first
  if (radios) {
    if (radios.length) {
      for (const r of radios) { if (r.checked) { amount = r.value; break; } }
    } else {
      if (radios.checked) amount = radios.value;
    }
  }

  // if user entered other amount, prefer that if > 0
  const other = Number(form.otherAmount.value);
  if (other && other > 0) amount = other;

  if (!amount) {
    alert('Please select or enter an amount to donate.');
    return false;
  }

  // simulate payment flow
  const purpose = form.purpose.value;
  const message = form.message.value || '';

  // Show success message (simulate)
  const success = document.getElementById('donationSuccess');
  if (success) {
    success.classList.remove('hidden');
    success.innerHTML = `<strong>Thank you, ${escapeHtml(name || 'Donor')}!</strong>
      <p>We've received your simulated donation of ₹${escapeHtml(amount)} for <em>${escapeHtml(purpose)}</em>.</p>
      <p>We will email a receipt to <strong>${escapeHtml(email)}</strong>.</p>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // reset form
  form.reset();
  return false;
}

// simple escape to avoid injecting HTML
function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}



// Handle form submit
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".user-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent real submit
    alert("Thank you! Your details have been submitted.");
    form.reset(); // clear form after submit
  });
});

//contact ke liye

// Wait for the DOM to load
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Stop form from refreshing page

    emailjs.sendForm(
        "service_jmnwwt9",     // Replace with EmailJS service ID
        "template_b42grbe",    // Replace with EmailJS template ID
        "#contact-form",       // ID of your form
        "8V89icQDq3cIrRbxo"      // Replace with EmailJS public key
    )
    .then(function(response) {
        alert("Message sent successfully ✅");
        console.log("SUCCESS!", response.status, response.text);
        document.getElementById("contact-form").reset(); // Clear form after success
    }, function(error) {
        alert("Failed to send message ❌");
        console.error("FAILED...", error);
    });
});

