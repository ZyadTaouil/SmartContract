/*const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Supplychain Test", function(){
    it("Test for saving Product", async function(){
        const [owner] = await ethers.getSigners();
        const tracking = await ethers.deployContract("Tracking");

        await tracking.connect(owner).addProduct("Nike", "Tech");

        //transfer ownership
        await tracking.connect(owner).transferProduct(1, newOwner.address, "transfer to distributor");

        
        code to test if the product that I had is the one I have now
        // Vérifier que la propriété a été transférée
        const produit = await tracking.products(1);
        expect(produit.currentOwner).to.equal(newOwner.address);
        
        console.log("Current Owner:", product.currentOwner);
        expect(product.currentOwner).to.equal(newOwner.address);

    })

})*/