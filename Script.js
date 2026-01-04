let prompt = document.querySelector(".prompt");
let sendhBtn = document.querySelector(".btn");
let chatContainer = document.querySelector(".chat-container")
let container = document.querySelector(".container")
let userMassage = null;
// CHATBOX FUNCTION

let createChatBox = (html,className)=>{
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML=html;
    return div;
}

// show Loading function
let showLoading = ()=>{
    let html = `<img src="./ai-img.jfif" alt="" width="50px">
             <p></p>
                  `
                  let aiChatBox = createChatBox(html,"ai-chat")
                    chatContainer.appendChild(aiChatBox);
                    getApiResponce(aiChatBox)
}


// ADD EVENT ON SENT BUTTON 
sendhBtn.addEventListener("click",()=>{
    userMassage = prompt.value;
    prompt.value='';
    if(!userMassage) return;

    let html = ` <img src="./user-img.jfif" alt="" width="50px">
                 <p>${userMassage}</p>`;

    let userChatBox = createChatBox(html,"user-chat");
    chatContainer.appendChild(userChatBox);
    container.style.display="none";

    setTimeout(showLoading,1000);
});


async function getApiResponce(aiChatBox){
    let p = aiChatBox.querySelector("p");


    try{
        let res = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                prompt: userMassage
            })
        });

        let data = await res.json();
        p.innerText = data.reply;
        
         

    }catch(error){
        p.innerText = "⚠️ Error getting AI response";
        console.error(error);
    }
}
