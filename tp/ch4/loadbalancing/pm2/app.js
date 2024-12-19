const express = require('express');

const app = express();
const { pid } = process
app.get('/heavy',(req,res)=>{
    let total = 0;
    for(i=0;i<50000000;i++){
        total++
        console.log(total);
        console.log(`Handling request from ${pid}`)
    }
    res.send("Total :"+total);
})
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});