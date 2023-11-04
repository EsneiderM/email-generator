function letterAleatory(opc) {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz'; // Letras minúsculas del alfabeto
    const indice = Math.floor(Math.random() * alfabeto.length);
    return opc === 0 ? alfabeto.charAt(indice) : alfabeto.charAt(indice).toUpperCase();
}

function numberAleatory() {
    return Math.floor(Math.random() * 10);
}

export const generateAleatoryEmails = (data) => {
    let settings = [];
    if (data.add_letters_upper === "on") settings.push("upper");
    if (data.add_letters_lower === "on") settings.push("lower");
    if (data.add_numbers === "on") settings.push("number");
    let tricks = [];
    if (data.dot_trick === "on") tricks.push("dot");
    if (data.plus_trick === "on") tricks.push("plus");

    let correos = [...Array.from({ length: Number(data.quantity_email) })].map((e) => {
        let correo = [...Array.from({ length: Number(data.length_email) })].map((e) => {
            const settingAleatory = Math.floor(Math.random() * settings.length);
            const trickAleatory = Math.floor(Math.random() * tricks.length);

            if (settings[settingAleatory] === "upper") {
                return letterAleatory(1);
            }

            if (settings[settingAleatory] === "lower") {
                return letterAleatory(0);
            }

            if (settings[settingAleatory] === "number") {
                return numberAleatory();
            }
        })
        return correo.join("");
    })
    return correos.map((e)=> `${e}@${data.domain_email}`)
}

// {
//     "length_email": "5",
//     "quantity_email": "5",
//     "add_letters_upper": "on",
//     "add_letters_lower": "on",
//     "add_numbers": "on",
//     "dot_trick": "dot",
//     "plus_trick": "plus"
// }