var state = {};
var elementId = 0;

$( function() {

    $("#add").click(function(event) {
        createElement();
    });
    function createElement(setId = 0) {
        var id = "";
        if (setId == 0) {
            elementId++;
            window.localStorage.setItem('count', elementId);
            var id = "section"+elementId;
            console.log("Creating new " + id);
            var newItem = {
                title: "New window",
                comment: "sample text",
                code: "sample textt",
                showing: 2,
                editing: 1,
            }
            state[id] = newItem;
        } else
        {
            var id = "section"+setId;
            console.log("Loading " + id);
            state[id] = JSON.parse(window.localStorage.getItem(id));
            console.log(JSON.stringify(state[id]));
        }

        var section = $("#template").clone().attr("id", id).appendTo("#main");
        section.draggable({ 
            cursor: "move", 
            handle: ".handle", 
            snap: "true", 
            scroll: true, 
            scrollSensitivity: 100 }
        );
        $("#"+id+" > .header > .buttons > .size").click(function(event) {
            switch (state[id].showing) {
                case 0:
                    state[id].showing = 1;
                    break;
                case 1:
                    state[id].showing = 2;
                    break;
                case 2:
                default:
                    state[id].showing = 0;
                    break;
            }
            render(id);
        });
        $("#"+id+" > .header > .buttons > .edit").click(function(event) {
            if (state[id].editing == 0) {
                state[id].editing = 1;
            } else {
                state[id].editing = 0;
                state[id].title = $("#"+id+" > .header > .handle > input").val();
                state[id].comment = $("#"+id+" > .comment > textarea").val();
                state[id].code = $("#"+id+" > .code > textarea").val();
                console.log("Saving " + id);
                window.localStorage.setItem(id, JSON.stringify(state[id]));
            }
            render(id);
        });
        render(id);
    };

    // Load stuff when page loads
    console.log("See if we can load data");
    if (window.localStorage.length > 0) {
        console.log("okay...");
        var storedItems = window.localStorage.getItem('count');
        console.log(storedItems + " items");
        for (var i = 1; i <= storedItems; i++) {
            createElement(i);
        }
    }
});

function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
        console.log(e);
		return false;
	}
}

if (storageAvailable('localStorage')) {
	console.log('localStorage ok');
}
else {
	console.log("no localstorage");
}
if (storageAvailable('sessionStorage')) {
	console.log('sessionStorage ok');
}
else {
	console.log("no sessionStorage");
}

function render(id) {
    console.log("Rendering " + id);
    if (state[id].editing == 1) {
        $("#"+id+" > .header > .handle").html("<input type='text' value='" + state[id].title + "' />");
        $("#"+id+" > .comment").html("<textarea>" + state[id].comment + "</textarea>");
        $("#"+id+" > .code").html("<textarea>"+ state[id].code + "</textarea>");
    } else {
        $("#"+id+" > .header > .handle").html(state[id].title);
        $("#"+id+" > .comment").html(state[id].comment);
        $("#"+id+" > .code").html("<pre><code class='csharp'>" + state[id].code + "</code></pre>");
        $("#"+id+" > .code > pre > code").each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
    if (state[id].showing == 0) {
        $("#"+id+" > .comment").addClass("hidden");
        $("#"+id+" > .code").addClass("hidden");
    } else if (state[id].showing == 1) {
        $("#"+id+" > .comment").removeClass("hidden");
        $("#"+id+" > .code").addClass("hidden");
    } else if (state[id].showing == 2) {
        $("#"+id+" > .comment").removeClass("hidden");
        $("#"+id+" > .code").removeClass("hidden");
    }
}