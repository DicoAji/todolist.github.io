(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

ScrollReveal({ reset: true });


ScrollReveal().reveal(".slide-right", {
  duration: 3000,
  origin: "left",
  distance: "300px",
  // easing: "ease-in-out"
});
ScrollReveal().reveal(".slide-left", {
  duration: 3000,
  origin: "right",
  distance: "300px",
  // easing: "ease-in-out"
});
ScrollReveal().reveal(".slide-top", {
  duration: 3000,
  origin: "bottom",
  distance: "300px",
  // easing: "ease-in-out"
});
ScrollReveal().reveal(".slide-bottom", {
  duration: 3000,
  origin: "top",
  distance: "300px",
  // easing: "ease-in-out"
});

ScrollReveal().reveal(".slide-up", {
  duration: 3000,
  origin: "bottom",
  distance: "100px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
  scale: 0.5
});

