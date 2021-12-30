//cal:
document.addEventListener('DOMContentLoaded', function () {
    // Query the element
    //cal:
    const knobcal = document.getElementById('knob_caloreis');
    const leftSideC = knobcal.previousElementSibling;
    const rightSideC = knobcal.nextElementSibling;

    // The current position of mouse
    let x = 0;
    let y = 0;
    let leftWidth = 0;

    var output = document.getElementById("cal_val");
    output.innerHTML = 0;

    // Handle the mousedown event
    // that's triggered when user drags the knob
    const mouseDownHandler = function (e) {
        // Get the current mouse position
        x = e.clientX;
        y = e.clientY;
        leftWidth = leftSideC.getBoundingClientRect().width;

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        const containerWidth = knobcal.parentNode.getBoundingClientRect().width;
        let newLeftWidth = ((leftWidth + dx) * 100) / containerWidth;
        newLeftWidth = Math.max(newLeftWidth, 0);
        newLeftWidth = Math.min(newLeftWidth, 100);

        leftSideC.style.width = `${newLeftWidth}%`;

        leftSideC.style.userSelect = 'none';
        leftSideC.style.pointerEvents = 'none';

        rightSideC.style.userSelect = 'none';
        rightSideC.style.pointerEvents = 'none';


        //norm value:
        const start = 10;
        const max = 690;
        const factor = 20;
        const min = 0;
        var output = document.getElementById("cal_val");
        output.innerHTML = start + Math.round(Math.min(Math.max(newLeftWidth * factor, min), max));

        newLeftWidth.oninput = function () {
            output.innerHTML = this.value;
        }
    };

    // Triggered when user drops the knob
    const mouseUpHandler = function () {
        leftSideC.style.removeProperty('user-select');
        leftSideC.style.removeProperty('pointer-events');

        rightSideC.style.removeProperty('user-select');
        rightSideC.style.removeProperty('pointer-events');

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    knobcal.addEventListener('mousedown', mouseDownHandler);
});


//fat:
document.addEventListener('DOMContentLoaded', function () {
    // Query the element
    //cal:
    const knobfat = document.getElementById('knob_fat');
    const leftSideF = knobfat.previousElementSibling;
    const rightSideF = knobfat.nextElementSibling;

    // The current position of mouse
    let x = 0;
    let y = 0;
    let leftWidth = 0;

    var output = document.getElementById("fat_val");
    output.innerHTML = 0;


    // Handle the mousedown event
    // that's triggered when user drags the knob
    const mouseDownHandler = function (e) {
        // Get the current mouse position
        x = e.clientX;
        y = e.clientY;
        leftWidth = leftSideF.getBoundingClientRect().width;

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        const containerWidth = knobfat.parentNode.getBoundingClientRect().width;
        let newLeftWidth = ((leftWidth + dx) * 100) / containerWidth;
        newLeftWidth = Math.max(newLeftWidth, 0);
        newLeftWidth = Math.min(newLeftWidth, 100);

        leftSideF.style.width = `${newLeftWidth}%`;

        leftSideF.style.userSelect = 'none';
        leftSideF.style.pointerEvents = 'none';

        rightSideF.style.userSelect = 'none';
        rightSideF.style.pointerEvents = 'none';


        //norm value:
        const start = 0;
        const max = 100;
        const factor = 1.2;
        const min = 0;
        var output = document.getElementById("fat_val");
        output.innerHTML = start + Math.round(Math.min(Math.max(newLeftWidth * factor, min), max));

        newLeftWidth.oninput = function () {
            output.innerHTML = this.value;
        }
    };

    // Triggered when user drops the knob
    const mouseUpHandler = function () {
        leftSideF.style.removeProperty('user-select');
        leftSideF.style.removeProperty('pointer-events');

        rightSideF.style.removeProperty('user-select');
        rightSideF.style.removeProperty('pointer-events');

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    knobfat.addEventListener('mousedown', mouseDownHandler);
});

//open search tabs:
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

//open update tabs:
function openUpdateTab(evt, tabname) {
    var i, tabUp, btnS;
    tabUp = document.getElementsByClassName("tabUpdate");
    for (i = 0; i < tabUp.length; i++) {
        tabUp[i].style.display = "none";
    }
    document.getElementById(tabname).style.display = "block";
}

function openSlider() {
    var selectBox = document.getElementById("nutritional");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var i, tabslider;
    tabslider = document.getElementsByClassName("tabslider");
    for (i = 0; i < tabslider.length; i++) {
        tabslider[i].style.display = "none";
    }
    document.getElementById(selectedValue).style.display = "block";
}
document.getElementById("User").addEventListener("load", showUser(user.name));

function showUser(name){
alert("hiiiii");
    if(name.equal("underfind")){
        document.getElementsByClassName("true").style.display="none";
        document.getElementsByClassName("false").style.display="block";
    }
    else{
        document.getElementsByClassName("false").style.display="none";
        document.getElementsByClassName("true").style.display="block";
    }
}

function showTable(){
    let list = document.getElementById('result').contentDocument.firstChild.textContent;
    if(list) {
        let json = JSON.parse(list)

        let container = document.getElementById('container')
        container.innerHTML = ""

        let table = document.createElement('table')
        let tbody = document.createElement('tbody')
        if(json[0].time == "Invalid file, please input csv files!"){
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.textContent = json[0].time
            tr.appendChild(td);
            tbody.appendChild(tr)
        }
        else {
            let tr = document.createElement('tr')
            let td1 = document.createElement('td')
            td1.textContent = "Id"
            let td2 = document.createElement('td')
            td2.textContent = "Name"
            let td3 = document.createElement('td')
            tr.appendChild(td1)
            tr.appendChild(td2)

            tbody.appendChild(tr)
            if(json[0].id != ""){
                for (let i = 0; i < json.length; i++) {
                    let arr = [json[i].id, json[i].name]
                    let tr = document.createElement('tr')
                    for (let j = 0; j < arr.length; j++) {
                        let td = document.createElement('td')
                        td.textContent = arr[j]
                        tr.appendChild(td)
                    }
                    tbody.appendChild(tr)
                }
            }
        }
        table.appendChild(tbody)
        container.appendChild(table)
        table.setAttribute("border", "1")
        table.style.fontFamily = "Comic Sans MS"
        document.getElementById('result').style.visibility = 'hidden'

    }

}

let mountains = [
    { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
    { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
    { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Monte Amiata", height: 1738, place: "Siena" }
];

function generateTableHead(table, data) {
    console.log("in generate table head");
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

let table = document.querySelector("table");

let data = Object.keys(mountains[0]);
generateTable(table, mountains); // generate the table first
generateTableHead(table, data); // then the head