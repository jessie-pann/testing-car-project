const express = require('express');
const fs = require('fs');
const app = express(); 
const port = 3001; 
const cors = require("cors");
app.use(cors());

app.get('/api/makes', (req, res) => {
    
    fs.readFile('../data/data.json', (err, data) => {
        if(err) {
            console.log('error')
        }
        const vehicles = JSON.parse(data); 
        const makes = vehicles.map(each => each.make).reduce((acc, cur) => {
            const existingMake = acc.find(item => item.make === cur);
            
            if (existingMake) {
                existingMake.count++;
            } else {
                acc.push({make: cur, count:1})
            }
            return acc;
        }, [])
        res.json(makes); 
    })
})

app.get('/api/models/:make', (req, res) => {
    
    const makeSelected = req.params.make;
    fs.readFile('../data/data.json', (err, data) => {
        if(err) {
            res.send({status:500, message: err});
        }
        const vehicles = JSON.parse(data);
        const models = vehicles.reduce((acc, cur) => {   
            if(cur.make === makeSelected) {
                acc.push(cur);
            }
            return acc;
        }, []).map(each => each.model).reduce((acc, cur) => {
            const existingModel = acc.find(item => item.model === cur);
            
            if (existingModel) {
                existingModel.count++;
            } else {
                acc.push({model: cur, count:1})
            }
            return acc;
        }, [])
        res.json(models); 

        });
        
    }); 

    app.get('/api/vehicles/:make/:model', (req, res) => {
        const makeSelected = req.params.make;
        const modelSelected = req.params.model;
        fs.readFile('../data/data.json', (err, data) => {
            if(err) {
                console.log('error')
            }
            const vehicles = JSON.parse(data); 
            const vehiclesSelected = vehicles.filter(each => each.make === makeSelected && each.model === modelSelected)
            res.json(vehiclesSelected); 
        })
    })


app.listen(port, () => {
    console.log(`listening on port: ${port}`);
  });


