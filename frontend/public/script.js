



function hiddeNewPost() {
  document.getElementById("add-post").classList.toggle("hide");
}



async function getUsers() {
  let arr_users = await localStorage.getItem("users").split("},").map(item => item)
  let arr_correct = arr_users
    .map((item, key) =>
      (key == arr_users.length - 1) ? JSON.parse(item) : JSON.parse(item + "}"))

  return arr_correct

}

async function createAccount() {
  user_form = document.getElementById("input-user").value
  pass1_form = document.getElementById("input-pass1").value
  pass2_form = document.getElementById("input-pass2").value


  if (pass1_form != pass2_form) {
    alert("Senhas não iguais");
  } else if ((pass1_form == "" || pass2_form == "" || user_form == "")) {
    alert("Campos vazios");
  } else {
    let user_saved = {
      user: user_form,
      pass: pass2_form,

    }

    await localStorage.setItem("users", localStorage.getItem("users") ? localStorage.getItem("users").concat("," + JSON.stringify(user_saved)) : JSON.stringify(user_saved))
    window.location.assign("./index.html")
    alert("Usuário Criado")

  }

}

async function authentication() {
  user = document.getElementById("input-user").value

  senha = document.getElementById("input-pass").value
  if (user == "" || senha == "") {
    alert("Campos Vazios")
  } else {
    let users = await getUsers()
    var warning_alert = true
    await users.map(item => {
      if (item.user == user && item.pass == senha) {
        localStorage.setItem("user_temp", user)

        warning_alert = false
        window.location.assign("./posts.html")

      } else { return false }
    })

    if (warning_alert) alert("Username or Password doesn't exist")



  }








}

async function createPost() {
  let title_form = document.getElementById("title-new-post").value
  let text_form = document.getElementById("text-new-post").value
  let src_form = document.getElementById("img-new-post").value
  user = localStorage.getItem("user_temp") ?
    localStorage.getItem("user_temp") : ""
  if (title_form == "" && (text_form == "" || src_form == "")) {
    alert("Preencha pelo menos o Título com um texto ou uma imagem")
  } else {
    console.log("src: " + src_form)

    let post_saved = {
      user_post: user,
      title: title_form,
      text: text_form,
      img_src: src_form.toString()
    }

    await localStorage.setItem("posts", localStorage.getItem("posts") ? localStorage.getItem("posts").concat("," + JSON.stringify(post_saved)) : JSON.stringify(post_saved))


    window.location.assign("./posts.html")

  }


}

$("a.button").on("click", async function () {

  await authentication()

});
$("a.button-post").on("click", async function () {
  await createPost()
});

$(".button-form").on("click", function () {
  createAccount()
});

$("a.signout").on("click", async function () {
  await localStorage.removeItem("user_temp")
});




