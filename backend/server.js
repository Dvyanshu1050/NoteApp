const express=require("express")
const fs=require("fs")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("allowed")
})

app.post("/add-notes",(req,res)=>{
const { title, desc } = req.body

 fs.readFile("notes.json","utf-8",(err,data)=>{
   if (err) {
    return res.send("file not understand")
   }else{
    const notes=JSON.parse(data)

    notes.push({
        id:Date.now(),
        title,
        desc
    })

     fs.writeFile(
            "notes.json",
            JSON.stringify(notes),
            (err) => {

                if (err) {
                    return res.send("write error")
                }

                res.send("note added")
            }
        )
   }
 })

})

app.get("/all-notes",(req,res)=>{

    fs.readFile("notes.json","utf-8",(err,data)=>{

        if(err){
            return res.send("read error")
        }

        const notes = JSON.parse(data)

        res.json(notes)

    })

})

app.delete("/delete-note/:id",(req,res)=>{

    const noteId = Number(req.params.id)

    fs.readFile("notes.json","utf-8",(err,data)=>{

        if(err){
            return res.send("read error")
        }

        const notes = JSON.parse(data)

        const newNotes = notes.filter((item)=> item.id !== noteId)

        fs.writeFile(
            "notes.json",
            JSON.stringify(newNotes),
            (err)=>{

                if(err){
                    return res.send("delete error")
                }

                res.send("note deleted")
            }
        )

    })

})

app.put("/edit-note/:id",(req,res)=>{

    const noteId = Number(req.params.id)

    const { title, desc } = req.body

    fs.readFile("notes.json","utf-8",(err,data)=>{

        if(err){
            return res.send("read error")
        }

        const notes = JSON.parse(data)

        const updatedNotes = notes.map((item)=>{

            if(item.id === noteId){

                return {
                    ...item,
                    title,
                    desc
                }

            }else{
                return item
            }

        })

        fs.writeFile(
            "notes.json",
            JSON.stringify(updatedNotes),
            (err)=>{

                if(err){
                    return res.send("update error")
                }

                res.send("note updated")

            }
        )

    })

})

















app.listen(3000,()=>{
    console.log("server running");
})