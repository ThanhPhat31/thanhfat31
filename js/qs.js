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

$(document).ready(function () {

    const db = getDatabase();
    const questionRef = ref(db, 'questions/bai1');

    const questionRef2 = ref(db, 'questions');
    let nameSelected;
    let session;
    console.log(questionRef2);
    // Lấy danh sách các document trong collection 'questions'
    onValue(questionRef2, function (snapshot) {
        const questions = snapshot.val();
        console.log(questions);
        // Lặp qua tất cả các document và thêm giá trị của trường 'title' vào select box
        let selectBox = document.getElementById('question-list');
        selectBox.innerHTML = '<option value="">-- Select a question --</option>';
        selectBox.addEventListener('change', displayQuestion);

        const keys = Object.keys(questions);
        keys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.text = key;
            selectBox.appendChild(option);
        });

    });

    // Lấy danh sách các document trong collection 'questions'
    onValue(questionRef2, function (snapshot) {
        const questions = snapshot.val();
        console.log(questions);
        // Lặp qua tất cả các document và thêm giá trị của trường 'title' vào select box
        let selectBox = document.getElementById('question-list-1');
        selectBox.innerHTML = '<option value="">-- Select a question --</option>';
        selectBox.addEventListener('change', displayQuestion1);

        const keys = Object.keys(questions);
        keys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.text = key;
            selectBox.appendChild(option);
        });

    });

    // Lấy danh sách các document trong collection 'questions'
    onValue(questionRef2, function (snapshot) {
        const questions = snapshot.val();
        console.log(questions);
        // Lặp qua tất cả các document và thêm giá trị của trường 'title' vào select box
        let selectBox = document.getElementById('question-list-2');
        selectBox.innerHTML = '<option value="">-- Select a question --</option>';
        selectBox.addEventListener('change', displayQuestion1);

        const keys = Object.keys(questions);
        keys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.text = key;
            selectBox.appendChild(option);
        });

    });




    console.log(questionRef);
    // onValue(questionRef, (snapshot) => {
    //     const questions = snapshot.val();
    //     //console.log(snapshot.val());
    //     for (let qs in questions) {
    //         console.log(questions[qs].answermatching);
    //         if (questions[qs].typequestion == 1) {
    //             let tr =
    //                 `<tr data-id="${qs}">
    //                 <td>
    //                     <p>${questions[qs].question}</p>
    //                 </td>
    //                 <td>${questions[qs].answer}</td>

    //                 <td>${questions[qs].answerchose}</td>
    //                 <td>${questions[qs].typequestion}</td>

    //                 <td>
    //                     <button type="button" data-toggle="modal" data-target="#editModal" class="btn btn-outline-dark editButton" >Edit</button>
    //                     <button type="button" class="btn btn-outline-dark deleteButton">Delete</button>
    //                 </td>
    //             </tr>`
    //             tableBody.innerHTML += tr;
    //         }

    //         else if (questions[qs].typequestion == 2) {
    //             let rr =
    //                 `<table>`
    //             for (let index in questions[qs].answerchose) {
    //                 //console.log(questions[qs].answerchose)
    //                 rr += `<tr><td>${questions[qs].answerchose[index]}</td></tr>`

    //             }
    //             rr +=
    //                 `</table>`
    //             let tr =
    //                 `<tr data-id="${qs}">
    //                 <td>
    //                     <p>${questions[qs].question}</p>
    //                 </td>
    //                 <td>${questions[qs].answer}</td>

    //                 <td>${rr}</td>
    //                 <td>${questions[qs].typequestion}</td>

    //                 <td>
    //                     <button type="button" data-toggle="modal" data-target="#editModal" class="btn btn-outline-dark editButton" >Edit</button>
    //                     <button type="button" class="btn btn-outline-dark deleteButton">Delete</button>
    //                 </td>
    //             </tr>`
    //             tableBody.innerHTML += tr;
    //         }
    //         else {
    //             let rr = `<table>`
    //             for (const [key, value] of Object.entries(questions[qs].answermatching)) {
    //                 rr += `<tr><td>${key}: ${value}</td></tr>`;
    //             }
    //             rr += `</table>`
    //             let rt = `<table>`
    //             //for (let index in questions[qs].questionmatching) {
    //             //console.log(questions[qs].questionmatching)

    //             for (const [key, value] of Object.entries(questions[qs].questionmatching)) {
    //                 rt += `<tr><td>${key}: ${value}</td></tr>`;
    //             }

    //             //}
    //             rt += `</table>`

    //             let tr =
    //                 `<tr data-id="${qs}">
    //                 <td>
    //                     <p>${questions[qs].question}</p>
    //                 </td>
    //                 <td>${rr}</td>

    //                 <td>${rt}</td>
    //                 <td>${questions[qs].typequestion}</td>

    //                 <td>
    //                     <button type="button" data-toggle="modal" data-target="#editModal" class="btn btn-outline-dark editButton" >Edit</button>
    //                     <button type="button" class="btn btn-outline-dark deleteButton">Delete</button>
    //                 </td>
    //             </tr>`
    //             tableBody.innerHTML += tr;
    //         }
    //     }

    // });
    function displayQuestion1() {
        nameSelected = this.value;
    }
    function displayQuestion() {
        // Get the selected question ID
        let questionId = this.value;
        const db = getDatabase();
        nameSelected = this.value;
        // Get the question data from the database
        let questionRef = ref(db, 'questions/' + questionId);

        get(questionRef).then((snapshot) => {
            let questionData = snapshot.val();
            console.log(questionData);

            const keys = Object.keys(questionData);
            let questionContainer = document.getElementById('question-container');
            questionContainer.innerHTML = '';

            // Create the table element
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');
            table.appendChild(thead);
            table.appendChild(tbody);

            // Create the table header row
            let headerRow = document.createElement('tr');
            let questionHeader = document.createElement('th');
            questionHeader.innerText = 'Question';
            let answerHeader = document.createElement('th');
            answerHeader.innerText = 'Answer';
            let answerChooseHeader = document.createElement('th');
            answerChooseHeader.innerText = 'Answer Choose';
            let typeHeader = document.createElement('th');
            typeHeader.innerText = 'Type of Question';
            let actionHeader = document.createElement('th');
            actionHeader.innerText = 'Action';
            headerRow.appendChild(questionHeader);
            headerRow.appendChild(answerHeader);
            headerRow.appendChild(answerChooseHeader);
            headerRow.appendChild(typeHeader);
            headerRow.appendChild(actionHeader);
            thead.appendChild(headerRow);

            keys.forEach(key => {
                console.log(key);
                // Create the table row
                let row = document.createElement('tr');
                // Add the question
                let questionCell = document.createElement('td');
                questionCell.innerText = questionData[key].question;
                row.appendChild(questionCell);

                // Add the answer
                let answerCell = document.createElement('td');
                answerCell.innerText = questionData[key].answer;
                row.appendChild(answerCell);

                // Add the answer choices (if applicable)
                let answerChooseCell = document.createElement('td');
                if (questionData[key].answerchose) {
                    answerChooseCell.innerText = questionData[key].answerchose.join(', ');
                }
                row.appendChild(answerChooseCell);

                // Add the type of question
                let typeCell = document.createElement('td');
                typeCell.innerText = questionData[key].typequestion;
                row.appendChild(typeCell);

                // Add the action button
                let actionCell = document.createElement('td');
                let deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.addEventListener('click', () => {
                    // Delete the question from the database
                    session = Object.keys(questionData)[Array.from(tbody.children).indexOf(row)];
                    let questionRef = ref(db, 'questions/' + nameSelected + "/" + session);
                    remove(questionRef);
                    // Remove the row from the table
                    row.remove();
                    window.location.reload();
                });
                actionCell.appendChild(deleteButton);
                row.appendChild(actionCell);

                // Add the action buttons
                let editButton = document.createElement('button');
                editButton.innerText = 'Edit';
                editButton.addEventListener('click', () => {
                    // Handle the edit button click event
                    // ...
                    let rowData = row.cells;
                    // Populate the modal with the row data
                    let questionInput = document.getElementById('question-1');
                    questionInput.value = rowData[0].innerText;
                    let answerInput = document.getElementById('answer-2');
                    answerInput.value = rowData[1].innerText;
                    let answerChoicesInput = document.getElementById('answer-choices-3');
                    answerChoicesInput.value = rowData[2].innerText;
                    let typeInput = document.getElementById('type-4');
                    typeInput.value = rowData[3].innerText;

                    session = Object.keys(questionData)[Array.from(tbody.children).indexOf(row)];
                    console.log(key);
                    $('#editModal6').modal('show');
                });
                actionCell.appendChild(editButton);

                // Add the row to the table body
                tbody.appendChild(row);
            });

            // Add the table to the question container
            questionContainer.appendChild(table);
        });
    }

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
        let question = document.getElementById('question').value;
        let answer = document.getElementById('answer').value;
        let answerChoices = document.getElementById('answer-choices').value.split(',');
        let type = document.getElementById('type').value;
        let questionId = this.value;
        console.log(questionId);

        if (question && answer && answerChoices.length && type && nameSelected) {
            let questionRef = ref(db, 'questions/' + nameSelected);
            get(questionRef).then((snapshot) => {
                let questionData2 = snapshot.val();

                // // Add the new question to the database
                let newQuestionRef = ref(db, 'questions/' + nameSelected + "/" + "question" + (Object.keys(questionData2).length + 1));
                console.log(newQuestionRef)
                set(newQuestionRef, {
                    question: question,
                    answer: answer,
                    answerchose: answerChoices,
                    typequestion: type
                }).then(() => {
                    alert('successfully create!');
                    $('#addModal').modal('hide');
                })
                    .catch((error) => {
                        alert('Error create: ', error);
                    });
                ;

                console.log({
                    question: question,
                    answer: answer,
                    answerchose: answerChoices,
                    typequestion: type
                })
            });

            window.location.reload();
        } else {
            alert("Please fill out all required fields.");
        }


    })

    $("#addModal1 .submit").on("click", () => {
        alert("đã vô");

        let question = document.getElementById('question').value;
        let answer = document.getElementById('answer').value;
        let answerChoices = document.getElementById('answer-choices').value.split(',');
        let type = document.getElementById('type').value;
        let questionId = this.value;
        console.log(nameSelected);
        if (question && answer && answerChoices.length && type && nameSelected) {
            // Add the new question to the database
            let newQuestionRef = push(ref(db, 'questions/' + nameSelected));
            set(newQuestionRef, {
                question: question,
                answer: answer,
                answerchose: answerChoices,
                typequestion: type
            });

            console.log({
                question: question,
                answer: answer,
                answerchose: answerChoices,
                typequestion: type
            })

            // // Close the modal
            // let modal = document.getElementById('add-question-modal');
            // let modalInstance = bootstrap.Modal.getInstance(modal);
            // modalInstance.hide();
            window.location.reload();
        } else {
            alert("Please fill out all required fields.");
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

    $(".save_edited_data_2").on("click", (event) => {
        event.preventDefault();
        let question = document.getElementById('question-1').value.replace(/ /g,'');
        let answer = document.getElementById('answer-2').value;
        let answerChoices = document.getElementById('answer-choices-3').value.split(',');
        let type = document.getElementById('type-4').value;
        let questionId = this.value;
        console.log(questionId);
        // Add the new question to the database
        if (question && answer && answerChoices.length && type) {
        const db = getDatabase();
        let newQuestionRef = ref(db, 'questions/' + nameSelected + "/" + session);
        console.log(newQuestionRef);

        update(newQuestionRef, {
            question: question,
            answer: answer,
            answerchose: answerChoices,
            typequestion: type
        })
            .then(() => {
                alert('successfully updated!');
                $('#editModal6').modal('hide');

            })
            .catch((error) => {
                alert('Error updating: ', error);
            });

        console.log({
            question: question,
            answer: answer,
            answerchose: answerChoices,
            typequestion: type
        })

        // // Close the modal
        // let modal = document.getElementById('add-question-modal');
        // let modalInstance = bootstrap.Modal.getInstance(modal);
        // modalInstance.hide();
        window.location.reload();
    }else{
        alert("Please fill out all required fields.");
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
