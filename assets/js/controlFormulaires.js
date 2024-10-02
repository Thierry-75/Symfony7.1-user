window.onload = () => {
  /*----------------------formulaire reset_password_reset.html.twig init -------*/
  let form_reset = document.querySelector("#form_reset_email");
  if (form_reset) {
    let affichage = document.querySelector("#message_reset_email");
    let text = "Indiquez votre adresse email";
    story_show(affichage, text);

    let form_submit_reset = form_reset.querySelector("#submit_reset");
    form_submit_reset.addEventListener("click", function (event) {
      let input_reset = document.getElementsByTagName("input");
      let cpt = 0;
      let champsSuccess = [];
      for (var i = 0; i < input_reset.length; i++) {
        if (input_reset[i].type == "email") {
          champsSuccess[i] = input_reset[i];
          if (input_reset[i].value == "") {
            cpt++;
            alert_submit(input_reset[i]);
            var text = "Remplissez le champ email";
            story_show(affichage, text);
          }
        }
      }
      let nombreborder = 0;
      for (var j = 0; j < champsSuccess.length; j++) {
        if (champsSuccess[j].classList.contains("border-green-600")) {
          nombreborder++;
        }
      }
      if (!cpt == 0 || champsSuccess.length != nombreborder) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    });

    let email_reset = form_reset.querySelector(
      "#reset_password_request_form_email"
    );
    email_reset.addEventListener("focus", function () {
      email_reset.value = "";
      let mot = "";
      story_show(affichage, mot);
    });
    email_reset.addEventListener("change", function () {
      control_email_reset(this, affichage);
    });
  }
  /*--------------------formulaire reset_password.html.twig init ---------------*/
  let form_reset_password = document.querySelector("#reset_password_form");
  if (form_reset_password) {
    let affichage = document.querySelector("#message_reset_password");
    let mot = "Indiquez votre nouveau mot de passe";
    story_show(affichage, mot);

    let submit_reset_password = form_reset_password.querySelector(
      "#submit_reset_password"
    );
    submit_reset_password.addEventListener("click", function (event) {
      let inputs_reset = form_reset_password.getElementsByTagName("input");
      let cpt = 0;
      let champsSuccess = [];
      for (var i = 0; i < inputs_reset.length; i++) {
        if (inputs_reset[i].type == "password") {
          champsSuccess[i] = inputs_reset[i];
          if (inputs_reset[i].value == "") {
            cpt++;
            alert_submit(inputs_reset[i]);
            var mot = "Inscrivez et confirmez votre nouveau mot de passe";
            story_show(affichage, mot);
          }
        }
      }
      let nombreBorder = 0;
      for (var j = 0; j < champsSuccess.length; j++) {
        if (champsSuccess[j].classList.contains("border-green-600")) {
          nombreBorder++;
        }
      }
      if (!cpt == 0 || champsSuccess.length != nombreBorder) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    });

    let password_first = form_reset_password.querySelector(
      "#reset_password_form_password_first"
    );
    let password_second = form_reset_password.querySelector(
      "#reset_password_form_password_second"
    );

    password_first.addEventListener("change", function () {
      control_password_first(this, affichage);
    });

    password_first.addEventListener("focus", function () {
      let mot = "10 à 12 caractères autorisés : A-Za-z0-9#?!@$ %^&*-";
      story_show(affichage, mot);
      password_first.value = "";
      password_second.value = "";
      original_border(password_first);
      original_border(password_second);
    });

    password_second.addEventListener("change", function () {
      control_password_second(this, password_first.value, affichage);
    });

    password_second.addEventListener("focus", function () {
      password_second.value = "";
      original_border(password_second);
      clearMessageFirstPassword(affichage);
    });
  }
  /*-------------formulaire login.html.twig-----------------*/
  let connexion_form = document.querySelector("#connexion_form");
  if (connexion_form) {
    let affichage = document.querySelector("#message_form_connexion");
    let mot = "Indiquez votre Pseudo et votre Mot de passe";
    story_show(affichage, mot);

    let emailLogin = connexion_form.querySelector("#inputEmail");
    emailLogin.addEventListener("change", function () {
      control_emailLogin(this, affichage);
    });

    emailLogin.addEventListener("focus", function () {
      let mot = "Indiquez votre email";
      story_show(affichage, mot);
      emailLogin.value = "";
      original_border(this);
    });

    emailLogin.addEventListener("blur", function () {
      if (emailLogin.value == "") {
        alert_submit(this);
      }
    });

    let passwordLogin = connexion_form.querySelector("#inputPassword");
    passwordLogin.addEventListener("change", function () {
      control_passwordLogin(this, affichage);
    });

    passwordLogin.addEventListener("focus", function () {
      let mot = "10 à 12 caractères autorisés : A-Za-z0-9#?!@$ %^&*-";
      story_show(affichage, mot);
      passwordLogin.value = "";
      original_border(this);
    });

    passwordLogin.addEventListener("blur", function () {
      if (passwordLogin.value == "") {
        alert_submit(this);
      }
    });

    let checkboxLogin = connexion_form.querySelector("#remember_me");
    let checkboxMessage = connexion_form.querySelector("#smallSubmit");
    checkboxLogin.addEventListener("click", function () {
      checkboxMessage.classList.remove("text-red-600");
      checkboxMessage.classList.add("text-gray-500");
      clearMessage(affichage);
    });

    let submitLogin = connexion_form.querySelector("#formSubmitLogin");
    submitLogin.addEventListener("click", function (event) {
      let inputs = connexion_form.getElementsByTagName("input");
      let cpt = 0;
      let champsSuccess = [];
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "password" || inputs[i].type == "email") {
          champsSuccess[i] = inputs[i];
          if (inputs[i].value == "") {
            cpt++;
            alert_submit(inputs[i]);
          }
        }
      }
      let nombreBorder = 0;
      for (var j = 0; j < champsSuccess.length; j++) {
        if (champsSuccess[j].classList.contains("border-green-600")) {
          nombreBorder++;
        }
      }
      if (!checkboxLogin.checked) {
        checkboxMessage.classList.remove("text-gray-500");
        checkboxMessage.classList.add("text-red-600");
      }
      if (
        !checkboxLogin.checked ||
        !cpt == 0 ||
        champsSuccess.length != nombreBorder
      ) {
        var mot = "votre saisie n'est conforme";
        story_show(affichage, mot);
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    });
  } //-------------
}; /* -----------FIN WINDOW.ONLOAD------------------------*/

/*-----------------login.html.twig-------------------*/
const control_emailLogin = function (champ, message) {
  let email_regexp = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  if (champ.value.match(email_regexp)) {
    success_submit(champ);
  } else {
    alert_submit(champ);
    let mot = "Cet email n'est pas valide.";
    story_show(message, mot);
  }
};

const control_passwordLogin = function (champ, message) {
  let passwordRegExp = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,12}$"
  );
  if (champ.value.match(passwordRegExp)) {
    success_submit(champ);
  } else {
    alert_submit(champ);
    let mot = "10 à 12 caractères autorisés : A-Za-z0-9#?!@$ %^&*-";
    story_show(message, mot);
  }
};
/*----------------reinitialisation mot de passe ----*/

const control_password_first = function (champ, message) {
  let passwordRegExp = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,12}$"
  );
  if (champ.value.match(passwordRegExp)) {
    success_submit(champ);
    clearMessageFirstPassword(message);
  } else {
    alert_submit(champ);
    let mot = "Mot de passe erroné";
    story_show(message, mot);
  }
};

const control_password_second = function (champ, compare, message) {
  let passwordRegExp = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,12}$"
  );
  if (champ.value.match(passwordRegExp) && champ.value.match(compare)) {
    success_submit(champ);
    clearMessageFirstPassword(message);
  } else {
    alert_submit(champ);
    let mot = "Les champs doivent être identiques";
    story_show(message, mot);
  }
};

/*----------------function resetPassword email ---------*/
const control_email_reset = function (champ, message) {
  let email_regexp = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  if (champ.value.match(email_regexp)) {
    success_submit(champ);
    clearMessage(message);
  } else {
    alert_submit(champ);
    var mot = "L'adresse email est erronée.";
    story_show(message, mot);
  }
};

/*----------------functions-----------------*/
const story_show = function (message, mot) {
  message.innerHTML = mot;
  message.classList.add("text-xs", "text-red-600", "text-center", "italic");
};

const alert_submit = function (champ) {
  champ.classList.remove("border-gray-300");
  champ.classList.remove("border-green-600");
  champ.classList.add("border-red-600");
};
const success_submit = function (champ) {
  champ.classList.remove("border-gray-300");
  champ.classList.remove("border-red-600");
  champ.classList.add("border-green-600");
};

const original_border = function (champ) {
  champ.classList.remove("border-red-600");
  champ.classList.remove("border-green-600");
  champ.classList.add("border-gray-300");
};

const clearMessage = function (message) {
  var mot = "";
  story_show(message, mot);
};
