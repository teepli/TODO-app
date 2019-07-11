let html = document.getElementById("accordion");

axios.get('/api/todo')
    .then(response => {
        renderToPage(response.data);
        console.log(response)
    })
    .catch(function (error) {
        html.innerHTML = '<h2 style="color: red"> Unknown error when fetching data';
        console.log(error);
    })
    .finally(function () {
    });


function renderToPage(response) {
    response.sort(function (a, b) {
        return a.id - b.id
    });
    response.forEach(r => renderOneToPage(r));
}

function renderOneToPage(response) {
    let options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    let date = new Date(response.duedate).toLocaleString()
    let dateNow = Date.now().toLocaleString();

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
        '<input type="checkbox" class="form-check-input" id="check' + response.id + '"' + isFinished2 + '>' +
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
            handleDateChange(response.data, id)
            console.log(response)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

function toggleButtonTrue(id) {
    document.getElementById("check" + id).value = 'true';
    document.getElementById("check" + id).onclick = function () {
        toggleButtonFalse(id)
    }
    document.getElementById("subject" + id).classList = "btn btn-link-done collapsed";
    modifyTodo(id);
}

function toggleButtonFalse(id) {
    document.getElementById("check" + id).value = 'false';
    document.getElementById("check" + id).onclick = function () {
        toggleButtonTrue(id)
    };
    document.getElementById("subject" + id).classList = "btn btn-link collapsed";
    modifyTodo(id);
}

function handleDateChange(response, id) {
    let parentDiv = document.getElementById("heading" + id).parentNode;
    let date = new Date(response.duedate).toLocaleString()
    let dateNow = Date.now().toLocaleString();
    parentDiv.classList = (date < dateNow) ? 'card bg-danger' : 'card bg-dark';

}

