// fetch data from dummy json
fetch('final.json')

  .then(response => response.json())
  .then(jsonResponse => getData(jsonResponse))

// investigate in one case
function investigate(data) {
    var rows = data['LightGBM']['amin']
    // fillBaseTable(rows)
    console.log(rows)
    // createAccurayTable(rows)
    var mat = rows['012_3']['SENIOR_L_E']['confusion_matrix']
    createConfusionTable(mat)
}

// fill main table with all possible casses(method, filling)
const method_mapping = {1:'LightGBM', 2:'NN_unbalanced', 3:'NN_balanced', 4:'SVM_lin', 5:'SVM_nl'}
const filling_mapping = {1: 'gain', 2:'fmin', 3:'amin', 4:'zero'}

function getData(json_data) {
    // call the main table
    var mainTable = document.querySelector('#main-table');
    // iterate for every row
    for (var i = 1; i < mainTable.rows.length; i ++){ //9
        // iterate in every row cell
        for (var j = 1; j < mainTable.rows[i].cells.length; j++){
            console.log(mainTable.rows[i].cells[j])

            // get base table data from json data
            var rows = json_data[method_mapping[i]][filling_mapping[j]]
            // fill base table
            
            console.log(rows)
            createAccurayTable(mainTable.rows[i].cells[j],rows)   
        };
    };

};


function createConfusionTable(parent, mat){
    var tbl  = document.createElement('table');
    tbl.style.width  = '300px';
    tbl.style.border = '1px solid none';
    var tr1 = tbl.insertRow(0);
    console.log(mat)
    mat_keys = Object.keys(mat)
    for (let i=0; i < mat_keys.length; i++){
        console.log(mat_keys[i])
        // head row
        if (i==0){
            var th = tr1.insertCell();
            th.appendChild(document.createTextNode(''))
        }
        var th = tr1.insertCell();
        th.appendChild(document.createTextNode(mat_keys[i]))
        th.style.border = '1px solid blue';
        th.style.fontWeight= 'bold'

        // main body 
        var tr = tbl.insertRow();
        var val_keys = Object.keys(mat[mat_keys[i]])
        for (let j=0; j < val_keys.length; j++){
            if (j==0){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(val_keys[j]));
                td.style.border = '1px solid red';
                td.style.fontWeight= 'bold'
            }
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(mat[mat_keys[i]][val_keys[j]]));
            td.style.border = '1px solid black';

        };   
    };
    parent.appendChild(tbl);
};


function createAccurayTable(parent, rows) {
    var tbl  = document.createElement('table');
    const subjs = Object.keys(rows);
    sub_mapping = {"123_0":'2', "023_1":'3', "013_2":'4', "012_3":'4 Front'};

    var tr0 = tbl.insertRow();
    var tr1 = tbl.insertRow();
    for (let i=0; i < subjs.length; i++){
        console.log(subjs[i]);
        if (i==0 ){
            var th = tr0.insertCell();
            th.appendChild(document.createTextNode(''))
            var th = tr0.insertCell();
            th.appendChild(document.createTextNode(''))
            var td0 = tr0.insertCell();
            td0.appendChild(document.createTextNode('category'));
            td0.style.border = '1px solid red';
            td0.style.fontWeight= 'bold';
            td0.setAttribute('colSpan', '10');
            var th = tr1.insertCell();
            th.appendChild(document.createTextNode(''));
            var th = tr1.insertCell();
            th.appendChild(document.createTextNode(''));
        };
        
        var tr = tbl.insertRow();
        var categ = Object.keys(rows[subjs[i]])

        // main body 
        for (let j=0; j < categ.length; j++){
            if (i==0){
            var th = tr1.insertCell();
            th.appendChild(document.createTextNode(categ[j]))
            th.style.border = '1px solid blue';
            th.style.fontWeight= 'bold'
            };
            if (i==0 && j==0){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode('subject'));
                td.style.border = '1px solid red';
                td.style.fontWeight= 'bold'
                td.setAttribute('rowSpan', '4');
            };
            if (j==0){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(sub_mapping[subjs[i]]));
                td.style.border = '1px solid blue';
                td.style.fontWeight= 'bold'
            };
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(parseFloat(rows[subjs[i]][categ[j]]['accuracy']).toFixed(2)));
            createConfusionTable(td, rows[subjs[i]][categ[j]]['confusion_matrix']);
            td.style.border = '1px solid black';
        };
    };
    parent.appendChild(tbl);  
};
