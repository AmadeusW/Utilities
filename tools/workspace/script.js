var state = {};

$( function() {

    $("#add").click(function(event) {
        var newItem = {
            title: "New window",
            comment: "",
            code: "",
            state: 0,
        }
        var section = $("#template").clone().attr("id", "newid").appendTo("#main");
        section.draggable({ 
            cursor: "move", 
            handle: ".handle", 
            snap: "true", 
            scroll: true, 
            scrollSensitivity: 100 }
        );
        state.push(newItem);
    });

});