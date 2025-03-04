"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line)
}

function createBlock(data) {
	let block = {
		index: Blockchain.blocks.length,
		prevHash: blockHash(Blockchain.blocks[Blockchain.blocks.length - 1]),
		data: data,
		timestamp: Date.now() 
	}

	block.hash = blockHash(block) //Because we need to hash the data for the block, we do it separately from the bit above
	Blockchain.blocks.push(block)
	
	console.log(block)
	return block
}

// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		JSON.stringify(bl)
	).digest("hex");
}

//Test

function verifyChain(chain) {
	for (var i = 0; i < chain.blocks.length; i++)
	{
		if (!verifyBlock(chain.blocks[i]))
		{
			console.log("Chain invalid!")
			return false;
		}
	}

	console.log("Chain valid!");
	return true;
}

function verifyBlock(bl) {
	//Check if Genesis Block
	if (isEmpty(bl.data) &&
		bl.index === 0 &&
		bl.hash === "000000")
	{
		//If these conditions meet, it's a valid genesis block
		return true;
	}

	let blockInfo = {
		index: bl.index,
		prevHash: bl.prevHash,
		data: bl.data,
		timestamp: bl.timestamp
	};

	//For the rest of the blocks
	if (!isEmpty(bl.data) &&
		!isNaN(parseInt(bl.index)) &&
		!(parseInt(bl.index) < 0) &&
		!isEmpty(bl.prevHash) &&
		bl.hash === blockHash(blockInfo))
	{
		//If all of the above conditions meet, the block is valid
		return true;
	}
	
	//Default is an invalid block because the conditions above would not have been met, so we return false
	console.log(`Invalid Block:\r\n${JSON.stringify(bl)}`)
	return false;
}

function isEmpty(val) {
	if (!val || val === null || val === undefined || val.length === 0) {
		return true;
	}

	return false;
}


//Uncomment below to simulate invalid block
//Blockchain.blocks[3].data = ""
//Blockchain.blocks[0].data = "awef"

console.log(verifyChain(Blockchain));