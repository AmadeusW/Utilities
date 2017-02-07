var state = {};
var elementId = 0;

$( function() {

    $("#add").click(function(event) {
        elementId++;
        var id = "section"+elementId;
        console.log("Creating " + id);
        var newItem = {
            title: "New window",
            comment: "",
            code: "",
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
            console.log("Editing " + id);
            $("#newId > .header > .handle > .name").replaceWith("<input type='text'>Title</input>");
            $("#newId > .comment").replaceWith("<textarea>comment</textarea>");
            $("#newId > .code").replaceWith("<textarea>code</textarea>");
            console.log(state);
            state[id].editing = 1;
        });
        state[id] = newItem;
    });

});