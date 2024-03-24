// Кода на сървъра
const express = require('express');
const fs = require('fs')
const PORT = 3456;
 
const app = express();
let grid = [];

function onServerStart() {
    console.log(`Слушам на порт ${PORT}`);
    if(fs.existsSync('./test.txt')){
        fs.readFile('./test.txt', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            grid = JSON.parse(data)
          });
    }else{
        for (let x = 0; x < 10; x++) {
            grid[x] = [];
            for (let y = 0; y < 10; y++) {
                grid[x][y] = 'white';
            }
        }
        
    }
    setInterval(updateGrid,10000)

}
function updateGrid(){
    fs.writeFile('./test.txt', JSON.stringify(grid), err => {
        if (err) {
        console.error(err);
        } else {
        // file written successfully
        }
    });
}

app.use(express.static('game'));
 
 
// При GET request към /zelka
app.get("/zelka", function(req, res) {
    // Върни JSON теста ZELE
    res.json("ZELE");
});
 
// При GET request към /grid
app.get("/grid", function (req, res) {
    // Отговора е grid
    res.json(grid);
});
 
// При POST request към /namacai
app.post("/namacai", function (req, res) {
    console.log(req.query);
    // Ако req.query.X или req.query.Y не са числа
    if(isNaN(req.query.X) || isNaN(req.query.Y)) {
        res.json("GRESHNI X ILI Y");
    }
 
    grid[req.query.X][req.query.Y] = req.query.Col;
    res.json("CVETA BESHE SMENEN");
});
app.listen(PORT, onServerStart);