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
let dropdown = document.querySelector("#show_lessonList");
let dropdown1 = document.querySelector("#show_lessonList1");
var show_lessonList = document.getElementById("show_lessonList");
var show_lessonList1 = document.getElementById("show_lessonList1");



const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("myInput");



searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        let filter = document.getElementById("myInput").value.toUpperCase().replace(/\s+/g,' ').trim();
        let myTable = document.getElementById('tbody');
        let tr = myTable.getElementsByTagName('tr');
        if (filter !== "") {
            for (var i = 0; i < tr.length; i++) {
                let td1 = tr[i].getElementsByTagName('td')[0];
                let td2 = tr[i].getElementsByTagName('td')[1];
                
                if (td1 && td2) {
                    let textValue1 = td1.textContent || td1.innerHTML;
                    let textValue2 = td2.textContent || td2.innerHTML;
                    
                    if (textValue1.toUpperCase().indexOf(filter) > -1 || textValue2.toUpperCase().indexOf(filter) > -1 ) {
                        tr[i].style.display = "";
                        //tr[i].style.display = "";
                        
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        } else {
            // Gọi hàm tải lại bảng hoặc hiển thị tất cả các hàng tại đây
            // Ví dụ: loadTable();
            // Hoặc: showAllRows();
            getSeclectValue();
        }
    }
});
searchBtn.addEventListener("click", (e) => {
    let filter = document.getElementById("myInput").value.toUpperCase().replace(/\s+/g,' ').trim();
    let myTable = document.getElementById('tbody');
    let tr = myTable.getElementsByTagName('tr');
  
    if (filter !== "") {
        for (var i = 0; i < tr.length; i++) {
            let td1 = tr[i].getElementsByTagName('td')[0];
            let td2 = tr[i].getElementsByTagName('td')[1];
            
            if (td1 && td2) {
                let textValue1 = td1.textContent || td1.innerHTML;
                let textValue2 = td2.textContent || td2.innerHTML;
                
                if (textValue1.toUpperCase().indexOf(filter) > -1 || textValue2.toUpperCase().indexOf(filter) > -1 ) {
                    tr[i].style.display = "";
                    //tr[i].style.display = "";
                    
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    } else {
        // Gọi hàm tải lại bảng hoặc hiển thị tất cả các hàng tại đây
        // Ví dụ: loadTable();
        // Hoặc: showAllRows();
        getSeclectValue();
    }
  });

function getSeclectValue() {
    const db = getDatabase();
    const kanjiRef = ref(db, `learndekiru/Bài 1/newword`);
    onValue(kanjiRef, (snapshot) => {
        const newword = snapshot.val();
        //console.log(snapshot.val());
        tableBody.innerHTML = "";
        for (let nw in newword) {
            //console.log(kanji[kj]);
            let tr =
                `<tr data-id="${nw}">
                        
                        <td>${nw}</td>
    
                        <td>${newword[nw].mean}</td>
                        <td>
                            <button type="button" data-toggle="modal" data-target="#editModal" class="btn btn-outline-dark editButton" >Edit</button>
                            <button type="button" class="btn btn-outline-dark deleteButton">Delete</button>
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
        const lessonlist = snapshot.val();
        //console.log(snapshot.val());
        show_lessonList.innerHTML = "";
        show_lessonList1.innerHTML = "";
        for (let lesson in lessonlist) {
            //console.log(lessonlist[lesson]);
            let tr =
                `
                <option data-id="${lesson}">${lesson}</option>
                
                `
            dropdown.innerHTML += tr;
            dropdown1.innerHTML += tr;
        }

    });
    getSeclectValue();


    show_lessonList.addEventListener("change", function () {
        const kanjiRef = ref(db, `learndekiru/${show_lessonList.value}/newword`);
        onValue(kanjiRef, (snapshot) => {
            const newword = snapshot.val();
            //console.log(snapshot.val());
            tableBody.innerHTML = "";
            for (let nw in newword) {
                //console.log(kanji[kj]);
                let tr =
                    `<tr data-id="${nw}">
                        
                <td>${nw}</td>

                <td>${newword[nw].mean}</td>
                <td>
                    <button type="button" data-toggle="modal" data-target="#editModal" class="btn btn-outline-dark editButton" >Edit</button>
                    <button type="button" class="btn btn-outline-dark deleteButton" id="deleteButton">Delete</button>
                 </td>
                
            </tr>`
                tableBody.innerHTML += tr;

            }

        });
        //location.reload();
    })
    $("#addModal .submit").on("click", () => {
        var lesson = $("#addModal .show_lessonList1").val();
        var type = $("#addModal .show_type").val();
        var newword = $("#addModal .show_newword").val().replace(/\s{2,}/g, ' ').trim();
        var mean = $("#addModal .show_mean").val().replace(/\s{2,}/g, ' ').trim();
        let regexWord = /^[ぁ-んァ-ン一-龥()\s]/;
        let regexMean = /[\u00C0-\u1EF9a-zA-Z\s\p{P}]+/;


        if (newword.length == 0 || mean.length == 0) {
            alert("Please fill out all required fields."); return;
        } else if (!regexWord.test(newword)) {
            alert("'New word' field just contain Japanese");
            return false;
        } else if (!regexMean.test(mean)) {
            alert("'Mean' field just contain Vietnamese");
            return false;
        }
        else {
            set(ref(db, `learndekiru/${lesson}/${type}/${newword}`), {
                mean: mean.trim()
            })
                .then(() => {
                    alert("Add new word successfully !");
                    //location.reload();
                })
                .catch((error) => {
                    alert("Error: " + error);
                });

            $("[data-dismiss=modal]").trigger({ type: "click" });
        }
        //console.log(lesson, kanji, mean, read);


    })
    $(document).on("click", ".editButton", function () {
        var postKey = $(this).parent().parent().data("id");
        const newWordRef = ref(db, `learndekiru/${show_lessonList.value}/newword`);
        //console.log(postKey);
        get(child(newWordRef, postKey)).then((snapshot => {
            //console.log(snapshot.val());
            if (snapshot.exists()) {
                $("#editModal .edit_show_lesson").val(show_lessonList.value);
                $("#editModal .edit_show_newword").val(postKey);
                $("#editModal .edit_show_mean").val(snapshot.val().mean);
                $(".edit_key").val(postKey);
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
        var newword = $(".edit_show_newword").val().replace(/\s{2,}/g, ' ').trim();
        var meaning = $(".edit_show_mean").val().replace(/\s{2,}/g, ' ').trim();
        //var show_phone = $(".edit_show_phone").val();
        //var reading = $(".edit_show_read").val();
        var edit_key = $(".edit_key").val();
        let regexWord = /^[ぁ-んァ-ン一-龥()\s]/;
        let regexMean = /[\u00C0-\u1EF9a-zA-Z\s\p{P}]+/;
        // A post entry.
        const postData = {
            "mean": meaning
        };

        if (newword.length == 0 || meaning.length == 0) {
            alert("Please fill out all required fields."); return;
        } else if (!regexWord.test(newword)) {
            alert("'New word' field just contain Japanese");
            return false;
        } else if (!regexMean.test(meaning)) {
            alert("'Mean' field just contain Vietnamese");
            return false;
        }
        else {
            const updates = {};
            updates[`/learndekiru/${show_lessonList.value}/newword/` + edit_key] = postData;
            //updates['/User-posts/' + edit_key] = postData;
            update(ref(db), updates);
            alert("Successfully !");
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
            //console.log((delete_key))
            const newWordRef = ref(db, `learndekiru/${show_lessonList.value}/newword`);
            remove(child(newWordRef, delete_key))
                .then(() => {
                    console.log("Đối tượng đã được xóa thành công!");
                })
                .catch((error) => {
                    console.error("Xóa đối tượng thất bại: ", error);
                });
        } else {
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
