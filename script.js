// fetch data from json
fetch('final.json')

  .then(response => response.json())
  .then(jsonResponse => getData(jsonResponse))
 
function getData(data) {
  createMainTable(data)
}

// create main table
//const method_map = {'LightGBM':'LightGBM', 'NN_unbalanced':'Neural Network (unbalanced)', 'NN_balanced':'Neural Network (balanced)', 'SVM_lin':'Linear SVM', 'SVM_nl':'Non-linear SVM'}
function createMainTable(data){
  documentBody = document.body;
  var tbl  = document.createElement('table');
  tbl.classList.add("table");
  tbl.classList.add("table-striped");
  var thead = tbl.createTHead();
  var tbody = tbl.createTBody();
  const methods = Object.keys(data);
  console.log(methods)
  var tr0 = tbl.insertRow();
  thead.appendChild(tr0)
  for (let i=0; i < methods.length; i++){
    if (i==0 ){
            var th = tr0.insertCell();
            th.appendChild(document.createTextNode(''))
    }
    var tr = tbl.insertRow();
    tbody.appendChild(tr)
    var filling = Object.keys(data[methods[i]])
    for (let j=0; j < filling.length; j++){
      if (i==0){
        var th = tr0.insertCell();
        th.appendChild(document.createTextNode(filling[j]))
        th.style.fontWeight = 'bold'
        
      };
      if (j==0){
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(methods[i]));
        td.style.fontWeight = 'bold'
      }
      var rows = data[methods[i]][filling[j]]
      var td = tr.insertCell();
      createAccuracyTable(td, rows, methods[i], filling[j])      
    }
  }
  documentBody.appendChild(tbl)
}


// accuracy table
subj_map = {"123_0":'1', "023_1":'2', "013_2":'3', "012_3":'4'};
subj_map2 = {"123_0":'1', "023_1":'2', "013_2":'3', "012_3":'4'};
categ_map = {'JT_L':'1', 'JT_R':'2', 'SJT':'3', 'SLE': '4', 'SRE':'5', 'SF':'6', 'SLKn': '7', 'SRKn': '8', 'SLC':'9', 'SRC':'10'}

function createAccuracyTable(parent, rows, method, filling) {
  const info = document.getElementById('info');
  const docBody = document.body;
  var tbl  = document.createElement('table');
  tbl.style.borderCollapse = "collapse";
  const subjs = Object.keys(rows);
  var tr0 = tbl.insertRow();
  var tr1 = tbl.insertRow();

  for (let i=0; i < subjs.length; i++){
  var tr = tbl.insertRow();
  var categ = Object.keys(rows[subjs[i]])
    if (i==0 ){
      var th = tr0.insertCell();
      th.appendChild(document.createTextNode(''))
      var th = tr0.insertCell();
      th.appendChild(document.createTextNode(''))
      var td0 = tr0.insertCell();
      td0.appendChild(document.createTextNode('Column'));
      td0.style.border = '1px solid red';
      td0.style.fontWeight= 'bold';
      td0.setAttribute('colSpan', `${categ.length}`);
      var th = tr1.insertCell();
      th.appendChild(document.createTextNode(''));
      var th = tr1.insertCell();
      th.appendChild(document.createTextNode(''));
    };
    
    // main body 
       for (let j=0; j < categ.length; j++){
      if (i==0){
        var th = tr1.insertCell();
        th.appendChild(document.createTextNode(categ_map[categ[j]]))
        th.style.border = '1px solid blue';
        th.style.fontWeight= 'bold'
        th.title = `${categ_map[categ[j]]}`;
      };
      if (i==0 && j==0){
        var td = tr.insertCell();
        var rotdiv = document.createElement('div');
        rotdiv.appendChild(document.createTextNode("Index"));
        td.appendChild(rotdiv);
        td.style.border = '1px solid red';
        rotdiv.style.fontWeight= 'bold'
        rotdiv.style.transform= 'rotate(-90deg)'
        td.setAttribute('rowSpan', `${subjs.length}`);
      };
      if (j==0){
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(subj_map[subjs[i]]));
        td.style.border = '1px solid blue';
        td.style.fontWeight= 'bold'
        td.title = `${subj_map2[subjs[i]]}`;
      };
      // filling cells 
      var td = tr.insertCell();
      td.onmouseup = function(){showConf(this)};
      function showConf(td) {
        info.style.position = "absolute";
        
        cellTop = td.getBoundingClientRect().top ;
        info.style.top = cellTop + "px"
        cellLeft = td.getBoundingClientRect().left ;
        info.style.left = cellLeft + "px"
        
        // add more info.
        let accuracy = parseFloat(rows[subjs[i]][categ[j]]['accuracy']).toFixed(2);
        console.log(method);
        console.log(filling);
        info.innerHTML = `<div style="font-size:14px;"> 
          Method: <span style="font-style: italic; font-weight: bold">${method}</span><br/>
          Filling: <span style="font-style: italic; font-weight: bold">${filling}</span><br/>
          Test Index: <span style="font-style: italic; font-weight: bold">${subj_map2[subjs[i]]}</span><br/>
          Column: <span style="font-style: italic; font-weight: bold">${categ_map[categ[j]]}</span> <br/>
          Accuracy: <span style="font-style: italic; font-weight: bold; color: hsl(${accuracy* 100}, 100%, 25%)">${parseFloat(accuracy).toFixed(2)}</span><br/>
          <span style="font-weight: bold; color: red; font-size:16px">Confusion Matrix</span></div>`
        // append confusion matrix to info.
        createConfusionTable(info, rows[subjs[i]][categ[j]]['confusion_matrix']); 
        info.style.display = "inline-block";
        
        // get info size
        info_width = info.getBoundingClientRect().width ; info_height = info.getBoundingClientRect().height

        if ((cellLeft + info_width) > 0.9 * screen.width) {
          cellLeft = screen.width - 1.5 * info_width
          info.style.left = cellLeft + "px"
        }
        if ((cellTop + info_height) > 0.8 * screen.height) {
          cellTop = 0.9 *screen.height - 1.10 *info_height
          info.style.top = cellTop + "px"
        }
      }
      docBody.onmousemove = function () {
        hideconf(this)
      }
      function hideconf() {
        info.innerHTML = ''
        info.style.display = 'none'
      }
      var accuracy = parseFloat(rows[subjs[i]][categ[j]]['accuracy']).toFixed(2)
      td.appendChild(document.createTextNode(accuracy));
      td.style.border = '1px solid black';
      td.style.cursor = 'pointer'
      td.style.backgroundColor =  `hsl(${accuracy* 100}, 100%, 75%)`;
    };
  };
  parent.appendChild(tbl);  
};
// confusion table
function createConfusionTable(parent, mat){
  var tbl  = document.createElement('table');
  tbl.style.width  = '120px';
  tbl.style.border = '1px solid none';
  tbl.style.margin = 'auto';

  var tr0 = tbl.insertRow();
  var tr1 = tbl.insertRow();
  mat_keys = Object.keys(mat)
  for (let i=0; i < mat_keys.length; i++){
    // head row
    if (i==0){
      var th = tr0.insertCell();
      th.appendChild(document.createTextNode(''))
      var th = tr0.insertCell();
      th.appendChild(document.createTextNode(''))
      var td0 = tr0.insertCell();
      td0.appendChild(document.createTextNode('Prediction'));
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
    for (let j=0; j < val_keys.length; j++){
      if (i==0){
        var th = tr1.insertCell();
        th.appendChild(document.createTextNode(mat_keys[j]))
        th.style.border = '1px solid blue';
        th.style.fontWeight= 'bold'
      };
      if (i==0 && j==0){
        var td = tr.insertCell();
        td.appendChild(document.createTextNode('Target'));
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
      if (i === j) {
        td.style.backgroundColor = "rgb(200, 255, 200)";
      }
    };   
  };
  parent.appendChild(tbl);
};
