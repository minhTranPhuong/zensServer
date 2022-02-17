// require('dotenv').config();
// const app = require('express');
// const sql = require('mssql');
// const express = new app();

// const sqlConfig = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PWD,
//   server:'localhost',
//   database: process.env.DB_NAME,
//   options: {
//     enableArithAbort: false,
//     encrypt: false,
//   },
// }

// express.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next()
// });


// express.get('/' , (req , res)=>{
//   sql.connect(sqlConfig).then(pool => {
//     // Query
//     return pool.request()
//         .input('input_parameter' , sql.Int , 1)
//         .query('select * from [info]')
//     }).then(result => {
//       const {recordsets, recordset , ...rest} = result;
//       res.send(recordset);
//     }).catch(err => {
//       console.log(err);
//     });
// })

// express.get('/like/:IDContent', (req , res)=>{
//   sql.connect(sqlConfig).then(pool=>{
//     return pool.request()
//       .query(`UPDATE [info] SET [like]=[like]+1 WHERE [id] = ${req.params.IDContent}`)
//   }).then(result=>{
//     res.send(result);
//   }).catch(err=>{
//     res.send('{value:0}');
//   })
// })

// express.get('/dislike/:IDContent', (req , res)=>{
//   sql.connect(sqlConfig).then(pool=>{
//     return pool.request()
//       .query(`UPDATE [info] SET [dislike]=[dislike]+1 WHERE [id] = ${req.params.IDContent}`)
//   }).then(result=>{
//     res.send(result);
//   }).catch(err=>{
//     res.send('{value:0}');
//   })
// })

// express.listen(5000 , ()=>{
//   console.log(`Example app listenning on port ${3000}`);
// })
////////////////////////////////////////////////////////////////////////
const postgres = require('postgres');
const app = require('express');
const express = new app();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//setup database
const sql = postgres('postgres://toabmhblcdrcsq:40b9af9732a38cd57e63faa250648450e7206355710fcfae872ea8e40df439ef@ec2-35-153-91-18.compute-1.amazonaws.com:5432/dpt2gqknhufdo',{
  host        : 'ec2-35-153-91-18.compute-1.amazonaws.com',        
  port        : 5432,       
  path        : '',         
  database    : 'dpt2gqknhufdo',      
  username    : 'toabmhblcdrcsq',       
  password    : '40b9af9732a38cd57e63faa250648450e7206355710fcfae872ea8e40df439ef',         
  ssl         : true,      
  max         : 10,        
  timeout     : 0,          
  types       : [],         
})

express.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

express.get('/' , async(req , res)=>{
      const value =  await sql`select * from "info"`
      res.send(value);
  })
  
  express.get('/like/:IDContent', async(req , res)=>{
    const value =  await sql`update "info" set "like"="like"+1 where "id" = ${req.params.IDContent}`
    res.send(value);
  })
  
  express.get('/dislike/:IDContent', async(req , res)=>{
    const value =  await sql`update "info" set "dislike"="dislike"+1 where "id" = ${req.params.IDContent}`
    res.send(value);
  })

  express.listen(5000 , ()=>{
    console.log(`Example app listenning on port ${3000}`);
  })
 