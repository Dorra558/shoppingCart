//Get the button
var mybutton = document.getElementById("myBtn");
var mynav = document.getElementById("mainnav")
    // When the user scrolls down 350px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        mybutton.style.display = "block";
        mynav.classList.add("bg-light");
    } else {
        mybutton.style.display = "none";
        mynav.classList.remove("bg-light");
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}