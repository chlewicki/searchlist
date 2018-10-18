if(localStorage.myList){
    document.querySelector("ul").innerHTML = localStorage.myList;
} else{
    localStorage.myList = document.querySelector("ul").innerHTML;
}

let form = document.querySelector('#form');
let list = document.querySelector('ul');
let search = document.querySelector('#search');
let confirmBox = document.querySelector('#confirm');
let del = document.querySelector('#confirmbtn');

if(confirmBox.style.display != 'none'){
    confirmBox.addEventListener('click', function(){
        confirmBox.style.display = 'none';
    });
}

form.addEventListener('submit', addItem);
list.addEventListener('click', editItem);
search.addEventListener('keyup', searchList);

function addItem(e){
    e.preventDefault();
    let text = document.getElementById('itemText');
    if(text.value != ''){
        let itemText = document.getElementById('itemText').value;
        let newLi = document.createElement('li');
        newLi.classList = 'li-item';
        let delBtn = document.createElement('button');
        delBtn.classList = 'delBtn';
        delBtn.appendChild(document.createTextNode('X'));

        newLi.appendChild(document.createTextNode(itemText));
        newLi.appendChild(delBtn);
        list.appendChild(newLi);
        text.value = '';
        localStorage.myList = list.innerHTML;
    }
}

function editItem(e){
    if(e.target.classList.contains('delBtn')){
        confirmBox.style.display = 'block';
        del.onclick = function(){
            let li = e.target.parentNode;
            list.removeChild(li);
            localStorage.myList = list.innerHTML;
        };   
    }
    //edit already added item
    if(e.target.classList.contains('li-item')){
        let li = e.target;
        Array.from(li);
        let textToChange = li.firstChild.textContent;
        let input = document.createElement('input');
        input.classList = 'input';
        input.setAttribute('type', 'text');
        input.setAttribute('value', textToChange);
        //autofocus on all inputs?
        list.insertBefore(input, li);
        list.removeChild(li);

        //add changed input to list
        input.addEventListener('blur', function(e){ //keyup, keyCode 13?
            let itemText = input.value;
            let edited = document.createElement('li');
            edited.classList = 'li-item';
            let delBtn = document.createElement('button');
            delBtn.classList = 'delBtn';
            delBtn.appendChild(document.createTextNode('X'));
            if(itemText == ''){
                edited.appendChild(document.createTextNode(textToChange));
            }else{
                edited.appendChild(document.createTextNode(itemText));
            }
            edited.appendChild(delBtn);
            list.insertBefore(edited, input);
            
            list.removeChild(input);
            localStorage.myList = list.innerHTML;
        });
    }
}
function searchList(e){
    let filter = e.target.value.toLowerCase();
    let liList = list.querySelectorAll('li');
    //change to array
    Array.from(liList).forEach(function(li){
        let liName = li.firstChild.textContent;
        if(liName.toLowerCase().indexOf(filter) != -1){
            li.style.display = 'flex';
        } else{
            li.style.display = 'none';
        }
    })
}
