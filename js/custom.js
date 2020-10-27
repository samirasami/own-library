displayobj();
// setting item in local storage when user submit the form
let libraryForm = document.querySelector("#libraryForm");
libraryForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let type;
    let name = document.querySelector("#name");
    let author = document.querySelector("#author");
    let validType = false;
    let fiction = document.querySelector("#fiction");
    let programming = document.querySelector("#programming");
    let cooking = document.querySelector("#cooking");
    let typeText = document.querySelector(".typeText");
    if (fiction.checked) {
        type = fiction.value;
        validType = true;
    } else if (programming.checked) {
        type = programming.value;
        validType = true;
    } else if (cooking.checked) {
        type = cooking.value;
        validType = true;
    }
    if (validName, validAuthor, validType) {
        let getItem = localStorage.getItem("library");
        if (getItem == null) {
            libraryobj = [];
        } else {
            libraryobj = JSON.parse(getItem);
        }
        let inputobj = {
            name: name.value,
            author: author.value,
            type: type
        };
        libraryobj.push(inputobj);
        localStorage.setItem("library", JSON.stringify(libraryobj));

        let success = document.querySelector("#success");
        success.style.display = "block";
        setTimeout(function () {
            success.style.display = "none";
        }, 3000);
    } else if (name.value === undefined, author.value === undefined, type === undefined) {
        name.style.border = "1px solid red";
        name.value = "book name must be added";
        author.value = "author name must be added";
        author.style.border = "1px solid red";
        typeText.style.display = "block"
    }
    libraryForm.reset();
    displayobj();

});

// function for displayobj
function displayobj() {
    let getItem = localStorage.getItem("library");
    if (getItem == null) {
        libraryobj = [];
    } else {
        libraryobj = JSON.parse(getItem);
    }
    let html = "";
    libraryobj.forEach(function (element, index) {
        html += ` <tr class="tr">
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}
              <span id="${index}" onclick="deleteItem(this.id)">+</span>
        </td>
    </tr>`
    });
    let tBody = document.querySelector(".tBody");
    tBody.innerHTML = html;
}

// function for delete item
function deleteItem(index) {
    if (confirm("do you want to delete this book?") == true) {
        let getItem = localStorage.getItem("library");
        if (getItem == null) {
            libraryobj = [];
        } else {
            libraryobj = JSON.parse(getItem);
        }
        libraryobj.splice(index, 1);
        let setItem = localStorage.setItem("library", JSON.stringify(libraryobj));
        displayobj();
    }
}

// validation for name
let name = document.querySelector("#name");
let author = document.querySelector("#author");
let validName;
let validAuthor;
name.addEventListener("input", function () {
    let nameVal = name.value;
    let rag = /[\w+]{2,20}/;

    if (rag.test(nameVal)) {
        validName = true;
        let nameAlertTxt = document.querySelector(".nameAlertTxt");
        nameAlertTxt.style.display = "none";
        name.style.border = "none";
    } else {
        validName = false;
        let nameAlertTxt = document.querySelector(".nameAlertTxt");
        nameAlertTxt.style.display = "block";
    }

});

// validation for author
author.addEventListener("input", function () {
    let authorVal = author.value;
    let rag = /[\w+]{2,20}/;

    if (rag.test(authorVal)) {
        validAuthor = true;
        let authorAlertTxt = document.querySelector(".authorAlertTxt");
        authorAlertTxt.style.display = "none";
        author.style.border = "none";
    } else {
        validAuthor = false;
        let authorAlertTxt = document.querySelector(".authorAlertTxt");
        authorAlertTxt.style.display = "block";
    }
});
// validation for type
let fiction = document.querySelector("#fiction");
let programming = document.querySelector("#programming");
let cooking = document.querySelector("#cooking");
let typeText = document.querySelector(".typeText");
fiction.addEventListener("input", function () {
    if (fiction.checked) {
        typeText.style.display = "none";
    }
});
programming.addEventListener("input", function () {
    if (programming.checked) {
        typeText.style.display = "none";
    }
});
cooking.addEventListener("input", function () {
    if (cooking.checked) {
        typeText.style.display = "none";
    }
});

// function for filtering
let search = document.querySelector("#search");
search.addEventListener("input", function () {
    let searchVal = search.value.toLowerCase();
    let tr = document.querySelectorAll(".tr");
    let trArray = Array.from(tr);
    trArray.forEach(function (element) {
        let elemChildren = element.children;
        let firstChildren = element.children[0].innerText;
        if (firstChildren.includes(searchVal)) {
            element.style.display = "table-row";
        } else {
            element.style.display = "none";
        }
    })
})