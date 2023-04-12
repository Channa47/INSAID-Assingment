let SideBar = document.getElementById("Sidebar")


function ScreeChnage(){
    console.log("Channa")
    if( window.screen.width > 767){
    SideBar.style.display = "none" 
    }
}

function CloneSidebar(){
    SideBar.style.display = "none"
}
let SideBarTrigger = document.getElementById("Side-bar-Trigger");
SideBarTrigger.addEventListener("click",()=>{
    SideBar.style.display = "block"
})
