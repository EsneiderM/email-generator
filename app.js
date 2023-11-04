import { generateAleatoryEmails } from "./modules/generateEmail.js";

const d = document;
const $ = (e) => d.querySelector(e);
const $a = (e) => d.querySelectorAll(e);

export const app = (e) => {
    let path = window.location.pathname.split(".")[0];
    if (path === "/index") {
        document.title = "Generador Correos";

        if ($("#aleatory_email").checked) {
            $("#form-container").insertAdjacentHTML("beforeend", "<aleatory-email-component></aleatory-email-component>");
        }

        d.addEventListener("submit", (e) => {
            // ALEATORY EMAILS
            if (e.target.matches("#generate-aleatory-emails")) {
                e.preventDefault();
                $("#email_response").innerHTML = "";
                let data = Object.fromEntries(new FormData(e.target));
                if (!data.length_email && !isNaN(data.length_email)) {
                    alert("Longitud del email es requerido");
                } else if (!data.quantity_email && !isNaN(data.length_email)) {
                    alert("Cantidad es requerida");
                } else {
                    if (!(Number(data.length_email) > 3 && Number(data.length_email) <= 40)) {
                        alert("Longitud no valida");
                    } else if (!(Number(data.quantity_email) <= 100)) {
                        alert("Cantidad no valida");
                    } else if (!(/^[a-z0-9.-]+\.[a-z]{2,6}$/.test(data.domain_email))) {
                        alert("Dominio invalido, no agregues @");
                    } else {
                        let correos = generateAleatoryEmails(data);
                        correos.forEach((e) => {
                            $("#email_response").insertAdjacentHTML("beforeend", `<li>${e}</li>`);
                        })
                    }
                }
            }


        })

        d.addEventListener("input", (e) => {
            if (e.target.matches("[name='type_email']")) {
                $("#form-container").innerHTML = "";
                if (e.target.matches("#aleatory_email")) {
                    $("#form-container").insertAdjacentHTML("beforeend", "<aleatory-email-component></aleatory-email-component>")
                }
                if (e.target.matches("#human_email")) {

                }
                if (e.target.matches("#custom_email")) {

                }

            }
        })

        d.addEventListener("click", (e) => {
            if (e.target.matches("#settings input[type='checkbox']")) {
                let checkSelected = [...$a("#settings input[type='checkbox']")].filter((checkbox) => checkbox.checked);
                if (checkSelected.length === 0) {
                    e.target.checked = true;
                }
            }
        })

    }

}