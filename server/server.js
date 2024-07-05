const express = require('express');
const fs = require('fs');
const vehicleData = express(); 
const port = 3001; 


vehicleData.get('/makes', (req, res) => {
    
    fs.readFile('../data/data.json', (err, data) => {
        if(err) {
            console.log('error')
        }

        const vehicles = JSON.parse(data); 
        const makes = vehicles.map(each => each.make).reduce((acc, cur) => {
            const existingMake = acc.find(item => item.make === cur);
            
            // if (existingMake) {
            //     existingMake.count++;
            // } else {
            //     acc.push({make: cur, count:1})
            // }

            acc.push({make: cur, count:existingMake ? existingMake.count++ : 1})
            return acc;
        }, [])
        res.json(makes); 
    })
})

vehicleData.get('/models/:make', 'utf8', (req, res) => {
    
    const makeSelected = req.params.make;
    fs.readFile('../data/data.json', (err, data) => {
        if(err) {
            console.log(err);
        }
        const vehicles = JSON.parse(data);
        const models = vehicles.reduce((acc, cur) => {   
            if(cur.make === makeSelected) {
                acc.push(cur);
            }
            return acc;
        }, []);
        res.json(models); 
    })
})

vehicleData.listen(port); 



