let dragindex = 0;
let dropindex = 0;
let clone = "";

function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
  console.log(e.target)
  console.log(e.target.id + ' picked up')
}

function drop(e) {
  e.preventDefault();
  clone = e.target.cloneNode(true);
  console.log(e.target)
  console.log(e.target.id + ' replaced')
  let data = e.dataTransfer.getData("text");
  
  if (clone.id !== data) {
    let nodelist = document.getElementById("grid").childNodes;
    for (let i = 0; i < nodelist.length; i++) {
      if (nodelist[i].id == data) dragindex = i;
    }

    document.getElementById("grid").replaceChild(document.getElementById(data), e.target);

    document.getElementById("grid").insertBefore(clone,document.getElementById("grid").childNodes[dragindex]);
  }
}

function allowDrop(e) {
  e.preventDefault();
}
