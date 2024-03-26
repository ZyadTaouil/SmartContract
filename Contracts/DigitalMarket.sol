pragma solidity ^0.8.18;

contract MusicSale {
    enum Role { Seller, Buyer, User}
    enum State {OnSale, Sold, Cancelled}
    uint idCounter = 0;
    uint marketPlaceFee = 5;

    function incrementId() public returns (uint) {
        idCounter++;
        return idCounter;
    }
    
    struct Product {
        uint uid;
        string title;
        string compositor;
        string artist;
        string description;
        address owner;
        Role role;
        uint price;
    }

    mapping (address => Role) public roles;
    mapping (uint => Product) public products;
    mapping (uint => Sale) public sales;
    
    struct Sale {
        uint saleId;
        uint productId;
        uint price;
        State state;
        address sellerAddress;
        address buyerAddress;
    }

    function newProduct(string memory _title, string memory _compositor, string memory _artist, string memory _description) public onlyRole(Role.Seller) {
    Product memory newProduct = Product({
        uid: incrementId(),
        title: _title,
        compositor: _compositor,
        artist: _artist,
        description: _description,
        owner: msg.sender,
        role: Role.Seller,
        price: 0
    });

    products[newProduct.uid] = newProduct;
}

    modifier onlyRole(Role _role) {
        require(roles[msg.sender] == _role, "UNAUTHORIZED ROLE");
        _;
    }

    function newSale(uint _productId, uint _price) public onlyRole(Role.Seller) {
        Sale memory newSale = Sale({
            saleId: incrementId(),
            productId: _productId,
            price: _price,
            state: State.OnSale,
            sellerAddress: msg.sender,
            buyerAddress: address(0)
        });
        sales[newSale.saleId] = newSale;
    }

    function getProduct(uint _uid) public view returns (Product memory) {
        Product memory product = products[_uid];
        return product;
    }

    function getSale(uint _saleId) public view returns (Sale memory) {
        Sale memory sale = sales[_saleId];
        return sale;
    }

    function setMarketplaceFee(uint _fee, uint _commission) public onlyRole(Role.Seller) {
    require(_fee >= 0 && _fee <= 100, "Fee must be between 0 and 100");
    require(_commission >= 0 && _commission <= 100, "Commission must be between 0 and 100");
    uint totalFee = _fee + _commission;
    require(totalFee >= 0 && totalFee <= 100, "Total fee must be between 0 and 100");
    marketPlaceFee = totalFee;
    }

    modifier isOnSale(uint _saleId) {
        require(sales[_saleId].state == State.OnSale, "Not on sale !");
        _;
    }

    modifier isPriceEnough(uint _saleId, uint _price) {
        require(sales[_saleId].price <= _price, "The price proposed is not enough");
        _;
    }

    modifier buyerHasEnoughMoney(uint _price) {
        require(msg.sender.balance >= _price, "You do not have enough money you fucking tramp");
        _;
    }
    
    function buyProduct(uint _saleId, uint _price) public isOnSale(_saleId) isPriceEnough(_saleId, _price) buyerHasEnoughMoney(_price) {
        Sale memory sale = getSale(_saleId);
        sale.price = _price;
        sale.state = State.Sold;
        sale.buyerAddress = msg.sender;
        Product storage product = products[sale.productId];
        product.owner = msg.sender;
        uint totalPrice = (marketPlaceFee/100) * _price;
        payable(sale.sellerAddress).transfer(totalPrice);
    }

    function cancelSale(uint _saleId) public isOnSale(_saleId) {
        sales[_saleId].state = State.Cancelled;
    }
}