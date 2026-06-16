/**
 * File: script_jquery.css
 * GUI Assignment: HW4 - Using the jQuery Plugin/UI with Your Dynamic Table
 * Description: JavaScript file with jQuery for Assignment 4 Part 1
 * Joe Plummer, UMass Lowell Computer Science, joseph_plummer@student.uml.edu
 * Copyright (c) 2026 by Joe Plummer. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
 */

// start of JQuery 
$(document).ready(function() {
    
    // validate #formID of index.html
    $("#formID").validate({
        rules: {
            mincolval: {
                required: true,
                integer: true,
                range: [-50,50]
            },
            maxcolval: {
                required: true,
                integer: true,
                range: [-50,50],
                isMinLEMax: "#mincolval"
            },
            minrowval: {
                required: true,
                integer: true,
                range: [-50,50]
            },
            maxrowval: {
                required: true,
                integer: true,
                range: [-50,50],
                isMinLEMax: "#minrowval"
            },
        },
        messages: {
            mincolval: {
                required: "This field is required.",
                integer: "Please enter an integer between -50 and 50 (no decimals).", 
                range: "Please enter an integer number between -50 and 50."
            },
            maxcolval: {
                required: "This field is required.",
                integer: "Please enter an integer between -50 and 50 (no decimals).", 
                range: "Please enter an integer number between -50 and 50.",
                isMinLEMax: "Minimum value must be less than or equal to maximum value."
            },
            minrowval: {
                required: "This field is required.",
                integer: "Please enter an integer between -50 and 50 (no decimals).",
                range: "Please enter an integer number between -50 and 50."
            },
            maxrowval: {
                required: "This field is required.",
                integer: "Please enter an integer between -50 and 50 (no decimals).", 
                range: "Please enter an integer number between -50 and 50.",
                isMinLEMax: "Minimum value must be less than or equal to maximum value."
            }
        },
        submitHandler: function(form) {
            buildTable();
        }

    });

    // adding method "isMinLEMax" to compare the min value with the max value
    jQuery.validator.addMethod("isMinLEMax", function(value, element, param) {
        const max = Number(value);
        const min = Number($(param).val());
        return (min <= max);
    });

    // variables for user input
    let minColNum, maxColNum, minRowNum, maxRowNum;

    /**
     * Function getInputs gets the inputs from the user
     * @param   N/A
     * @return  N/A
     * @throws  N/A
     */
    function getInputs() {
        minColNum = Number(document.getElementById("mincolval").value);
        maxColNum = Number(document.getElementById("maxcolval").value);
        minRowNum = Number(document.getElementById("minrowval").value);
        maxRowNum = Number(document.getElementById("maxrowval").value);
    } 

    /**
     * Function buildTable() builds the dynamic table given user inputs
     * @param   N/A
     * @return  N/A
     * @throws  N/A
     */
    function buildTable() {
        // building the table

        // variables
        getInputs();

        let table_container = document.getElementById("Table-container"); // container of the table element
        table_container.innerHTML = ""
        const dTable = document.createElement("table");

        // first row:
        const headerRow = document.createElement("tr");
        const hiddenCell = document.createElement("th");
        hiddenCell.className = "hide-cell";
        headerRow.appendChild(hiddenCell);

        let i = minColNum;
        let j = minRowNum;
        for (i; i <= maxColNum; i++) {
            const headerCell = document.createElement("th");
            headerCell.textContent = i;
            headerCell.className = "header-row";
            headerRow.appendChild(headerCell);
        }
        dTable.appendChild(headerRow);

        // subsequent rows:
        for (j; j <= maxRowNum; j++) {
            const dRow = document.createElement("tr");
            const hCell = document.createElement("th");
            hCell.className = "header-column";
            hCell.textContent = j;
            dRow.appendChild(hCell);
            for (i = minColNum; i <= maxColNum; i++) {
                const dCell = document.createElement("td");
                dCell.textContent = j * i;
                dRow.appendChild(dCell);
            }
            dTable.appendChild(dRow);
        }
        table_container.appendChild(dTable);
    }
    
});