const express =  require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const gen = require('word-concat-js')

app.use(express.static(__dirname+"/html"))

app.use(bodyParser.urlencoded({extended:false}))



async function keygen(){
    var string = gen(3, 4, 10, "_")
    console.log(string)
    const getString = `SELECT * FROM active`
    /*
    fix this BRUH
    await getConnection().query(getString, async (err, rows, fields)=>{
        if(rows!=undefined){
            return await keygen()
        }else{
            console.log("uh")
            console.log(string, "uh")
            return await string

        }
    })
    */
   
  
    return string;
}

function getConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'radardomcgee135',
        database: 'requests',
        insecureAuth: true,
    })
}

app.get("/home",(req,res)=>{
    console.log("started")
    res.sendFile(__dirname+"/html/index.html")
})
app.get("/request",(req,res)=>{
    console.log("started")
    res.sendFile(__dirname+"/html/request.html")
})
app.get("/costcalculator",(req,res)=>{
    console.log("started")
    res.sendFile(__dirname+"/html/costcalculator.html")
})
app.post("/ok",(req,res)=>{
    console.log("test passed :)")
    res.sendFile(__dirname+"/html/request.html")
})
app.post('/requestsent',async (req, res)=>{
    console.log('creating request...')
    const requesta = req.body.request
    var keyd = await keygen()
    console.log(keyd, "key")
    const queryString = "INSERT INTO active (char, reqtext) SET (?,?)"
    getConnection().query(queryString, [keyd, requesta],(err, results, fields)=>{
        if(err){
            console.log(err.message)
        }
        console.log("Inserted request with", requesta, keyd)
        console.log(results)
        console.log(fields)
        res.end()
    })
    const getString = `SELECT * FROM active`
    getConnection().query(getString, async (err, rows, fields)=>{
        await console.log(rows)   
   })
    //res.end()
})

app.listen(3003, ()=>{
    console.log("server is up and listening on 3003...")
})