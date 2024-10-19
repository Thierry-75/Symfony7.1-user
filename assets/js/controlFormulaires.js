window.onload = () => {
  /*---------------formulaire register.html.twig----------*/
  let registration_form = document.querySelector('#registration_form');
  if(registration_form){
      let message_form_inscription = document.querySelector('#message_form_inscription');
      let indication = 'Indiquez vos coordonnées';
      story_show(message_form_inscription,indication);
    /*---email-----*/
      let registration_form_email =registration_form.querySelector('#registration_form_email');
      let emailSmall = registration_form.querySelector('#emailSmall');
      registration_form_email.addEventListener('focus',function(){
        clearEmail(this,message_form_inscription,emailSmall);
      })
      registration_form_email.addEventListener('change',function(){
        controlEmail(this,message_form_inscription,emailSmall);
      })
      registration_form_email.addEventListener('blur',function(){
        resultatEmail(this,emailSmall);
      })
      /*---pseudo---*/
      let registration_form_pseudo = registration_form.querySelector('#registration_form_pseudo');
      let pseudoSmall = registration_form.querySelector('#pseudoSmall');
      registration_form_pseudo.addEventListener('focus',function(){
        clearPseudo(this,message_form_inscription,pseudoSmall);
      })
      registration_form_pseudo.addEventListener('change',function(){
        controlPseudo(this,message_form_inscription,pseudoSmall);
      })
      registration_form_pseudo.addEventListener('blur',function(){
        resultatPseudo(this,pseudoSmall);
      })
      /*-----mot de passe----*/
      let registration_form_plainPassword = registration_form.querySelector('#registration_form_plainPassword');
      let plainPasswordSmall = registration_form.querySelector('#plainPasswordSmall');
      registration_form_plainPassword.addEventListener('focus',function(){
        clearPassword(this,message_form_inscription,plainPasswordSmall);
      })
      registration_form_plainPassword.addEventListener('change',function(){
        controlPassword(this,message_form_inscription,plainPasswordSmall);
      })
      registration_form_plainPassword.addEventListener('blur',function(){
        resultatPassword(this,plainPasswordSmall);
      })
      /*-----code postal ---*/
      let registration_form_zip = registration_form.querySelector('#registration_form_zip');
      let zipSmall = registration_form.querySelector('#zipSmall');
      registration_form_zip.addEventListener('focus',function(){
        clearCodePostal(this,message_form_inscription,zipSmall);
      })
      registration_form_zip.addEventListener('change',function(){
        controlCodePostal(this,message_form_inscription,zipSmall);
      })
      registration_form_zip.addEventListener('blur',function(){
        resultatCodePostal(this,zipSmall);
      })

      /*-----ville---*/
      let registration_form_city = registration_form.querySelector('#registration_form_city');
      let citySmall = registration_form.querySelector('#citySmall');
      registration_form_city.addEventListener('focus',function(){
          clearCity(this,message_form_inscription,citySmall);
      })
      registration_form_city.addEventListener('change',function(){
         controlCity(this,message_form_inscription,citySmall);
      })
      registration_form_city.addEventListener('blur',function(){
        resultatCity(this,citySmall);
      })
      /* rgpd----*/
      let registration_form_agreeTerms = registration_form.querySelector('#registration_form_agreeTerms');
      let agreeSmall = registration_form.querySelector('#agreeSmall');
      registration_form_agreeTerms.addEventListener('focus',function(){
        clearRgpd(this);
      })
      registration_form_agreeTerms.addEventListener('click',function(){
        controlRgpd(this,message_form_inscription,agreeSmall);
      })
      registration_form_agreeTerms.addEventListener('blur',function(){
        resultatRgpd(this,message_form_inscription,agreeSmall);
      })
  let registration_form_submit = registration_form.querySelector('#registration_form_submit');
      registration_form_submit.addEventListener('click',function(event){
        let inputs= registration_form.getElementsByTagName('input');
        let compteur = 0; 
        let nbBorder = 0;
        let champsSuccess = [];
        for(var i=0; i < inputs.length; i++){
          if(inputs[i].type=='email' || inputs[i].type=='text' || inputs[i].type=='password'){
            champsSuccess[i]=inputs[i];
            if(inputs[i].value ==''){
              alert_submit(inputs[i]);
              compteur++;
            }
          }
        }
        for(var j =0; j < champsSuccess.length ; j++){
          if(champsSuccess[j].classList.contains('border-green-600')){
            nbBorder++;
          }
        }
        if(!registration_form_agreeTerms.checked){
          agreeSmall.classList.remove('text-gray-500');
          agreeSmall.classList.add('text-red-600');
        }
        if(!registration_form_agreeTerms.checked || !compteur == 0 || !champsSuccess.length == nbBorder){
          let indication = 'Votre saisie n\'est pas conforme';
          story_show(message_form_inscription,indication);
          event.preventDefault();
          event.stopImmediatePropagation();
          return false;
        }
      })
  } /* fin register.html.twig */
   /*---------------formulaire login.html.twig----------*/
  let connexion_form = document.querySelector('#connexion_form');
  if(connexion_form){
    let message_form_connexion = document.querySelector('#message_form_connexion');
    let indication = 'Indiquez vos coordonnées';
    story_show(message_form_connexion,indication);

  /*-----email-----*/
  let inputEmail = connexion_form.querySelector('#inputEmail');
  let emailSmall = connexion_form.querySelector('#emailSmall');
  inputEmail.addEventListener('focus',function(){
    clearEmail(this,message_form_connexion,emailSmall);
  }) 
  inputEmail.addEventListener('change',function(){
    controlEmail(this,message_form_connexion,emailSmall);
  })
  inputEmail.addEventListener('blur',function(){
    resultatEmail(this,emailSmall);
  }) 
  /*----password---*/
  let inputPassword = connexion_form.querySelector('#inputPassword');
  let passwordSmall = connexion_form.querySelector('#passwordSmall');
  inputPassword.addEventListener('focus',function(){
    clearPassword(this,message_form_connexion,passwordSmall);
  })
  inputPassword.addEventListener('change',function(){
    controlPassword(this,message_form_connexion,passwordSmall);
  })
  inputPassword.addEventListener('blur',function(){
    resultatPassword(this,passwordSmall);
  })
  /*-----remember_me---*/
  let remember_me = connexion_form.querySelector('#remember_me');
  let smallSubmit = connexion_form.querySelector('#smallSubmit');
  remember_me.addEventListener('focus',function(){
    clearRemember(this);
  })
  remember_me.addEventListener('click',function(){
    controlRemember(this,message_form_connexion,smallSubmit);
  })
  remember_me.addEventListener('blur',function(){
    resultatRemember(this,message_form_connexion,smallSubmit);
  })
  /*-----formSubmitLogin submit-----*/
  let formSubmitLogin = connexion_form.querySelector('#formSubmitLogin');
  formSubmitLogin.addEventListener('click',function(event){
    let inputs = connexion_form.getElementsByTagName('input');
    let champsSuccess = [];
    let compteur = 0;
    let nbBorder = 0;
    for (var i =0; i < inputs.length; i++){
      if(inputs[i].type=='email' || inputs[i].type=='password'){
        champsSuccess[i]=inputs[i];
        if(inputs[i].value==''){
          alert_submit(inputs[i]);
          compteur++;
        }
      }
    }
    for(var j=0; j < champsSuccess.length; j++){
      if(champsSuccess[j].classList.contains('border-green-600')){
        nbBorder++;
      }
    }
    if(!remember_me.checked){
      smallSubmit.classList.remove("text-gray-500");
      smallSubmit.classList.add('text-red-600');
    }
    if(!remember_me.checked || !compteur ==0 || !champsSuccess.length == nbBorder){
      let indication= 'Votre saisie n\'est pas conforme';
      story_show(message_form_connexion,indication);
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    }
  })
  }/* fin login.html.twig */
   /*---------------formulaire request reset password.----------*/
  let form_reset_email = document.querySelector('#form_reset_email');
  if(form_reset_email){
    let message_reset_email = document.querySelector('#message_reset_email');
    let indication = 'Indiquez votre adresse courriel';
    story_show(message_reset_email,indication);

    /*---email---*/
    let reset_password_request_form_email = form_reset_email.querySelector('#reset_password_request_form_email');
    let emailSmall = form_reset_email.querySelector('#emailSmall');
    reset_password_request_form_email.addEventListener('focus',function(){
        clearEmail(this,message_reset_email,emailSmall);
    })
    reset_password_request_form_email.addEventListener('change',function(){
        controlEmail(this,message_reset_email,emailSmall);
    })
    reset_password_request_form_email.addEventListener('blur',function(){
        resultatEmail(this,emailSmall);
    })
    let submit_reset = form_reset_email.querySelector('#submit_reset');
    submit_reset.addEventListener('click',function(event){
        let inputs = form_reset_email.getElementsByTagName('input');
        let champsSuccess=[];
        let compteur = 0;
        let nbBorder = 0;
        for(var i = 0; i < inputs.length; i++){
          if(inputs[i].type == 'email'){
            champsSuccess[i]=inputs[i];
            if(inputs[i].value ==''){
              alert_submit(inputs[i]);
              compteur++;
            }
          }
        }
        for(var j =0; j < champsSuccess.length; j++){
          if(champsSuccess[j].classList.contains('border-green-600')){
            nbBorder++;
          }
        }
        if(!compteur ==0 || !champsSuccess.length == nbBorder){
          let indication ='Votre saise n\'est pas conforme';
          story_show(message_reset_email,indication);
          event.preventDefault();
          event.stopImmediatePropagation();
          return false;
        }
    })

  }/* fin form request reset password---*/

  /*-----reset-password------*/
  let reset_password_form = document.querySelector('#reset_password_form');
  if(reset_password_form){
    let message_reset_password = document.querySelector('#message_reset_password');
    let indication = 'Indiquez votre nouveau mot de passe';
    story_show(message_reset_password,indication);

  let reset_password_form_password_first = reset_password_form.querySelector('#reset_password_form_password_first');

  let reset_password_form_password_second = reset_password_form.querySelector('#reset_password_form_password_second');
  let passwordSmall = reset_password_form.querySelector('#passwordSmall');
  reset_password_form_password_first.addEventListener('focus',function(){
      clearPassword(this,message_reset_password,passwordSmall);
      reset_password_form_password_second.value='';
  })
  reset_password_form_password_first.addEventListener('change',function(){
      controlPassword(this,message_reset_password,passwordSmall);
  })
  reset_password_form_password_first.addEventListener('blur',function(){
    resultatPassword(this,passwordSmall);
  })
  reset_password_form_password_second.addEventListener('focus',function(){
    clearPassword(this,message_reset_password,passwordSmall);
  })
  reset_password_form_password_second.addEventListener('change',function(){
    controlPassword2(this,message_reset_password,passwordSmall,reset_password_form_password_first);
    
  })
  reset_password_form_password_second.addEventListener('blur',function(){
    resultatPassword(this,passwordSmall);
  })

  let submit_reset_password = reset_password_form.querySelector('#submit_reset_password');
  submit_reset_password.addEventListener('click',function(event){
    let inputs =reset_password_form.getElementsByTagName('input');
    let champsSuccess = [];
    let compteur = 0;
    let nbBorder = 0;
    for(var i =0; i < inputs.length; i++){
      if(inputs[i].type=='password'){
        champsSuccess[i]=inputs[i];
        if(inputs[i].value==''){
          alert_submit(inputs[i]);
          compteur++;
        }
      }
    }
    for(var j = 0; j < champsSuccess.length; j++){
      if(champsSuccess[j].classList.contains('border-green-600')){
        nbBorder++;
      }
    }
    if(!compteur == 0 || !champsSuccess.lastIndexOf  == nbBorder){
      let indication ='Votre saisie n\'est pas conforme';
      story_show(message_reset_password,indication);
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    }
  })
  }/* fin reset password ---*/

}
/*----traitement----*/

/*---email----*/
const clearEmail = function (champ, message, erratum) {
  let mot = "Indiquez votre adresse email";
  story_show(message, mot);
  original_border(champ);
  champ.value = "";
  original_border(champ);
  erratum.innerHTML = "";
};

const controlEmail = function (champ, message, erratum) {
  let email_regexp = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  if (champ.value.match(email_regexp)) {
    success_submit(champ);
  } else {
    alert_submit(champ);
    clearMessage(message);
    erratum.innerHTML = "Adresse email erronée, ex: exemple@email.com";
  }
};
const resultatEmail = function (champ, erratum) {
  if (champ.value == "") {
    alert_submit(champ);
    erratum.innerHTML = "";
  }
};

/*---pseudo---*/
const clearPseudo = function (champ, message,erratum) {
  let mot = "Indiquez votre pseudo";
  story_show(message, mot);
  champ.value = "";
  original_border(champ);
  erratum.innerHTML = "";
};

const controlPseudo = function(champ,message,erratum){
  let pseudoRegExp = new RegExp("^[a-zA-Zéèêà]{3,20}#[0-9]{2,4}$"); // ^.{3,32}#[0-9]{4}$
  if (champ.value.match(pseudoRegExp)) {
    success_submit(champ);
  } else {
    alert_submit(champ);
    let mot = "Ce Pseudo n'est pas valide";
    story_show(message, mot);
    erratum.innerHTML ="max 20 caractères ex : theophile#3245 - # et chiffres obligatoires";
  }
}

const resultatPseudo = function(champ,erratum){
  if (champ.value == "") {
    alert_submit(champ);
    erratum.innerHTML = "";
  }
}
/*-----password----*/
const clearPassword = function (champ, message, erratum) {
  let mot = "Indiquez votre mot de passe";
  story_show(message, mot);
  champ.value = "";
  original_border(champ);
  erratum.innerHTML = "";
};
const controlPassword = function (champ, message, erratum) {
  let password_regexp = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,12}$"
  );
  if (champ.value.match(password_regexp)) {
    success_submit(champ);
  } else {
    alert_submit(champ);
    clearMessage(message);
    erratum.innerHTML =
      "Champ invalide 10 à 12 caractères: A-Za-z0-9#?!@$ %^&*-";
  }
};
const controlPassword2 = function (second, message, erratum, premier) {
  let password_regexp = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,12}$"
  );
  if (second.value.match(password_regexp) && second.value == premier.value) {
    success_submit(second);
  } else {
    alert_submit(second);
    clearMessage(message);
    erratum.innerHTML =
      "Champ invalide 10 à 12 caractères: A-Za-z0-9#?!@$ %^&*-";
  }
};
const resultatPassword = function (champ, erratum) {
  if (champ.value == "") {
    alert_submit(champ);
    erratum.innerHTML = "";
  }
};
/*----code postal---*/
const clearCodePostal = function (champ, message, erratum) {
  let mot = "Indiquez votre code postal...";
  story_show(message, mot);
  champ.value = "";
  original_border(champ);
  erratum.innerHTML = "";
};
const controlCodePostal = function (champ, message, erratum) {
  let c_postal_regexp = new RegExp(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/);
  if (champ.value.match(c_postal_regexp)) {
    success_submit(champ);
  } else {
    alert_submit(champ);
    clearMessage(message);
    erratum.innerHTML = "Champ invalide - 5 chiffres";
  }
};
const resultatCodePostal = function (champ, erratum) {
  if (champ.value == "") {
    alert_submit(champ);
    erratum.innerHTML = "";
  }
};
/*---ville---*/
const clearCity = function (champ, message, erratum) {
  let mot = "Indiquez votre ville...";
  story_show(message, mot);
  champ.value ='';
  original_border(champ);
  erratum.innerHTML = "";
};
const controlCity = function (champ, message, erratum) {
  let city_regexp = new RegExp(/^[a-zA-Z- 'éèçïàôùê]{2,50}$/);
  if (champ.value.match(city_regexp)) {
    success_submit(champ);
  } else {
    alert_submit(champ);
    clearMessage(message);
    erratum.innerHTML = "Champ invalide - maximum 50 lettres avec ou sans espace";
  }
};
const resultatCity = function (champ, erratum) {
  if (champ.value == "") {
    alert_submit(champ);
    erratum.innerHTML = "";
  }
};
/***-rgpd---*/
const clearRgpd = function (champ) {
  if (!champ.checked) {
    alert_submit(champ);
  } else {
    original_border(champ);
  }
};
const controlRgpd = function (champ,message, erratum) {
  if (!champ.checked) {
    alert_submit(champ);
    clearMessage(message);
  } else {
    success_submit(champ);
    let erreur = "Se souvenir de moi";
    original_border(champ);
    cool_show(erratum, erreur);
  }
};
const resultatRgpd = function (champ, message, erratum) {
  if (!champ.checked) {
    alert_submit(champ);
    let mot = "Veuillez à cocher cette case SVP";
    let erreur = "Vérifiez votre saisie !";
    story_show(erratum, mot);
    story_show(message, erreur);
  } else {
    success_submit(champ);
    let indication = "Se souvenir de moi";
    original_border(champ);
    cool_show(erratum, indication);
    clearMessage(message);
  }
};

/*----remember_me---*/
const clearRemember = function (champ) {
  if (!champ.checked) {
    alert_submit(champ);
  } else {
    original_border(champ);
  }
};
const controlRemember = function (champ,message, erratum) {
  if (!champ.checked) {
    alert_submit(champ);
    clearMessage(message);
  } else {
    success_submit(champ);
    let erreur = " Se souvenir de moi";
    original_border(champ);
    cool_show(erratum, erreur);
  }
};
const resultatRemember = function (champ, message, erratum) {
  if (!champ.checked) {
    alert_submit(champ);
    let mot = "Veuillez à cocher cette case SVP";
    let erreur = "Vérifiez votre saisie !";
    story_show(erratum, mot);
    story_show(message, erreur);
  } else {
    success_submit(champ);
    let indication = "Se souvenir de moi";
    original_border(champ);
    cool_show(erratum, indication);
    clearMessage(message);
  }
};


/*----------------functions DOM-----------------*/
const story_show = function (message, mot) {
  message.innerHTML = mot;
  message.classList.remove(
    "text-xs",
    "font-light",
    "text-gray-500",
    "dark:text-gray-300"
  );
  message.classList.add("text-xs", "text-red-600", "text-center", "italic");
};

const cool_show = function (message, mot) {
  message.innerHTML = mot;
  message.classList.remove("text-xs", "text-red-600", "text-center", "italic");
  message.classList.add(
    "text-xs",
    "font-light",
    "text-gray-500",
    "dark:text-gray-300"
  );
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
  champ.classList.add('border','border-gray-300','rounded','bg-gray-50');
};

const clearMessage = function (message) {
  var mot = "";
  story_show(message, mot);
};