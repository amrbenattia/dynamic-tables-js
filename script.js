// fetch data from json
fetch('final.json')

  .then(response => response.json())
  .then(jsonResponse => getData(jsonResponse))


// getData in one case
function getData(data) {
  createMainTable(data)
}

// create main table
const method_map = {'LightGBM':'LightGBM', 'NN_unbalanced':'Neural Network (unbalanced)', 'NN_balanced':'Neural Network (balanced)', 'SVM_lin':'Linear SVM', 'SVM_nl':'Non-linear SVM'}
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
        td.appendChild(document.createTextNode(method_map[methods[i]]));
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
subj_map = {"123_0":'2', "023_1":'3', "013_2":'4', "012_3":'4F'};
subj_map2 = {"123_0":'subject 2', "023_1":'subject 3', "013_2":'subject 4', "012_3":'subject 4 front'};
categ_map = {'JT_L':'JT_L', 'JT_R':'JT_R', 'SJT':'SJT', 'SLE': 'SENIOR_L_E', 'SRE':'SENIOR_R_E', 'SF':'SENIOR_FLEX', 'SLKn': 'SENIOR_L_Kn', 'SRKn': 'SENIOR_R_Kn', 'SLC':'SENIOR_L_Crouch', 'SRC':'SENIOR_R_Crouch'}

function createAccuracyTable(parent, rows, method, filling) {
  const info = document.getElementById('info');
  const docBody = document.body;
  var tbl  = document.createElement('table');
  tbl.style.borderCollapse = "collapse";
  const subjs = Object.keys(rows);
  var tr0 = tbl.insertRow();
  var tr1 = tbl.insertRow();
  for (let i=0; i < subjs.length; i++){
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
        var rotdiv = document.createElement('div');
        rotdiv.appendChild(document.createTextNode("Subject"));
        td.appendChild(rotdiv);
        td.style.border = '1px solid red';
        rotdiv.style.fontWeight= 'bold'
        rotdiv.style.transform= 'rotate(-90deg)'
        td.setAttribute('rowSpan', '4');
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
          Test subject: <span style="font-style: italic; font-weight: bold">${subj_map2[subjs[i]]}</span><br/>
          Category: <span style="font-style: italic; font-weight: bold">${categ_map[categ[j]]}</span> <br/>
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
