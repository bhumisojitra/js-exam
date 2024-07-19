let title = document.getElementById('title');
let description = document.getElementById('description');
let date = document.getElementById('date');
let priority = document.getElementById('priority');
let viewData = document.getElementById('viewData');

let isEdit = false;
let isId;

const getData = () => {
    
    let data = JSON.parse(localStorage.getItem('management'));

    if(data){
        return data;
    }
    else{
        return [];
    }
}

let stor = getData();

const addData = () => {

    event.preventDefault();

    let obj = {
        id: isId ? isId : Math.floor(Math.random () * 1000),
        title: title.value,
        description: description.value,
        date: date.value,
        priority: priority.value,
    }

    if(isEdit){
        let data = [...stor];

        let uprec = data.map((rec) => {
            if(rec.id === isId){
                return obj;
            }
            else{
                return rec;
            }
        })

        stor = uprec;
        console.log('uprec :', uprec);

        isEdit = false;
        isId = undefined;
    }
    else{

        stor = [...stor, obj];
        console.log(stor);
        console.log(obj);
    }

    localStorage.setItem('management', JSON.stringify(obj));

    title.value = '';
    description.value = '';
    date.value = '';
    priority.value = '';

    displayData();
}

const editData = (id) => {
    let data = [...stor];

    let editrec = stor.filter((rec) => {

        return rec.id === id;
    })

    isEdit = true;
    isId = id;

    console.log(data);
    console.log(editrec[0]);

    title.value = editrec[0].title;
    description.value = editrec[0].description;
    date.value = editrec[0].date;
    priority.value = editrec[0].priority;
}

const deleteData = (id) => {

    data = [...stor];

    let deleterec = data.filter((da) => {

        return da.id !== id;
    });

    console.log(deleterec);
    stor = deleterec;   

    localStorage.setItem('management', JSON.stringify(deleterec));

    displayData();
}
const displayData = () => {

    viewData.innerHTML = '';

    stor.forEach((ele) => {
        viewData.innerHTML += `<tr>
        <td>${ele.id}</td>
        <td>${ele.title}</td>
        <td>${ele.description}</td>
        <td>${ele.date}</td>
        <td>${ele.priority}</td>
        <td><button onclick="return editData(${ele.id})" class="btn btn-primary">edit</button></td> 
        <td><button onclick="return deleteData(${ele.id})" class="btn btn-danger">delete</button></td>
        </tr>`
    })
}
displayData();