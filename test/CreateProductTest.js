const { expect } = require("chai");

describe("MusicSale contract", function () {
  it("Should allow seller to add a music item on the blockchain", async function () {
    const [owner, seller] = await ethers.getSigners();

    const MusicSale = await ethers.getContractFactory("MusicSale");
    const musicSale = await MusicSale.deploy();
    await musicSale.deployed();

    await musicSale.grantRole(1, seller.address); 

    const newItemTitle = "New Music";
    const newItemCompositor = "Compositor";
    const newItemArtist = "Artist";
    const newItemDescription = "Description";

    await musicSale.connect(seller).newProduct(newItemTitle, newItemCompositor, newItemArtist, newItemDescription);

    const product = await musicSale.getProduct(1); 
    expect(product.title).to.equal(newItemTitle);
    expect(product.compositor).to.equal(newItemCompositor);
    expect(product.artist).to.equal(newItemArtist);
    expect(product.description).to.equal(newItemDescription);
    expect(product.owner).to.equal(seller.address); 
  });
});
