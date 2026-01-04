let prompt = document.querySelector(".prompt");
let sendhBtn = document.querySelector(".btn");
let chatContainer = document.querySelector(".chat-container")
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
                  <img src="./loading.gif" alt="" width="40" height="40">`
                  let aiChatBox = createChatBox(html,"ai-chat")
                    chatContainer.appendChild(aiChatBox);
                    getApiResponce(aiChatBox)
}


// ADD EVENT ON SENT BUTTON 

sendhBtn.addEventListener("click",()=>{
    userMassage = prompt.value;
    prompt.value='';
    if(!userMassage) return
    let html = ` <img src="./user-img.jfif" alt="" width="50px">
            <p>${userMassage}</p>`;
                let userChatBox = createChatBox(html,"user-chat");
                chatContainer.appendChild(userChatBox);
                setTimeout(showLoading,1000)


})