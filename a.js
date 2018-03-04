var d = document,
    myform,
    output;

function addEvent(elem, type, handler){
    if(elem.addEventListener){
        elem.addEventListener(type, handler, false);
    } else {
        elem.attachEvent('on'+type, handler);
    }
    return false;
}

function getXhrObject(){
    if(typeof XMLHttpRequest === 'undefined'){
        XMLHttpRequest = function() {
            try {
                return new window.ActiveXObject( "Microsoft.XMLHTTP" );
            } catch(e) {}
        };
    }
    return new XMLHttpRequest();
}

function sendAjaxRequest(e){
    var evt = e || window.event;

    if(evt.preventDefault){
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }

    var xhr = getXhrObject();
    if(xhr){

        var elems = myform.elements,
            url = myform.action,
            params = [],
            elName,
            elType;

        for(var i = 0; i < elems.length; i++){
            elType = elems[i].type;
            elName = elems[i].name;
            if(elName){

                if((elType == 'checkbox' || elType == 'radio') && !elems[i].checked) continue;

                params.push(elems[i].name + '=' + elems[i].value);
            }
        }

        url += '?' + params.join('&');

        xhr.open('GET', url, true);


        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                output.innerHTML = JSON.parse(xhr.responseText);
            }
        }

        xhr.send(null);
    }
    return false;
}


function init(){
    output = d.getElementById('shortLink');
    myform = d.getElementById('form');
    addEvent(myform, 'submit', sendAjaxRequest);
    return false;

}

addEvent(window, 'load', init);