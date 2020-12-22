// // fill base table
// function fillTable(accuracy){
    
//     var k = '<tbody>'
//     for (let i=0; i < accuracy.length; i++){
//         var acc = accuracy[i]
//         if (i==0){
//             k += '<tr>';
//             k += '<th scope="row" rowspan="7" class="rotated">Subject</th>'
//             k += '<th scope="row">2</th>'
//             k += '<td>' + acc[0].toFixed(2)+ '</td>';
//             k += '<td>' + acc[1].toFixed(2) + '</td>';
//             k += '<td>' + acc[2].toFixed(2) + '</td>';
//             k += '<td>' + acc[3].toFixed(2) + '</td>';
//             k += '<td>' + acc[4].toFixed(2) + '</td>';
//             k += '<td>' + acc[5].toFixed(2) + '</td>';
//             k += '<td>' + acc[6].toFixed(2) + '</td>';
//             k += '<td>' + acc[7].toFixed(2) + '</td>';
//             k += '<td>' + acc[8].toFixed(2) + '</td>';
//             k += '<td>' + acc[9].toFixed(2) + '</td>';
//             k += '<tr>';
//         } else if (i==1) {
//             k += '<tr>';
//             k += '<th scope="row">3</th>'
//             k += '<td>' + acc[0].toFixed(2) + '</td>';
//             k += '<td>' + acc[1].toFixed(2) + '</td>';
//             k += '<td>' + acc[2].toFixed(2) + '</td>';
//             k += '<td>' + acc[3].toFixed(2) + '</td>';
//             k += '<td>' + acc[4].toFixed(2) + '</td>';
//             k += '<td>' + acc[5].toFixed(2) + '</td>';
//             k += '<td>' + acc[6].toFixed(2) + '</td>';
//             k += '<td>' + acc[7].toFixed(2) + '</td>';
//             k += '<td>' + acc[8].toFixed(2) + '</td>';
//             k += '<td>' + acc[9].toFixed(2) + '</td>';
//             k += '<tr>';
//         } else if (i==2) {
//             k += '<tr>';
//             k += '<th scope="row">4</th>'
//             k += '<td>' + acc[0].toFixed(2) + '</td>';
//             k += '<td>' + acc[1].toFixed(2) + '</td>';
//             k += '<td>' + acc[2].toFixed(2) + '</td>';
//             k += '<td>' + acc[3].toFixed(2) + '</td>';
//             k += '<td>' + acc[4].toFixed(2) + '</td>';
//             k += '<td>' + acc[5].toFixed(2) + '</td>';
//             k += '<td>' + acc[6].toFixed(2) + '</td>';
//             k += '<td>' + acc[7].toFixed(2) + '</td>';
//             k += '<td>' + acc[8].toFixed(2) + '</td>';
//             k += '<td>' + acc[9].toFixed(2) + '</td>';
//             k += '<tr>';
//         } else if (i==3) {
//             k += '<tr>';
//             k += '<th scope="row">4 Front</th>'
//             k += '<td>' + acc[0].toFixed(2) + '</td>';
//             k += '<td>' + acc[1].toFixed(2) + '</td>';
//             k += '<td>' + acc[2].toFixed(2) + '</td>';
//             k += '<td>' + acc[3].toFixed(2) + '</td>';
//             k += '<td>' + acc[4].toFixed(2) + '</td>';
//             k += '<td>' + acc[5].toFixed(2) + '</td>';
//             k += '<td>' + acc[6].toFixed(2) + '</td>';
//             k += '<td>' + acc[7].toFixed(2) + '</td>';
//             k += '<td>' + acc[8].toFixed(2) + '</td>';
//             k += '<td>' + acc[9].toFixed(2) + '</td>';
//             k += '<tr>';
//         }
//     }
//     k += '</tbody>';
//     document.getElementById('tableData').innerHTML = k;

// };

// // fill main table
// function getData(object) {
//     // call the main table
//     var mainTable = document.querySelector('#main-table');
//     var tableRows = mainTable.rows
//     // iterate for every row
//     for (var i = 1; i <= tableRows.length -1; i ++){ //9
//         // iterate in row cells
//         for (var j = 3; j <= 9; j += 2){
//             console.log(i, j)
//             tableRows[i].childNodes[j].innerHTML = '' // remove current cell value
//             fillTable(object[`${i}_${j}`])
//             console.log(object[`${i}_${j}`])

//             // call the base table.
//             baseTable = document.querySelector('#base-table')
            
//             // clone the basic table
//             clonedTable = baseTable.cloneNode(true)
//             // redisplay the cloned talbe
//             clonedTable.style.display = 'table'
//             tableRows[i].childNodes[j].appendChild(clonedTable)
    
//         }
//     }

//     };
    
// // fetch data from dummy json
// fetch('dummy.json')

//   .then(response => response.json())
//   .then(jsonResponse => getData(jsonResponse))

// console.log(document.body);


// fetch data from dummy json
fetch('test.json')

  .then(response => response.json())
  .then(jsonResponse => getData(jsonResponse))

//   function deepInvestigate(data) {
//     var method =Object.keys(data)
//     for (var i = 1; i < method.length ; i ++){ 
//         console.log(method)
//         var filling = Object.keys(data[method[i]])
//         for (var j = 1; j < filling.length ; j ++){ 
//             console.log(filling)
//             subjects = Object.keys(data[method[i]][filling[j]])
//             for (var k = 1; k < subjects.length ; k ++){ 
//                 var category = Object.keys(data[method[i]][filling[j]][subjects[k]])
//                 for (var l = 1; l < subjects.length ; l ++){
//                     var measures = data[method[i]][filling[j]][subjects[k]][category[l]]
//                     console.log(measures)
//                  }
                
//                 }

//             }
//         }
//     }

// investigate in one case
function investigate(data) {
    var rows = data['lightGBM']['GAIN']
    fillTable_from_json(rows)
    console.log(rows)
    }


function fillTable_from_json(rows){
    subjects = Object.keys(rows)
    var k = '<tbody>'
    for (let i=0; i < subjects.length; i++){
        var subj = subjects[i]

        if (subj=='123_0'){
            console.log(subj)
            k += '<tr>';
            k += '<th scope="row" rowspan="7" class="rotated">Subject</th>'
            k += '<th scope="row">2</th>'
            k += '<td>' + parseFloat(rows[subj]['JT_L']['accuracy']).toFixed(2)+ '</td>';
            k += '<td>' + parseFloat(rows[subj]['JT_R']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SJT']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_E']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_E']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_FLEX']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_Kn']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_Kn']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_Crouch']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_Crouch']['accuracy']).toFixed(2) + '</td>';
            k += '<tr>';
        } else if (subj=='023_1') {
            console.log(subj)
            k += '<tr>';
            k += '<th scope="row">3</th>'
            k += '<td>' + parseFloat(rows[subj]['JT_L']['accuracy']).toFixed(2)+ '</td>';
            k += '<td>' + parseFloat(rows[subj]['JT_R']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SJT']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_E']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_E']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_FLEX']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_Kn']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_Kn']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_Crouch']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_Crouch']['accuracy']).toFixed(2) + '</td>';
            k += '<tr>';
        } else if (subj=='013_2') {
            console.log(subj)
            k += '<tr>';
            k += '<th scope="row">4</th>'
            k += '<td>' + parseFloat(rows[subj]['JT_L']['accuracy']).toFixed(2)+ '</td>';
            k += '<td>' + parseFloat(rows[subj]['JT_R']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SJT']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_E']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_E']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_FLEX']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_Kn']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_Kn']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_Crouch']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_Crouch']['accuracy']).toFixed(2) + '</td>';
            k += '<tr>';
        } else if (subj=='012_3') {
            console.log(subj)
            k += '<tr>';
            k += '<th scope="row">4 Front</th>'
            k += '<td>' + parseFloat(rows[subj]['JT_L']['accuracy']).toFixed(2)+ '</td>';
            k += '<td>' + parseFloat(rows[subj]['JT_R']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SJT']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_E']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_E']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_FLEX']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_Kn']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_Kn']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_L_Crouch']['accuracy']).toFixed(2) + '</td>';
            k += '<td>' + parseFloat(rows[subj]['SENIOR_R_Crouch']['accuracy']).toFixed(2) + '</td>';
            k += '<tr>';
        }
    }
    k += '</tbody>';
    document.getElementById('tableData').innerHTML = k;

};


// fill main table with all possible casses(method, filling)
const method_mapping = {1:'lightGBM', 2:'NN_unbalanced', 3:'NN_balanced', 4:'SVM_lin', 5:'SVM_nl'}
const filling_mapping = {3: 'GAIN', 5:'fmin', 7:'amin', 9:'zero'}

function getData(json_data) {
    // call the main table
    var mainTable = document.querySelector('#main-table');
    var tableRows = mainTable.rows
    // iterate for every row
    for (var i = 1; i <= tableRows.length -1; i ++){ //9
        // iterate in row cells(3, 5, 7, 9)
        for (var j = 3; j <= 9; j += 2){
            console.log(i, j)
            tableRows[i].childNodes[j].innerHTML = '' // remove current cell value
            var rows = json_data[method_mapping[i]][filling_mapping[j]]
            fillTable_from_json(rows)
            console.log(rows)

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