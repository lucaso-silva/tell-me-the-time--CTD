
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const place = document.querySelector(".place");

search.addEventListener("click", (e)=>{
    e.preventDefault();
    const inputValue = input.value;

    if(inputValue == "") {
        console.log("mensagem erro!")
    } else {
        place.innerHTML = inputValue;
        input.value = "";
    }
    
    
})