import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth, signOut
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, ref, child, get, set, onValue, push, update, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCa-l4lJ_Ki1gEGgTaPkMNL_dBfCr6-tTo",
    authDomain: "japanesequizappversion2.firebaseapp.com",
    databaseURL: "https://japanesequizappversion2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "japanesequizappversion2",
    storageBucket: "japanesequizappversion2.appspot.com",
    messagingSenderId: "267581035496",
    appId: "1:267581035496:web:217ceea62de2e63d754a5d",
    measurementId: "G-BC9627MX8C"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

document.getElementById("logOutLink").addEventListener('click', (e) => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.');
        alert('Sign-out successful.');
        window.location = "loginAdmin.html";
        //document.getElementById('logOut').style.display = 'none';
    }).catch((error) => {
        // An error happened.
        console.log('An error happened.');
    });
});


let tableBody = document.querySelector("tbody");
let dropdown = document.querySelector("select");
var show_lessonList = document.getElementById("show_lessonList");

function getSeclectValue() {
    const db = getDatabase();
    const kanjiRef = ref(db, `learndekiru/bai1/nguphap`);
    onValue(kanjiRef, (snapshot) => {
        const kanji = snapshot.val();
        //console.log(snapshot.val());
        tableBody.innerHTML = "";
        for (let kj in kanji) {
            //console.log(kanji[kj]);
            let tr =
                `<tr data-id="${kj}">
                        <td>
                            ${kanji[kj].content?.first ?? ''}
                        </td>
                        <td>
                            ${kanji[kj].content?.second ?? ''}
                        </td>
    
                        <td>${kanji[kj].mean}</td>
                        
                        <td>${kanji[kj].note}</td>
                        
                        <td>${kanji[kj].sentence?.['jp']}/${kanji[kj].sentence?.['vi']}</td>
    
                        <td>
                            <button type="button" data-toggle="modal" data-target="#editModal" data-id="${kj}" class="btn btn-outline-dark editButton" >Edit</button>
                            <button type="button" data-id="${kj}" class="btn btn-outline-dark deleteButton">Delete</button>
                        </td>
                    </tr>`
            tableBody.innerHTML += tr;

        }

    });
    //location.reload();
}
$(document).ready(function () {
    const db = getDatabase();

    //const kanjiRef = ref(db, `learndekiru/${show_lessonList.value}/kanji`);
    const lessonListRef = ref(db, 'learndekiru');
    onValue(lessonListRef, (snapshot) => {
        console.log(snapshot.val())
        const lessonlist = snapshot.val();
        //console.log(snapshot.val());
        show_lessonList.innerHTML = "";
        for (let lesson in lessonlist) {
            console.log(lesson)
            //console.log(lessonlist[lesson]);
            let tr =
                `
                <option data-id="${lesson}">${lesson}</option>
                
                `
            dropdown.innerHTML += tr;
        }

    });
    getSeclectValue();


    show_lessonList.addEventListener("change", function () {
        const kanjiRef = ref(db, `learndekiru/${show_lessonList.value}/nguphap`);
        onValue(kanjiRef, (snapshot) => {
            const kanji = snapshot.val();
            //console.log(snapshot.val());
            tableBody.innerHTML = "";
            for (let kj in kanji) {
                //console.log(kanji[kj]);
                let tr =
                    `<tr data-id="${kj}">
                        <td>
                            ${kanji[kj].content?.first ?? ''}
                        </td>
                        <td>
                            ${kanji[kj].content?.second ?? ''}
                        </td>
    
                        <td>${kanji[kj].mean}</td>
                        
                        <td>${kanji[kj].note}</td>
                        
                        <td>${kanji[kj].sentence?.['jp']}/${kanji[kj].sentence?.['vi']}</td>
    
                        <td>
                            <button type="button" data-toggle="modal" data-target="#editModal" class="btn btn-outline-dark editButton" >Edit</button>
                            <button type="button" data-id="${kj}" class="btn btn-outline-dark deleteButton">Delete</button>
                        </td>
                    </tr>`
                tableBody.innerHTML += tr;

            }

        });
        //location.reload();
    })
    $("#addModal .submit").on("click", () => {

        // leason ID
        var lesson = $("#addModal .show_lesson").val();

        const texts = []
        document.querySelectorAll("#addModal input[type=text]").forEach((input) => {
            texts.push({
                value: input.value,
                name: input.id
            })
        })

        for (let i = 0; i < texts.length; i++) {
            if (!texts[i].value) {
                alert(`Please fill out all required fields.`);
                return;
            }
        }

        const input = {}
        texts.forEach((text) => {
            if (['mean', 'note'].includes(text.name)) {
                input[text.name] = text.value
            } else {
                switch (text.name) {
                    case 'firt':
                        input.content = Object.assign({}, input.content, { first: text.value })
                        break;
                    case 'second':
                        input.content = Object.assign({}, input.content, { second: text.value })
                        break;
                    case 'jp':
                        input.sentence = Object.assign({}, input.sentence, { jp: text.value })
                        break;
                    case 'vi':
                        input.sentence = Object.assign({}, input.sentence, { vi: text.value })
                        break;
                }
            }
        })

        const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        set(ref(db, `learndekiru/${lesson}/nguphap/${randomId}`), input)
            .then(() => {
                alert("Add new grammar successfully !");
                //location.reload();
            })
            .catch((error) => {
                alert("Error: " + error);
            });

        $("[data-dismiss=modal]").trigger({ type: "click" });

        //console.log(lesson, kanji, mean, read);


    })

    document.querySelector('#editModal .submit').addEventListener('click', () => {
        var lesson = $("#editModal .show_lesson").val();

        const texts = []
        document.querySelectorAll("#editModal input[type=text]").forEach((input) => {
            texts.push({
                value: input.value,
                name: input.id
            })
        })

        for (let i = 0; i < texts.length; i++) {
            if (!texts[i].value) {
                alert(`Please fill out all required fields.`);
                return;
            }
        }

        const input = {}
        texts.forEach((text) => {
            if (['mean', 'note'].includes(text.name)) {
                input[text.name] = text.value
            } else {
                switch (text.name) {
                    case 'first':
                        input.content = Object.assign({}, input.content, { first: text.value })
                        break;
                    case 'second':
                        input.content = Object.assign({}, input.content, { second: text.value })
                        break;
                    case 'jp':
                        input.sentence = Object.assign({}, input.sentence, { jp: text.value })
                        break;
                    case 'vi':
                        input.sentence = Object.assign({}, input.sentence, { vi: text.value })
                        break;
                }
            }
        })

        const editID = document.querySelector('#editModal #editID').value

        set(ref(db, `learndekiru/${lesson}/nguphap/${editID}`), input)
            .then(() => {
                alert("Edit success !");
                location.reload();
            })
            .catch((error) => {
                alert("Error: " + error);
            });

    })

    $(document).on("click", ".editButton", function () {
        var postKey = $(this).parent().parent().data("id");
        const kanjiRef = ref(db, `learndekiru/${show_lessonList.value}/nguphap`);
        //console.log(show_lessonList.value);
        get(child(kanjiRef, `${postKey}`)).then((snapshot => {

            console.log(snapshot.val())
            //console.log(snapshot.val());
            if (snapshot.exists()) {
                $("#editModal .edit_show_lesson").val(show_lessonList.value);


                const val = snapshot.val()

                $("#editModal #editID").val(postKey);

                $("#editModal #first").val(val.content?.first ?? '');
                $("#editModal #second").val(val.content?.second ?? '');
                $("#editModal #mean").val(val.mean);
                $("#editModal #note").val(val.note);
                $("#editModal #jp").val(val.sentence?.jp ?? '');
                $("#editModal #vi").val(val.sentence?.vi ?? '');
            }
            else {
                alert("no data found");
            }
        }))
            .catch((error) => {
                alert("loi roi" + error);
            })
    })
    $(document).on("click", ".save_edited_data", (event) => {
        var lesson = $(".edit_show_lesson").val();
        var kanji = $(".edit_show_kanji").val().replace(/\s{2,}/g, ' ').trim();
        var meaning = $(".edit_show_mean").val().replace(/\s{2,}/g, ' ').trim();
        //var show_phone = $(".edit_show_phone").val();
        var reading = $(".edit_show_read").val().replace(/\s{2,}/g, ' ').trim();
        var edit_key = $(".edit_key").val();
        let regexKanji = /^[一-龥]+$/;
        let regexMean = /[\u00C0-\u1EF9a-zA-Z\s\p{P}]+/;
        let regexRead = /^[ぁ-んァ-ン/,\()\s]+$/;

        // A post entry.
        const postData = {
            "mean": meaning,
            "read": reading
        };
        if (kanji.length == 0 || meaning.length == 0 || reading.length == 0) {
            alert("Không để trường nào trống"); return;
        } else if (!regexKanji.test(kanji)) {
            alert("Hãy nhập hán tự!");
            return false;
        } else if (!regexMean.test(meaning)) {
            alert("Nghĩa chỉ nên có chữ cái tiếng việt");
            return false;
        } else if (!regexRead.test(reading)) {
            alert("Cách đọc chỉ nên có chữ hiragana and katakana");
            return false;
        }
        else {
            const updates = {};
            updates[`/learndekiru/${show_lessonList.value}/kanji/` + edit_key] = postData;
            //updates['/User-posts/' + edit_key] = postData;
            update(ref(db), updates);
            alert("Thanh cong");
            $("[data-dismiss=modal]").trigger({ type: "click" });
        }
        // Get a key for a new Post.
        //const newPostKey = push(child(ref(db), 'Users')).key;
        //console.log(edit_key);
        // Write the new post's data simultaneously in the posts list and the user's post list.

        //window.location.reload();
    })

    $(document).on("click", ".deleteButton", function () {
        const result = confirm("Do you want to delete this object?");
        if (result) {
            // Nếu người dùng chọn OK, xóa đối tượng
            var delete_key = $(this).parent().parent().data("id");
            console.log(delete_key)
            const kanjiRef = ref(db, `learndekiru/${show_lessonList.value}/nguphap`);
            remove(child(kanjiRef, `${delete_key}`))
                .then(() => {
                    console.log("Đối tượng đã được xóa thành công!");
                })
                .catch((error) => {
                    console.error("Xóa đối tượng thất bại: ", error);
                });
        }else{
            console.log("Đã hủy xóa dữ liệu");
        }
        //$(this).parent().parent().hide();
    })
})












const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});



// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
})



const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
})


if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
})
