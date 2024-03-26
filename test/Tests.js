const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NewProduct Test", function(){

    it("Test for saving product", async function(){
        const[owner] = await ethers.getSigners();
        const musicSale = await ethers.deployContract("MusicSale");
        await musicSale.connect(owner).newProduct("Nike", "Tech", "Adrien", "Description");
        const product = await musicSale.getProduct(1);
        console.log("Name:", product.title);
        expect(product.compositor).to.equal("Tech");
        expect(product.title).to.equal("Nike");
    })
    
    it("Test for saving sale", async function(){
        const[owner] = await ethers.getSigners();
        const musicSale = await ethers.deployContract("MusicSale");
        await musicSale.connect(owner).newSale(1, 15);
        const product = await musicSale.getSale(1);
        expect(product.price).to.equal(15);
    })

    it("Should allow buyer to buy product and get the new ownership of the product", async function() {
        const [owner, seller, buyer] = await ethers.getSigners();

        const musicSale = await ethers.getContractFactory("MusicSale");
        const musicSaleContract = await musicSale.deploy();

        await musicSaleContract.connect(seller).newProduct("Nike", "Tech", "Adrien", "Description");

        await musicSaleContract.connect(seller).newSale(1, 8); 
        await musicSaleContract.connect(buyer).buyProduct(1,9); 

        const productDetails = await musicSaleContract.getProduct(1);
        expect(productDetails.owner).to.equal(buyer.address);
    });


    it("Should allow user to retrieve the music or sale saved on the blockchain", async function() {
        const [owner, seller, user] = await ethers.getSigners();
        
        const musicSale = await ethers.deployContract("MusicSale");
        await musicSale.connect(seller).newProduct("Nike", "Tech", "Adrien", "Description");

        // Créer une nouvelle vente pour le produit
        await musicSale.connect(seller).newSale(1, 10);

        // Récupérer les détails du produit
        const productDetails = await musicSale.getProduct(1);
        console.log("Product Details:");
        console.log("Title:", productDetails.title);
        console.log("Compositor:", productDetails.compositor);
        console.log("Artist:", productDetails.artist);
        console.log("Description:", productDetails.description);

        // Récupérer les détails de la vente
        const saleDetails = await musicSale.getSale(1); // Supposant que la première vente créée a l'ID 1
        console.log("Sale Details:");
        console.log("Sale ID:", saleDetails.saleId);
        console.log("Product ID:", saleDetails.productId);
        console.log("Price:", saleDetails.price);
        console.log("State:", saleDetails.state);
        console.log("Seller Address:", saleDetails.sellerAddress);
        console.log("Buyer Address:", saleDetails.buyerAddress);

        // Vous pouvez effectuer des assertions ici si nécessaire
    });

})