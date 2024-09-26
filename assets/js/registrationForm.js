window.onload = () => {
  let form = document.querySelector("#registration_form");
  /*--------------------email-----------------------------------*/
  if (form !== null) {
    let email = form.querySelector("#registration_form_email");
    email.addEventListener("blur", function () {
      validEmail(this);
    });
    email.addEventListener("focus", function (e) {
      cleanEmail(this, e);
    });

    /*--------------------pseudo-------------------------------------*/
    let pseudo = form.querySelector("#registration_form_pseudo");
    pseudo.addEventListener("blur", function () {
      validPseudo(this);
    });
    pseudo.addEventListener("focus", function (e) {
      cleanPseudo(this, e);
    });
    /*--------------------password-----------------------------------*/
    let password = document.querySelector("#registration_form_plainPassword");
    password.addEventListener("blur", function () {
      validPassword(this);
    });
    password.addEventListener("focus", function (e) {
      cleanPassword(this, e);
    });
    /*---------------------code postal----------------------------------*/
    let zip = form.querySelector("#registration_form_zip");
    zip.addEventListener("blur", function () {
      validZip(this);
    });
    zip.addEventListener("focus", function (e) {
      cleanZip(this, e);
    });
    /*---------------------ville------------------------------------*/
    let city = form.querySelector("#registration_form_city");
    city.addEventListener("blur", function () {
      validCity(this);
    });
    city.addEventListener("focus", function (e) {
      cleanCity(this, e);
    });
    /*---------------------checkbox---------------------------------*/
    let agree = form.querySelector("#registration_form_agreeTerms");
    agree.addEventListener("click", function () {
      cleanAgree(this);
    });
    /*---------------------RGPD-------------------------------------*/
    let rgpd = form.querySelector("#registration_form_agreeTerms");
    let small = document.querySelector("#agreeSmall");
    let form_submit = form.querySelector("#registration_form_submit");
    form_submit.addEventListener("click", function (event) {
      let form = document.querySelector("#registration_form");
      let inputs = form.getElementsByTagName("input");
      let cpt = 0;
      let selectInputs = [];
      for (var i = 0; i < inputs.length; i++) {
        let nom = inputs[i].type;
        if (nom === "email" || nom === "password" || nom === "text") {
          if (inputs[i].value == "") {
            cpt++;
            inputs[i].classList.remove("border-gray-300");
            inputs[i].classList.add("border-red-300");
          } else {
            selectInputs[i] = inputs;
          }
        }
      }
      if (!rgpd.checked || cpt !== 0) {
        small.innerHTML = "Accepter les conditions générales";
        small.classList.add("text-red-900");
        rgpd.classList.add("border-red-300");
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    });
  }
};

const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  let small = document.querySelector("#emailSmall");
  if (inputEmail.value.match(emailRegExp)) {
    small.innerHTML = "";
    small.classList.remove("text-red-800");
    inputEmail.classList.remove("border-gray-300");
    inputEmail.classList.remove("border-red-300");
    inputEmail.classList.add("border-green-300");
  } else {
    small.innerHTML = "Erreur exemple: jamesBond007@albion.com";
    small.classList.remove("text-green-800");
    small.classList.add("text-red-800");
    inputEmail.classList.remove("border-gray-300");
    inputEmail.classList.toggle("border-green-300");
    inputEmail.classList.add("border-red-300");
  }
};
const cleanEmail = function (clickEmail) {
  let small = document.querySelector("#emailSmall");
  if (clickEmail.classList.contains("border-red-300")) {
    small.innerHTML = "";
    clickEmail.classList.remove("border-red-300");
    clickEmail.classList.add("border-gray-300");
  }
};

const validPseudo = function (inputPseudo) {
  let pseudoRegExp = new RegExp("^[a-zA-Zéèêà]{3,20}#[0-9]{2,4}$"); // ^.{3,32}#[0-9]{4}$
  let small = document.querySelector("#pseudoSmall");
  if (inputPseudo.value.match(pseudoRegExp)) {
    small.innerHTML = "";
    small.classList.remove("text-red-800");
    small.classList.add("text-green-800");
    inputPseudo.classList.remove("border-gray-300");
    inputPseudo.classList.remove("border-red-300");
    inputPseudo.classList.add("border-green-300");
  } else {
    small.innerHTML =
      "Erreur min: 3lettres#2chiffres max: 20lettres#4chiffres ";
    small.classList.remove("text-green-800");
    small.classList.add("text-red-800");
    inputPseudo.classList.remove("border-gray-300");
    inputPseudo.classList.toggle("border-green-300");
    inputPseudo.classList.add("border-red-300");
  }
};

const cleanPseudo = function (clickPseudo) {
  let small = document.querySelector("#pseudoSmall");
  if (clickPseudo.classList.contains("border-red-300")) {
    small.innerHTML = "";
    clickPseudo.classList.remove("border-red-300");
    clickPseudo.classList.add("border-gray-300");
  }
};
const validPassword = function (inputPassword) {
  let passwordRegExp = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,12}$"
  );
  let small = document.querySelector("#plainPasswordSmall");
  if (inputPassword.value.match(passwordRegExp)) {
    small.innerHTML = "";
    small.classList.remove("text-red-800");
    small.classList.add("text-green-800");
    inputPassword.classList.remove("border-gray-300");
    inputPassword.classList.remove("border-red-300");
    inputPassword.classList.add("border-green-300");
  } else {
    small.innerHTML = "Erreur max: 12 caractères choix : (a-zA-Z#?!@$ %^&*-)";
    small.classList.remove("text-green-800");
    small.classList.add("text-red-800");
    inputPassword.classList.remove("border-gray-300");
    inputPassword.classList.toggle("border-green-300");
    inputPassword.classList.add("border-red-300");
  }
};

const cleanPassword = function (clickPassword) {
  let small = document.querySelector("#plainPasswordSmall");
  if (clickPassword.classList.contains("border-red-300")) {
    small.innerHTML = "";
    clickPassword.classList.remove("border-red-300");
    clickPassword.classList.add("border-gray-300");
  }
};

const validZip = function (inputZip) {
  let zipRegExp = new RegExp(/^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/);
  let small = document.querySelector("#zipSmall");
  if (inputZip.value.match(zipRegExp)) {
    small.innerHTML = "";
    small.classList.remove("text-red-800");
    small.classList.add("text-green-800");
    inputZip.classList.remove("border-gray-300");
    inputZip.classList.remove("border-red-300");
    inputZip.classList.add("border-green-300");
  } else {
    small.innerHTML = "Erreur 5 chiffres !";
    small.classList.toggle("text-red-900");
    inputZip.classList.remove("border-gray-300");
    inputZip.classList.toggle("border-green-300");
    inputZip.classList.add("border-red-300");
  }
};

const cleanZip = function (clickZip) {
  let small = document.querySelector("#zipSmall");
  if (clickZip.classList.contains("border-red-300")) {
    small.innerHTML = "";
    clickZip.classList.remove("border-red-300");
    clickZip.classList.add("border-gray-300");
  }
};

const validCity = function (inputCity) {
  let cityRegExp = new RegExp("^[a-zA-Z' éèêàç]{2,30}$");
  let small = document.querySelector("#citySmall");
  if (inputCity.value.match(cityRegExp)) {
    small.innerHTML = "";
    small.classList.remove("text-red-800");
    small.classList.add("text-green-800");
    inputCity.classList.remove("border-gray-300");
    inputCity.classList.remove("border-red-300");
    inputCity.classList.add("border-green-300");
  } else {
    small.innerHTML = "Erreur max: 30 lettres sans tiret";
    small.classList.remove("text-green-800");
    small.classList.add("text-red-800");
    inputCity.classList.remove("border-gray-300");
    inputCity.classList.toggle("border-green-300");
    inputCity.classList.add("border-red-300");
  }
};

const cleanCity = function (clickCity) {
  let small = document.querySelector("#citySmall");
  if (clickCity.classList.contains("border-red-300")) {
    small.innerHTML = "";
    clickCity.classList.remove("border-red-300");
    clickCity.classList.add("border-gray-300");
  }
};

const cleanAgree = function (clickAgree) {
  let small = document.querySelector("#agreeSmall");
  small.innerHTML = "Accepter les conditions générales";
  small.classList.remove("text-red-900");
  small.classList.add("text-gray-600");
  clickAgree.classList.toggle("border-blue-900");
};