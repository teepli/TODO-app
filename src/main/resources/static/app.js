// Make a request for a user with a given ID
axios.get('/api/todo')
    .then(response => {
        renderToPage(response.data);
        console.log(response)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

let html = document.getElementById("accordion");

function renderToPage(response) {
    console.log(response);
    for (let i = 0; i < response.length; i++) {
        // renderOneToPage(response[i])
        let options = {day: 'numeric', month: 'numeric', year: 'numeric'};
        let date = new Date(response[i].duedate).toLocaleString()
        let dateNow = Date.now().toLocaleString();
        console.log(date)
        console.log(dateNow)
        console.log(date > dateNow)

        let dateComparision = (date < dateNow) ? '<div class="card bg-danger">' : '<div class="card bg-dark">';
        let isFinished = (response[i].finished) ? 'btn btn-link-done collapsed' : 'btn btn-link collapsed';
        let isFinished2 = (response[i].finished) ? 'onclick="toggleButtonFalse(' + response[i].id + ')" value="true" checked' :
                                                    'onclick="toggleButtonTrue(' + response[i].id + ')" value="false"';
        // .toLocaleString("fi", options)
        // date.setTime(response[i].duedate)
        // console.log(date)
        html.innerHTML += dateComparision +
            '<div class="card-header" id="heading' + response[i].id + '">' +
            '<h2 class="mb-0">' +
            // '<div class="form-check">' +
            '<input type="checkbox" class="form-check-input" id="check' + response[i].id + '"' + isFinished2 +  '>' +
            // '<label class="form-check-label" for="exampleCheck1">Check me out</label>' +
            // '</div>' +
            '<button class="' + isFinished + '" type="button" data-toggle="collapse" data-target="#collapse' +
            response[i].id + '" aria-expanded="false" aria-controls="collapse' + response[i].id + '" contenteditable="true" id="subject' + response[i].id + '">' +
            response[i].subject +
            '</button>' +
            '<button type="button" class="btn btn-warning float-right" ' +
            'id="button' + response[i].id + '" onclick="deleteTodo(' + response[i].id + ')"  >Delete</button>' +
            '<button type="button" class="btn btn-success float-right" onclick="modifyTodo(' + response[i].id + ')">Modify</button>' +
            '</h2> </div>' +

            '<div id="collapse' + response[i].id + '" class="collapse" aria-labelledby="heading' + response[i].id + '" data-parent="#accordion">' +
            '<div class="card-body" contenteditable="true" id="description' + response[i].id + '">' +
            response[i].description +
            '<div class="form-group mx-sm-3 mb-2">' +
            '<input class="form-control" type="date" value="' + response[i].duedate + '" id="date' + response[i].id + '">' +
            '</div>' +
            '</div> </div> </div>';
    }
}

function renderOneToPage(response) {
        let options = {day: 'numeric', month: 'numeric', year: 'numeric'};
        let date = new Date(response.duedate).toLocaleString()
        let dateNow = Date.now().toLocaleString();
        console.log(date)
        console.log(dateNow)
        console.log(date > dateNow)

        let dateComparision = (date < dateNow) ? '<div class="card bg-danger">' : '<div class="card bg-dark">';
        let isFinished = (response.finished) ? 'btn btn-link-done collapsed' : 'btn btn-link collapsed';
        let isFinished2 = (response.finished) ? 'onclick="toggleButtonFalse(' + response.id + ')" value="true" checked' :
                                                    'onclick="toggleButtonTrue(' + response.id + ')" value="false"';
        // .toLocaleString("fi", options)
        // date.setTime(response[i].duedate)
        // console.log(date)
        html.innerHTML += dateComparision +
            '<div class="card-header" id="heading' + response.id + '">' +
            '<h2 class="mb-0">' +
            // '<div class="form-check">' +
            '<input type="checkbox" class="form-check-input" id="check' + response.id + '"' + isFinished2 +  '>' +
            // '<label class="form-check-label" for="exampleCheck1">Check me out</label>' +
            // '</div>' +
            '<button class="' + isFinished + '" type="button" data-toggle="collapse" data-target="#collapse' +
            response.id + '" aria-expanded="false" aria-controls="collapse' + response.id + '" contenteditable="true" id="subject' + response.id + '">' +
            response.subject +
            '</button>' +
            '<button type="button" class="btn btn-warning float-right" ' +
            'id="button' + response.id + '" onclick="deleteTodo(' + response.id + ')"  >Delete</button>' +
            '<button type="button" class="btn btn-success float-right" onclick="modifyTodo(' + response.id + ')">Modify</button>' +
            '</h2> </div>' +

            '<div id="collapse' + response.id + '" class="collapse" aria-labelledby="heading' + response.id + '" data-parent="#accordion">' +
            '<div class="card-body" contenteditable="true" id="description' + response.id + '">' +
            response.description +
            '<div class="form-group mx-sm-3 mb-2">' +
            '<input class="form-control" type="date" value="' + response.duedate + '" id="date' + response.id + '">' +
            '</div>' +
            '</div> </div> </div>';

}

function getOneTodo(id) {
    axios.get('/api/todo/' + id)
        .then(response => {
            renderOneToPage(response.data);
            console.log(response)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

function postTodo() {
    let subject = document.getElementById("subjectTodo").value;
    let description = document.getElementById("descriptionTodo").value;
    let date = document.getElementById("date-input").value;
    console.log(date)
    axios
        .post('/api/todo', {
            subject: subject,
            description: description,
            duedate: date
        })
        .then(response => {
            renderOneToPage(response.data);
            console.log(response)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

function deleteTodo(id) {
    let buttonid = document.getElementById("button" + id);
    buttonid.parentNode.parentNode.parentNode.remove();
    console.log(id);
    axios.delete('/api/todo/' + id)
        .then(response => {
            console.log(response)
        })
}

function modifyTodo(id) {
    let subjectField = document.getElementById("subject" + id);
    let descriptionField = document.getElementById("description" + id);
    let checkbox = document.getElementById("check" + id);
    let date = document.getElementById("date" + id);

    axios
        .put('/api/todo/' + id, {
            subject: subjectField.innerText,
            description: descriptionField.innerText,
            finished: checkbox.value,
            duedate: date.value,
            id: id
        })
        .then(response => {
            subjectField.parentNode.parentNode.parentNode.remove();

            renderOneToPage(response.data);
            console.log(response)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            location.reload(forceGet);
        });
}


function toggleButtonTrue(id) {
    // let checkbox = document.getElementById("check" + id);
    document.getElementById("check" + id).value = 'true';
    document.getElementById("check" + id).onclick = function() {toggleButtonFalse(id)}
    document.getElementById("subject" + id).classList = "btn btn-link-done collapsed";
    // checkbox.value = 'true';
    // checkbox.ontoggle = 'toggleButtonFalse(id)';
    modifyTodo(id);
    // console.log(checkbox.value)
}

function toggleButtonFalse(id) {
    // let checkbox = document.getElementById("check" + id);
    document.getElementById("check" + id).value = 'false';
    document.getElementById("check" + id).onclick = function() {toggleButtonTrue(id)}
    document.getElementById("subject" + id).classList = "btn btn-link collapsed";
    // checkbox.value = 'false';
    // checkbox.ontoggle = 'toggleButtonTrue(id)';
    modifyTodo(id);
    // console.log(checkbox.value)

}

function handleDateChange(div, id) {

}

