// fill base table
function fillTable(accuracy){
    
    var k = '<tbody>'
    for (let i=0; i < accuracy.length; i++){
        var acc = accuracy[i]
        if (i==0){
            k += '<tr>';
            k += '<th scope="row" rowspan="7" class="rotated">Subject</th>'
            k += '<th scope="row">2</th>'
            k += '<td>' + acc[0].toFixed(2)+ '</td>';
            k += '<td>' + acc[1].toFixed(2) + '</td>';
            k += '<td>' + acc[2].toFixed(2) + '</td>';
            k += '<td>' + acc[3].toFixed(2) + '</td>';
            k += '<td>' + acc[4].toFixed(2) + '</td>';
            k += '<td>' + acc[5].toFixed(2) + '</td>';
            k += '<td>' + acc[6].toFixed(2) + '</td>';
            k += '<td>' + acc[7].toFixed(2) + '</td>';
            k += '<td>' + acc[8].toFixed(2) + '</td>';
            k += '<td>' + acc[9].toFixed(2) + '</td>';
            k += '<tr>';
        } else if (i==1) {
            k += '<tr>';
            k += '<th scope="row">3</th>'
            k += '<td>' + acc[0].toFixed(2) + '</td>';
            k += '<td>' + acc[1].toFixed(2) + '</td>';
            k += '<td>' + acc[2].toFixed(2) + '</td>';
            k += '<td>' + acc[3].toFixed(2) + '</td>';
            k += '<td>' + acc[4].toFixed(2) + '</td>';
            k += '<td>' + acc[5].toFixed(2) + '</td>';
            k += '<td>' + acc[6].toFixed(2) + '</td>';
            k += '<td>' + acc[7].toFixed(2) + '</td>';
            k += '<td>' + acc[8].toFixed(2) + '</td>';
            k += '<td>' + acc[9].toFixed(2) + '</td>';
            k += '<tr>';
        } else if (i==2) {
            k += '<tr>';
            k += '<th scope="row">4</th>'
            k += '<td>' + acc[0].toFixed(2) + '</td>';
            k += '<td>' + acc[1].toFixed(2) + '</td>';
            k += '<td>' + acc[2].toFixed(2) + '</td>';
            k += '<td>' + acc[3].toFixed(2) + '</td>';
            k += '<td>' + acc[4].toFixed(2) + '</td>';
            k += '<td>' + acc[5].toFixed(2) + '</td>';
            k += '<td>' + acc[6].toFixed(2) + '</td>';
            k += '<td>' + acc[7].toFixed(2) + '</td>';
            k += '<td>' + acc[8].toFixed(2) + '</td>';
            k += '<td>' + acc[9].toFixed(2) + '</td>';
            k += '<tr>';
        } else if (i==3) {
            k += '<tr>';
            k += '<th scope="row">4 Front</th>'
            k += '<td>' + acc[0].toFixed(2) + '</td>';
            k += '<td>' + acc[1].toFixed(2) + '</td>';
            k += '<td>' + acc[2].toFixed(2) + '</td>';
            k += '<td>' + acc[3].toFixed(2) + '</td>';
            k += '<td>' + acc[4].toFixed(2) + '</td>';
            k += '<td>' + acc[5].toFixed(2) + '</td>';
            k += '<td>' + acc[6].toFixed(2) + '</td>';
            k += '<td>' + acc[7].toFixed(2) + '</td>';
            k += '<td>' + acc[8].toFixed(2) + '</td>';
            k += '<td>' + acc[9].toFixed(2) + '</td>';
            k += '<tr>';
        }
    }
    k += '</tbody>';
    document.getElementById('tableData').innerHTML = k;

};

// fill main table
function getData(object) {
    // call the main table
    var mainTable = document.querySelector('#main-table');
    var tableRows = mainTable.rows
    // iterate for every row
    for (var i = 1; i <= tableRows.length -1; i ++){ //9
        // iterate in row cells
        for (var j = 3; j <= 9; j += 2){
            console.log(i, j)
            tableRows[i].childNodes[j].innerHTML = '' // remove current cell value
            fillTable(object[`${i}_${j}`])
            console.log(object[`${i}_${j}`])

            // call the base table.
            baseTable = document.querySelector('#base-table')
            
            // clone the basic table
            clonedTable = baseTable.cloneNode(true)
            // redisplay the cloned talbe
            clonedTable.style.display = 'table'
            tableRows[i].childNodes[j].appendChild(clonedTable)
    
        }
    }

    };
    
// fetch data from dummy json
fetch('dummy.json')

  .then(response => response.json())
  .then(jsonResponse => getData(jsonResponse))

console.log(document.body);
