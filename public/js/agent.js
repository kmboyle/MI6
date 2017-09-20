$(document).ready(function() {
    // Getting references to the name inout and agent container, as well as the table body
    var nameInput = $("#agent-name");
    var pic = $("#agent-pic");
    console.log(pic);
    var agentList = $("tbody");
    var agentContainer = $(".agent-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an agent
    $(document).on("submit", "#agent-form", handleAgentFormSubmit);
    $(document).on("click", ".delete-agent", handleDeleteButtonPress);

    // Getting the intiial list of agents
    getAgent();

    // A function to handle what happens when the form is submitted to create a new agent
    function handleAgentFormSubmit(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return;
        }
        // Calling the upsertagent function and passing in the value of the name input
        upsertAgent({
            agentname: nameInput
                .val()
                .trim()
        }, { agentPic: pic });
    }

    // A function for creating an agent. Calls getAgents upon completion
    function upsertAgent(agentData) {
        $.post("/api/agent", agentData)
            .then(getAgent);
    }

    // Function for creating a new list row for agents
    function createAgentRow(agentData) {
        var newTr = $("<tr>");
        newTr.data("agent", agentData);
        newTr.append("<td>" + agentData.username + "</td>");
        newTr.append("<td> " + agentData.createdAt + "</td>");
        newTr.append("<td><a href='/mission?agent_id=" + agentData.id + "'>Go to Mission</a></td>");
        newTr.append("<td><a href='/cms?agent_id=" + agentData.id + "'>Create a Mission</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-agent'>Delete Agent</a></td>");
        return newTr;
    }

    // Function for retrieving agents and getting them ready to be rendered to the page
    function getAgent() {
        $.get("/api/agent", function(data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createAgentRow(data[i]));
            }
            renderAgentList(rowsToAdd);
            nameInput.val("");
        });
    }

    // A function for rendering the list of agents to the page
    function renderAgentList(rows) {
        agentList.children().not(":last").remove();
        agentContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            agentList.prepend(rows);
        } else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no agents
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.html("You must create an Agent before you can create a Post.");
        agentContainer.append(alertDiv);
    }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("agent");
        var id = listItemData.id;
        $.ajax({
                method: "DELETE",
                url: "/api/agent/" + id
            })
            .done(getAgent);
    }
});