




document.addEventListener("DOMContentLoaded", () => {



  /* ================= COMMON ELEMENTS ================= */
  const hero = document.querySelector(".hero")
  const form = document.getElementById("contactForm");
  const successBox = document.getElementById("formSuccess");
  const menuBtn = document.getElementById("menuBtn");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeBtn");

  if (hero) {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    reveals.forEach(el => observer.observe(el));
  }
  /* ================= MOBILE MENU (ALL PAGES) ================= */

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop page reload

      let valid = true;

      // get fields
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      // const message = document.getElementById("msg");

      // reset error states
      [name, email].forEach(field => {
        field.classList.remove("error");
        if (!field.value.trim()) {
          field.classList.add("error");
          valid = false;
        }
      });

      if (!valid) return; // stop submit if invalid

      // Send form data
      const formData = new FormData(form);

      try {
        await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        // Show success message
        successBox.style.display = "block";
        form.reset();

      } catch (error) {
        successBox.innerText = "Something went wrong. Please try again.";
        successBox.style.color = "white";
        successBox.style.background = "transparent";
        successBox.style.display = "block";
      }
    });


  }

  if (menuBtn && sideMenu && overlay && closeBtn) {
    menuBtn.addEventListener("click", () => {
      sideMenu.classList.add("active");
      overlay.classList.add("active");
      console.log("Worked");
    });

    function closeMenu() {
      sideMenu.classList.remove("active");
      overlay.classList.remove("active");
    }

    overlay.addEventListener("click", closeMenu);
    closeBtn.addEventListener("click", closeMenu);

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        closeMenu();
      }
    });
  }

  /* ================= CONTACT PAGE LOGIC ================= */

  const reson = document.querySelector("#reason");

  if (reson) {
    const label = document.querySelector("#la");
    const budgetfield = document.querySelector(".budgetfield");
    const webtypefield = document.querySelector(".webtype");

    const updatelabel = () => {
      if (reson.value === "project") {
        label.innerText = "Describe your project";
        budgetfield.style.display = "block";
        webtypefield.style.display = "block";
        // form.reset();

      } else if (reson.value === "support") {
        label.innerText = "Describe the issue";
        budgetfield.style.display = "none";
        webtypefield.style.display = "none";
        // form.reset();

      } else if (reson.value === "question") {
        label.innerText = "What would you like to ask ?";
        budgetfield.style.display = "none";
        webtypefield.style.display = "none";
        // form.reset();

      } else if (reson.value === "feedback") {
        label.innerText = "Share your feedback";
        budgetfield.style.display = "none";
        webtypefield.style.display = "none";
        // form.reset();

      }
    };

    const params = new URLSearchParams(window.location.search);
    const reasonFromURL = params.get("from");

    if (reasonFromURL) {
      reson.value = reasonFromURL;
    }

    updatelabel();
    reson.addEventListener("change", updatelabel);
  }

});
