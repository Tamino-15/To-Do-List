function getTodo(){
    let date = document.getElementById('date').value;
    let text = document.getElementById('text-area').value;
    console.log(date);
    console.log(text);
    
    let div = document.createElement('div');

    let table = document.createElement('table');

    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    td1.innerHTML = date;

    let td2 = document.createElement('td');
    td2.innerHTML = text;

    let td3 = document.createElement('td');
    td3.setAttribute("id", "td3");
    let checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    td3.appendChild(checkbox);

    let td4 = document.createElement('td');  
    td4.setAttribute("id", "td4");
    let delet = document.createElement('button'); 
    let contenDelet= document.createTextNode("DEL");
    delet.appendChild(contenDelet);
    td4.appendChild(delet);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    table.appendChild(tr);
    div.appendChild(table);

    document.getElementById('thingsToDo').appendChild(div);

}

