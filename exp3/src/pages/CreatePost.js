import { useState } from "react";

function CreatePost(){

const[title,setTitle]=useState("");

const[content,setContent]=useState("");

const[platform,setPlatform]=useState("Instagram");

const[status,setStatus]=useState("");

const publish=()=>{

setStatus("✅ Post Published Successfully!");

};

const draft=()=>{

setStatus("📝 Draft Saved Successfully!");

};

return(

<div className="create-page">

<h1>Create Social Media Post</h1>

<input

placeholder="Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>

<textarea

rows="6"

placeholder="Write your content..."

value={content}

onChange={(e)=>setContent(e.target.value)}

/>

<select

value={platform}

onChange={(e)=>setPlatform(e.target.value)}

>

<option>Instagram</option>

<option>Facebook</option>

<option>LinkedIn</option>

<option>Twitter</option>

</select>

<div>

<button onClick={draft}>

Save Draft

</button>

<button onClick={publish}>

Publish

</button>

</div>

<h3>

{status}

</h3>

</div>

);

}

export default CreatePost;