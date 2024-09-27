window.onload = () => {
  let formRegistration = document.querySelector("#registration_form");
  let loginForm = document.querySelector("#connexion_form");

  /*----------------begin registrationForm--------------------*/

  if (formRegistration !== null) {
    /*---email---*/
    let email = formRegistration.querySelector("#registration_form_email");
    email.addEventListener("blur", function () {
      validEmail(this);
    });
    email.addEventListener("focus", function () {
      cleanEmail(this);
    });
    /*---pseudo---*/
    let pseudo = formRegistration.querySelector("#registration_form_pseudo");
    pseudo.addEventListener("blur", function () {
      validPseudo(this);
    });
    pseudo.addEventListener("focus", function () {
      cleanPseudo(this);
    });
    /*---password---*/
    let password = document.querySelector("#registration_form_plainPassword");
    password.addEventListener("blur", function () {
      validPassword(this);
    });
    password.addEventListener("focus", function () {
      cleanPassword(this);
    });
    /*---code postal---*/
    let zip = formRegistration.querySelector("#registration_form_zip");
    zip.addEventListener("blur", function () {
      validZip(this);
    });
    zip.addEventListener("focus", function () {
      cleanZip(this);
    });
    /*---ville---*/
    let city = formRegistration.querySelector("#registration_form_city");
    city.addEventListener("blur", function () {
      validCity(this);
    });
    city.addEventListener("focus", function () {
      cleanCity(this);
    });
    /*---checkbox---*/
    let agree = formRegistration.querySelector("#registration_form_agreeTerms");
    agree.addEventListener("click", function () {
      cleanAgree(this);
    });
    /*---RGPD---*/
    let rgpd = formRegistration.querySelector("#registration_form_agreeTerms");
    let small = document.querySelector("#agreeSmall");
    let form_submit = formRegistration.querySelector(
      "#registration_form_submit"
    );
    form_submit.addEventListener("click", function (event) {
      let formRegistration = document.querySelector("#registration_form");
      let inputs = formRegistration.getElementsByTagName("input");
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
        small.innerHTML = "Accepter les conditions générales ";
        small.classList.add("text-red-900");
        rgpd.classList.add("border-red-300");
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    });
  }
  /*-------------------end registrationForm-------------------------*/
  /*------------------begin connexionForm-------------------------------*/

  /*---Email--------*/
  if (loginForm !== null) {
    let emailLogin = loginForm.querySelector("#inputEmail");
    emailLogin.addEventListener("blur", function () {
      controlEmail(this);
    });

    emailLogin.addEventListener("focus", function () {
      washEmail(this);
    });
    /*---Password-----------*/
    let passwordLogin = loginForm.querySelector("#inputPassword");
    passwordLogin.addEventListener("blur", function () {
      controlPassword(this);
    });
    passwordLogin.addEventListener("focus", function () {
      washPassword(this);
    });

    /*---checkbox-------*/
    let agree = loginForm.querySelector("#remember_me");
    agree.addEventListener("click", function () {
      washAgree(this);
    });

    let formLogin = document.querySelector("#connexion_form"); //formulaire
    let loginSubmit = document.querySelector("#formSubmitLogin"); // btn-submit
    loginSubmit.addEventListener("click", function (event) {
      let inputs = formLogin.getElementsByTagName("input");
      let smallSubmit = formLogin.querySelector("smallSubmit");
      let cpt = 0;
      let emptyInputs = [];
      for (var i = 0; i < inputs.length; i++) {
        let nom = inputs[i].type;
        if (nom == "email" || nom == "password") {
          if (inputs[i].value == "") {
            cpt++;
            inputs[i].classList.remove("border-gray-300");
            inputs[i].classList.add("border-red-300");
            emptyInputs[i] = inputs;
          }
        }
      }
      if (!agree.checked || cpt !== 0) {
        agree.classList.add("border-red-300");
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    });
  }

  /*------------------end connexionForm---------------------------------*/
};

/*---- functions about connexionForm-----------------------------------*/
const controlEmail = function (loginEmail) {
  let emailRegExp = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  let emailSmall = document.querySelector("#smallLogin");
  if (loginEmail.value.match(emailRegExp)) {
    emailSmall.innerHTML = "";
    emailSmall.classList.remove("text-red-800");
    loginEmail.classList.remove("border-gray-300");
    loginEmail.classList.remove("border-red-300");
    loginEmail.classList.add("border-green-300");
  } else {
    emailSmall.innerHTML = "Email non valide !";
    emailSmall.classList.remove("text-green-800");
    emailSmall.classList.add("text-red-800", "text-xs");
    loginEmail.classList.remove("border-gray-300");
    loginEmail.classList.toggle("border-green-300");
    loginEmail.classList.add("border-red-300");
  }
};

const washEmail = function (clickEmail) {
  let emailSmall = document.querySelector("#smallLogin");
  if (clickEmail.classList.contains("border-red-300")) {
    emailSmall.innerHTML = "";
    clickEmail.classList.remove("border-red-300");
    clickEmail.classList.add("border-gray-300");
  }
};

const controlPassword = function (passwordLogin) {
  let passwordRegExp = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,12}$"
  );
  let passwordSmall = document.querySelector("#smallPass");
  if (passwordLogin.value.match(passwordRegExp)) {
    passwordSmall.innerHTML = "";
    passwordSmall.classList.remove("text-red-800");
    passwordSmall.classList.remove("border-gray-300");
    passwordLogin.classList.remove("border-red-300");
    passwordLogin.classList.add("border-green-300");
  } else {
    passwordSmall.innerHTML = "Mot de passe non valide !";
    passwordSmall.classList.remove("text-green-800");
    passwordSmall.classList.add("text-red-800", "text-xs");
    passwordLogin.classList.remove("border-gray-300");
    passwordLogin.classList.toggle("border-green-300");
    passwordLogin.classList.add("border-red-300");
  }
};

const washPassword = function (clickPassword) {
  let passwordSmall = document.querySelector("#smallPass");
  passwordSmall.innerHTML = " ";
  clickPassword.classList.remove("border-red-300");
  clickPassword.classList.add("border-gray-300");
};

const washAgree = function (checkRemember) {
  let small = document.querySelector("#smallSubmit");
  small.innerHTML = "Se souvenir de moi";
  small.classList.remove("border-red-900");
  small.classList.add("border-gray-600");
  checkRemember.classList.toggle("border-blue-900");
};

/*----end functions connexionForm--------------------------------------*/

/*--- functions about registrationForm---------------------------------*/
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
    small.innerHTML = "Adresse courriel non valide.";
    small.classList.remove("text-green-800");
    small.classList.add("text-red-800", "text-xs");
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
    small.innerHTML = "Pseudo non valide";
    small.classList.remove("text-green-800");
    small.classList.add("text-red-800", "text-xs");
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
    small.innerHTML = "Mot de passe non valide";
    small.classList.remove("text-green-800");
    small.classList.add("text-red-800", "text-xs");
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
    small.innerHTML = "Code postal non valide";
    small.classList.add("text-red-800", "text-xs");
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
    small.innerHTML = "Ville invalide 30 caractères maximum sans tiret";
    small.classList.remove("text-green-800");
    small.classList.add("text-red-800", "text-xs");
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
/*---------------end functions registrationForm-------------------*/
