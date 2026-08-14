"use strict";

/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#primary-menu");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Open navigation menu"
                : "Close navigation menu"
        );

        navigation.classList.toggle("is-open");
    });


    /* Close menu after selecting a link */

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            navigation.classList.remove("is-open");
        });

    });

}


/* =========================================
   ACCESSIBLE CONTACT FORM
========================================= */

const contactForm =
    document.querySelector("#contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        let valid = true;

        const fields = [
            {
                id: "name",
                message: "Please enter your name."
            },
            {
                id: "email",
                message: "Please enter a valid email address."
            },
            {
                id: "subject",
                message: "Please enter a subject."
            },
            {
                id: "message",
                message: "Please enter your message."
            }
        ];


        fields.forEach(field => {

            const input =
                document.querySelector(`#${field.id}`);

            const error =
                document.querySelector(`#${field.id}-error`);

            if (!input || !error) {
                return;
            }

            error.textContent = "";

            input.removeAttribute("aria-invalid");


            if (!input.value.trim()) {

                valid = false;

                input.setAttribute(
                    "aria-invalid",
                    "true"
                );

                error.textContent = field.message;
            }


            if (
                field.id === "email" &&
                input.value.trim()
            ) {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(input.value)) {

                    valid = false;

                    input.setAttribute(
                        "aria-invalid",
                        "true"
                    );

                    error.textContent =
                        "Please enter a valid email address.";
                }
            }

        });


        const status =
            document.querySelector("#form-status");


        if (!valid) {

            status.textContent =
                "Please correct the errors in the form.";

            const firstInvalid =
                contactForm.querySelector(
                    '[aria-invalid="true"]'
                );

            if (firstInvalid) {
                firstInvalid.focus();
            }

            return;
        }


        status.textContent =
            "Thank you! Your message has been submitted successfully.";

        contactForm.reset();

    });

}