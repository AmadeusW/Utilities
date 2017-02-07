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
            Window.localStorage.setItem('count', id);
            var id = "section"+elementId;
            console.log("Creating " + id);
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
            state[id] = Window.localStorage.getItem(id);
        }
        render(id);

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
                state[id].comment = $("#"+id+" > .header > .comment > textarea").val();
                state[id].code = $("#"+id+" > .header > .code > textarea").val();
                console.log(state[id]);
                Window.localStorage.setItem(id, state[id]);
            }
            render(id);
        });
    };

    // Load stuff when page loads
    if (Window.localStorage.length > 0) {
        var storedItems = Window.localStorage.getItem('count');
        for (var i = 0; i < storedItems; i++) {
            createElement(i);
        }
    }
});

function render(id) {
     console.log("Rendering " + id);
     console.log(state[id]);
     if (state[id].editing == 1) {
        $("#"+id+" > .header > .handle").html("<input type='text' value='" + state[id].title + "' />");
        $("#"+id+" > .comment").html("<textarea>" + state[id].comment + "</textarea>");
        $("#"+id+" > .code").html("<textarea>"+ state[id].code + "</textarea>");
    } else {
        $("#"+id+" > .header > .handle").html(state[id].title);
        $("#"+id+" > .comment").html(state[id].comment);
        $("#"+id+" > .code").html(state[id].code);
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