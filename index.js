const ethers = require('ethers');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const server = express();
let provider = ethers.getDefaultProvider('kovan');
let wallet = new ethers.Wallet(process.env.pk, provider);

let contractaddress = "0xfe5de33567718f92e57ddf3941a0a8a973a3c4f0"
let ABI = [
    {
        "constant": false,
        "inputs": [],
        "name": "addcounter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "subcounter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "countervalue",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "counter",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "counter1",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]


readonlycontract = new ethers.Contract(contractaddress, ABI, provider);
contractwithSigner = readonlycontract.connect(wallet);
//console.log(readonlycontract);
async function counter1() {
    let state = await readonlycontract.counter1();
    return state;
}

async function addcounter() {
    await contractwithSigner.addcounter();
}
//addcounter();
async function subcounter() {
    await contractwithSigner.subcounter();
}
//subcounter();

//Set Server
server.set('port', process.env.PORT);
server.use(bodyParser.json());

//Get Value
server.get('/getCounter', async (request, response) => {
    let value = await counter1();
    response.send(value.toNumber().toString());
});

//Post Req:
server.post('/addCounter', async (request, response) => {
    await addcounter();
    response.send("Successed")
})
server.post('/subCounter', async (request, response) => {
    await subcounter();
    response.send("Successed")
})

//Event Listener:
contractwithSigner.on("countervalue", (address1, value1) => {
    console.log("Address:", address1)
    console.log("Value:", value1.toNumber());
})
server.listen(process.env.PORT);