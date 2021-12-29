///////////////////////////////////
//                               //
//   КОД СКРИПТА КОМБИНАТОРА!    //
//                               //
///////////////////////////////////

var allKeysArray =[];
var keysArrey;
var addsArrey;
var nn;
var n1;
var kombo;
var id_keys=document.getElementById("keys");
var id_adds=document.getElementById("adds");
var id_out=document.getElementById("out");

function testLast (arr) {
    if (arr[arr.length-1]==="" || arr[arr.length-1]=="\n"){
        arr.pop();
        testLast (arr);
    }
}

function get() {
    keysArrey=id_keys.value.split("\n");
    addsArrey=id_adds.value.split("\n");

    testLast(keysArrey);
    testLast(addsArrey);

    if (keysArrey.length>0){
        for (nn=0; nn<keysArrey.length; nn++) {
            allKeysArray.push(keysArrey[nn]);// добавляем в конец массива
        }
    }
    if (addsArrey.length>0){
        for (nn=0; nn<keysArrey.length; nn++) {
            for (n1=0; n1<addsArrey.length; n1++) {
                allKeysArray.push(keysArrey[nn]+" "+addsArrey[n1]);// добавляем в конец массива
            }
        }
        
    }
	kombo=allKeysArray.join("\n")
    id_out.value=kombo;
}

function repl(){   
    id_keys.value=id_out.value;
    id_adds.value="";
    id_out.value="";
}

function copy(){   
    id_out.select();
	document.execCommand("copy");
}

function rest() {
    id_keys.value ="";
    id_adds.value ="";
    id_out.value ="";
    allKeysArray =[];
    keysArrey =[];
    addsArrey =[];
}

function ctrlf5() {
    location.reload(true);
}