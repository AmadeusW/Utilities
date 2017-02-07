var state = {};

$( function() {

    $("#add").click(function(event) {
        var newItem = {
            title: "New window",
            comment: "",
            code: "",
            state: 0,
            editing: 0,
        }
        var section = $("#template").clone().attr("id", "newId").appendTo("#main");
        section.draggable({ 
            cursor: "move", 
            handle: ".handle", 
            snap: "true", 
            scroll: true, 
            scrollSensitivity: 100 }
        );
        $("#newId > .header > .buttons > .edit").click(function(event) {
            $("#newId > .header > .handle > .name").replaceWith("<input type='text'>Title</input>");
            $("#newId > .comment").replaceWith("<textarea>comment</textarea>");
            $("#newId > .code").replaceWith("<textarea>code</textarea>");
        });
        state.push(newItem);
    });

});