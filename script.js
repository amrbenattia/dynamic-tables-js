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
    tbl.style.width  = '120px';
    tbl.style.border = '1px solid none';

    var tr0 = tbl.insertRow();
    var tr1 = tbl.insertRow();
    console.log(mat)
    mat_keys = Object.keys(mat)
    for (let i=0; i < mat_keys.length; i++){
        console.log(mat_keys[i])
        // head row
        if (i==0){
            var th = tr0.insertCell();
            th.appendChild(document.createTextNode(''))
            var th = tr0.insertCell();
            th.appendChild(document.createTextNode(''))
            var td0 = tr0.insertCell();
            td0.appendChild(document.createTextNode('Target'));
            td0.style.border = '1px solid red';
            td0.style.fontWeight= 'bold';
            td0.setAttribute('colSpan', `${mat_keys.length}`);
            var th = tr1.insertCell();
            th.appendChild(document.createTextNode(''));
            var th = tr1.insertCell();
            th.appendChild(document.createTextNode(''));
        }

        // main body 
        var tr = tbl.insertRow();
        var val_keys = Object.keys(mat[mat_keys[i]])
        console.log(val_keys)
        for (let j=0; j < val_keys.length; j++){
            if (i==0){
                var th = tr1.insertCell();
                th.appendChild(document.createTextNode(mat_keys[j]))
                th.style.border = '1px solid blue';
                th.style.fontWeight= 'bold'
                };
            if (i==0 && j==0){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode('Predict'));
                td.style.border = '1px solid red';
                td.style.fontWeight= 'bold'
                td.style.transform= 'rotate(-90deg)'
                td.style.height = 'max-content'
                td.setAttribute('rowSpan', `${val_keys.length}`);
            };
            if (j==0){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(val_keys[i]));
                td.style.border = '1px solid blue';
                td.style.fontWeight= 'bold'
            }
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(mat[mat_keys[i]][val_keys[j]]));
            td.style.border = '1px solid black';

        };   
    };
    parent.appendChild(tbl);
};

subj_map = {"123_0":'2', "023_1":'3', "013_2":'4', "012_3":'4F'};
subj_map2 = {"123_0":'subject 2', "023_1":'subject 3', "013_2":'subject 4', "012_3":'subject 4 Front'};
categ_map = {'JT_L':'JT_L', 'JT_R':'JT_R', 'SJT':'SJT', 'SLE': 'SENIOR_L_E', 'SRE':'SENIOR_R_E', 'SF':'SENIOR_FLEX', 'SLKn': 'SENIOR_L_Kn', 'SRKn': 'SENIOR_R_Kn', 'SLC':'SENIOR_L_Crouch', 'SRC':'SENIOR_R_Crouch'}

function createAccurayTable(parent, rows) {
    const info = document.getElementById('info');
    const docBody = document.body;
    var tbl  = document.createElement('table');
    const subjs = Object.keys(rows);
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
            td0.appendChild(document.createTextNode('Category'));
            td0.style.border = '1px solid red';
            td0.style.fontWeight= 'bold';
            td0.setAttribute('colSpan', '10');
            var th = tr1.insertCell();
            th.appendChild(document.createTextNode(''));
            var th = tr1.insertCell();
            th.appendChild(document.createTextNode(''));
        };
        
        
        // main body 
        var tr = tbl.insertRow();
        var categ = Object.keys(rows[subjs[i]])

        for (let j=0; j < categ.length; j++){
            if (i==0){
            var th = tr1.insertCell();
            th.appendChild(document.createTextNode(categ[j]))
            th.style.border = '1px solid blue';
            th.style.fontWeight= 'bold'
            th.title = `${categ_map[categ[j]]}`;
            };
            if (i==0 && j==0){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode('Subject'));
                td.style.border = '1px solid red';
                td.style.fontWeight= 'bold'
                td.style.transform= 'rotate(-90deg)'
                // td.style.display= 'block'
                // td.style.transformOrigin = 'top left'
                // td.style.marginTop = '-50%'
                // td.style.whiteSpace = 'nowrap';

                td.setAttribute('rowSpan', '4');
            };
            if (j==0){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(subj_map[subjs[i]]));
                td.style.border = '1px solid blue';
                td.style.fontWeight= 'bold'
                td.title = `${subj_map2[subjs[i]]}`;
            };
            var td = tr.insertCell();
            td.onmouseup = function(){showConf(this)};
            function showConf(td) {
                info.style.position = "absolute";
                info.style.top = td.getBoundingClientRect().top + "px";
                info.style.left = td.getBoundingClientRect().left + "px";
                // add more info.
                info.innerHTML = `Subject: ${subj_map[subjs[i]]} , 
                Category: ${categ[j]} <br>
                Accuracy: ${parseFloat(rows[subjs[i]][categ[j]]['accuracy']).toFixed(2)}<br>
                Confusion matrix:`
                // append confusion matrix to info.
                createConfusionTable(info, rows[subjs[i]][categ[j]]['confusion_matrix']); 
                info.style.display = "inline-block";
            }
            docBody.onmousemove = function () {
                hideconf(this)
            }
            function hideconf() {
                info.innerHTML = ''
                info.style.display = 'none'
            }
            td.appendChild(document.createTextNode(parseFloat(rows[subjs[i]][categ[j]]['accuracy']).toFixed(2)));
            td.style.border = '1px solid black';
            td.style.cursor = 'pointer'
        };
    };
    parent.appendChild(tbl);  
};
