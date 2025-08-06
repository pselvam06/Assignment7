function changeTitle(){
    //    DOM - getElementById
    const heading = document.getElementById("title");
    heading.innerText = "Hello admin";
    heading.style.color = "red";
    heading.style.fontSize = "3rem";
    heading.style.backgroundColor = "yellow";
    }
    
    function changeText(){
        // DOM - getElementByClassName
        const paragraphs = document.getElementsByClassName("text");
        // console.log(paragraphs.length);
        for(let i = 0; i < paragraphs.length; i++){
            paragraphs[i].style.color = "green";
            paragraphs[i].style.fontWeight = "bold";
        }
    }
    
    function highlightBox(){
        // DOM - querySelector
        const box = document.querySelector(".box");
        box.style.backgroundColor = "grey";
        box.style.border = "2px solid yellow";
    }