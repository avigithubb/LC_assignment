const express = require('express');
const path = require('path');
const cors = require('cors');
const { message, header } = require('hawk/lib/client');
const connectDB = require("./config/db.js");
const axios = require("axios");
const URLs = require("./models/URLs.js");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const now = new Date();

connectDB();

app.get("/api/message", (req, res)=>{
    res.json("Hello from backend!");
});

app.post("/shorten", async(req, res)=>{
  var link = req.query.li_nk;
  console.log(link);
  try{
    const fetchResponse = await fetch("https://spoo.me", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        url: link,
      }),
    });

    const data = await fetchResponse.json();

    // console.log(data);

    const url = new URLs({
      original_url: link,
      shorten_url: data.short_url,
      created_at: now.toLocaleDateString,
      user_id: 1,
    });

    await url.save();

    res.json({ message: "Done!", short_url: data.short_url });
  }
  catch(e) {
    res.json("Inconsistency in the url detected please enter valid URL!");
    console.log(e);
  }

});

app.get("/show", async(req, res)=>{
  const link = req.query.url;
  // console.log(link);

  URLs.find({shorten_url: link})
  .then(data=> {
    console.log(data)
    res.json({url: data[0].original_url});
  })
  .catch(e=> 
    res.json({message: "Bad request"})
  )
  
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

app.listen(port, ()=>{
    console.log(`The server is listening at port ${port}`);
});