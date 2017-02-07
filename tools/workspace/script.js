var state = {};
var elementId = 0;

$( function() {

    $("#add").click(function(event) {
        elementId++;
        var id = "section"+elementId;
        console.log("Creating " + id);
        var newItem = {
            title: "New window",
            comment: "sample text",
            code: "sample textt",
            state: 0,
            editing: 0,
        }
        var section = $("#template").clone().attr("id", id).appendTo("#main");
        section.draggable({ 
            cursor: "move", 
            handle: ".handle", 
            snap: "true", 
            scroll: true, 
            scrollSensitivity: 100 }
        );
        $("#"+id+" > .header > .buttons > .edit").click(function(event) {
            state[id].editing = state[id].editing == 1 ? 0 : 1;
            render(id);
        });
        state[id] = newItem;
    });

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
}