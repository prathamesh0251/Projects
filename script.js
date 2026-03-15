const taskList=[]
const listElement=document.getElementById("taskList");
const statusText=document.getElementById("status");

// speech recogination
const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition=new SpeechRecognition();
recognition.continuous=false;
recognition.lang='en-US';


recognition.onresult=(event)=>{
    const transcript=event.results[0][0].transcript.toLowerCase();
    statusText.innerText= `Heard: "${transcript}"`;
    if(transcript.startsWith("new task"))
    {
        const taskText=transcript.replace("new task","").trim();
        if(taskText)
            addTask(taskText);

    }
    else if(transcript.startsWith("delete task")){
        const num = parseInt(transcript.split(" ")[2]) - 1;
        if(!isNaN(num))
            deleteTask(num);
    }
    else if(transcript.startsWith("mark task"))
    {
        const num=parseInt(transcript.split("")[2])-1;
        if(!isNaN(num))
            markTaskDone(num);
    }
}
    function addTask(task){
        taskList.push({text:task,done:false});
        renderTasks();
}
function deleteTask(num)
{
    if(taskList[num]){
        taskList.splice(num,1);
        renderTasks();

    }

}
function markTaskDone(num){

    if(taskList[num]){
        taskList[num].done=true;
        renderTasks();
    }
}
function renderTasks()
{
    listElement.innerHTML = "";
    taskList.forEach((task,idx)=>{
        const li=document.createElement("li");
        li.innerText= `${idx+1}. ${task.text} ${task.done?"✅" : ""}`;
        listElement.appendChild(li);

    });
    
}

function startVoice(){
    statusText.innerText="Listening...";
    recognition.start();

}

document.getElementById("startBtn").addEventListener("click",startVoice);

