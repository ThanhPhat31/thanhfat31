import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
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



// read data

const dbRef = ref(getDatabase());

let tableBody = document.querySelector("tbody");
// let addUser = document.querySelector(".btn btn-outline-primary"),
//     popup = document.querySelector(".modal-body");






function changedateformat(val) {
    const myArray = val.split("-");
    let year = myArray[0];
    let month = myArray[1];
    let day = myArray[2];
    let formatteddate = day + "/" + month + "/" + year;
    return formatteddate;
}

function changedateformat1(val) {
    const myArray = val.split("/");
    let year = myArray[0];
    let month = myArray[1];
    let day = myArray[2];
    let formatteddate = day + "-" + month + "-" + year;
    return formatteddate;
}
function checkDate() {
    var regex = /^(1[89]|[2-9][0-9])\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    var date = document.getElementById('birthOfDate').value.trim();
    if (regex.test(date)) {
        var birthday = new Date(date); // Khởi tạo một đối tượng
        var ageDiffMs = Date.now() - birthday.getTime(); // Tính khoảng thời gian giữa ngày hiện tại và ngày sinh
        var ageDate = new Date(ageDiffMs);
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        // Tính toán số tuổi bằng cách lấy hiệu giữa năm hiện tại và năm 1970 (năm đầu tiên được hỗ trợ bởi hàm getUTCFullYear() của đối tượng Date).
        if (age < 12) {
            document.getElementById("txtDateMessage").innerHTML = "You must be over 12 years old";
            return false;
        } else {
            document.getElementById("txtDateMessage").innerHTML = "";
            return true;
        }
    } else {
        document.getElementById("txtDateMessage").innerHTML = "Dates must be in the format yyyy-mm-dd";
        return false;
    }
}

$(document).ready(function () {

    const db = getDatabase();
    const usersRef = ref(db, 'Users/');
    onValue(usersRef, (snapshot) => {
        const Users = snapshot.val();
        console.log(snapshot.val())
        tableBody.innerHTML = "";
        for (let user in Users) {
            // console.log(snapshot.key);
            let tr =
                `<tr data-id="${user}">
                    <td>
                        <p>${Users[user].fullName}</p>
                    </td>
                    <td>${Users[user].date}</td>
                    <td>${Users[user].gender}</td>
                    <td>${Users[user].phoneNo}</td>
                    <td>${Users[user].email}</td>
                    <td>${Users[user].userName}</td>
                   
                    <td>${Users[user].otp}</td>
                    <td>
                        <button type="button" data-toggle="modal" data-target="#editModal" class="btn btn-outline-dark editButton" >Edit</button>
                        
                    </td>
                </tr>`
            tableBody.innerHTML += tr;
        }

    });
    // get(child(dbRef, `Users/`)).then((snapshot) => {

    //     const Users = snapshot.val();
    //     for (let user in Users) {
    //          //console.log(snapshot.key);
    //         let tr =
    //             `<tr data-id="${user}">
    //         <td>
    //             <p>${Users[user].fullName}</p>
    //         </td>
    //         <td>${Users[user].date}</td>
    //         <td>${Users[user].gender}</td>
    //         <td>${Users[user].phoneNo}</td>
    //         <td>${Users[user].email}</td>
    //         <td>${Users[user].userName}</td>
    //         <td>${Users[user].passWord}</td>
    //         <td>${Users[user].otp}</td>
    //         <td>
    //             <button type="button" data-toggle="modal" data-target="#editModal" class="btn btn-outline-dark editButton" >Edit</button>
    //             <button type="button" class="btn btn-outline-dark">Delete</button>
    //         </td>
    //     </tr>`
    //         tableBody.innerHTML += tr;
    //     }
    // }).catch((error) => {
    //     console.log(error);
    // });
    $("#addModal .submit").on("click", () => {
        var name = $("#addModal .show_name").val();
        var date = $("#addModal .show_date").val();
        var gender = $("#addModal .show_gender").val();
        var phoneNo = $("#addModal .show_phone").val();
        var email = $("#addModal .show_email").val();
        var userName = $("#addModal .show_userName").val();
        var password = $("#addModal .show_pass").val();
        var status = $("#addModal .show_status").val();
        let nameregex = /^[a-zA-Z\s]+$/;
        let emailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/;
        let usernameregex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
        let passregex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
        let dateregex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        let phoneregex = /^0\d{9,10}$/;

        if (name.length == 0 || date.length == 0 || gender.length == 0 || phoneNo.length == 0 || email.length == 0 || userName.length == 0 || password.length == 0 || status.length == 0) {
            alert("You can not leave any fields emty!"); return;
        }
        else if (!nameregex.test(name)) {
            alert("The name should only contain alphabet");
            return false;
        }
        else if (!dateregex.test(changedateformat(date))) {
            alert("Dates must be in the format dd/mm/yyyy");
            return false;
        }
        else if (!phoneregex.test(phoneNo)) {
            alert("Invalid phone number Exam: 0976340***");
            return false;
        }
        else if (!emailregex.test(email)) {
            alert("Invalid email format Exam:A@gmail.com");
            return false;
        }
        else if (!usernameregex.test(userName)) {
            alert("Username is 8-20 characters long Example: vanAnh123");
            return false;
        }
        else if (!passregex.test(password)) {
            alert("Invalid password,one character,one uppercasse Example: LuanptA123");
        }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ... user.uid
                    set(ref(database, 'Users/' + user.uid), {
                        "fullName": name,
                        "date": date,
                        "gender": gender,
                        "phoneNo": phoneNo,
                        "email": email,
                        "userName": userName,
                        "passWord": password,
                        "otp": status
                    })
                        .then(() => {
                            // Data saved successfully!
                            alert('user add successfully');

                        })
                        .catch((error) => {
                            // The write failed...
                            alert("error: " + error);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    alert("erro" + errorCode + errorMessage);
                });
            location.reload();
            var name = $("#addModal .show_name").val("");
            var date = $("#addModal .show_date").val("");
            var gender = $("#addModal .show_gender").val("");
            var phoneNo = $("#addModal .show_phone").val("");
            var email = $("#addModal .show_email").val("");
            var userName = $("#addModal .show_userName").val("");
            var password = $("#addModal .show_pass").val("");
            var status = $("#addModal .show_status").val("");
            $("[data-dismiss=modal]").trigger({type : "click"});
        }
    })
    $(document).on("click", ".editButton", function () {
        var postKey = $(this).parent().parent().data("id");
        var postRef = ref(db, 'Users/' + postKey);
        const dbRef = ref(db);
        //console.log(postKey);
        get(child(dbRef, "Users/" + postKey)).then((snapshot => {
            if (snapshot.exists()) {

                $("#editModal .edit_show_name").val(snapshot.val().fullName);
                $("#editModal .edit_show_date").val(changedateformat1(snapshot.val().date));
                $("#editModal .edit_show_gender").val(snapshot.val().gender);
                $("#editModal .edit_show_phone").val(snapshot.val().phoneNo);
                $("#editModal .edit_show_email").val(snapshot.val().email);
                $("#editModal .edit_show_userName").val(snapshot.val().userName);
                $("#editModal .edit_show_pass").val(snapshot.val().passWord);
                $("#editModal .edit_show_status").val(snapshot.val().otp);
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
    $(".save_edited_data").on("click", (event) => {
        var edit_name = $(".edit_show_name").val();
        var show_date = $(".edit_show_date").val();
        var show_gender = $(".edit_show_gender").val();
        var show_phone = $(".edit_show_phone").val();
        var show_email = $(".edit_show_email").val();
        var show_username = $(".edit_show_userName").val();
        var show_pass = $(".edit_show_pass").val();
        var show_status = $(".edit_show_status").val();
        var edit_key = $(".edit_key").val();
        let nameregex = /[\u00C0-\u1EF9a-zA-Z\s\p{P}]+/;
        let emailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook|fpt.edu)\.com$/;
        let usernameregex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
        let passregex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
        let dateregex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        let phoneregex = /^0\d{9,10}$/;
        // A post entry.
        const postData = {
            "fullName": edit_name,
            "date": changedateformat(show_date),
            "gender": show_gender,
            "phoneNo": show_phone,
            "email": show_email,
            "userName": show_username,
            "passWord": show_pass,
            "otp": show_status
        };
        // Get a key for a new Post.
        //const newPostKey = push(child(ref(db), 'Users')).key;
        //console.log(edit_key);
        // Write the new post's data simultaneously in the posts list and the user's post list.
        
        //updates['/User-posts/' + edit_key] = postData;
        if (edit_name.length == 0 || show_date.length == 0 || show_gender.length == 0 || show_phone.length == 0 || show_email.length == 0 || show_username.length == 0 || show_pass.length == 0 || show_status.length == 0) {
            alert("You can not leave any fields emty!"); return;
        }
        else if (!nameregex.test(edit_name)) {
            alert("The name should only contain alphabet");
            return false;
        }
        else if (!dateregex.test(changedateformat(show_date))) {
            alert("Dates must be in the format dd/mm/yyyy");
            return false;
        }
        else if (!phoneregex.test(show_phone)) {
            alert("Invalid phone number Exam: 0976340***");
            return false;
        }
        else if (!emailregex.test(show_email)) {
            alert("Invalid email format Exam:A@gmail.com");
            return false;
        }
        else if (!usernameregex.test(show_username)) {
            alert("Username is 8-20 characters long Example: vanAnh123");
            return false;
        }
        else if (!passregex.test(show_pass)) {
            alert("Invalid password,one character,one uppercasse Example: LuanptA123");
        }
        else {
            const updates = {};
            updates['/Users/' + edit_key] = postData;
            update(ref(db), updates);
            $("[data-dismiss=modal]").trigger({type : "click"});
         //window.location.reload();
        }
        
        
    })

    $(document).on("click", ".deleteButton", function () {
        var delete_key = $(this).parent().parent().data("id");
        remove(child(dbRef, "Users/" + delete_key));
        $(this).parent().parent().hide();
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

