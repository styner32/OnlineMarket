const OnlineMarket = artifacts.require('OnlineMarket')

contract('OnlineMarket', (accounts) => {
  const owner = accounts[0]
  const alice = accounts[1]
  const bob = accounts[2]

  let onlineMarket;

  beforeEach( async () => {
    onlineMarket = await OnlineMarket.new()
  })

  describe('addAdmin', () => {
    it("adds an admin", async () => {
      expect(await onlineMarket.isAdmin(alice)).to.equal(false)

      await onlineMarket.addAdmin(alice)

      expect(await onlineMarket.isAdmin(alice)).to.equal(true)
    })

    it('does not add when the sender is not the owner', async () => {
      expect(await onlineMarket.isAdmin(alice)).to.equal(false)

      try {
        await onlineMarket.addAdmin(alice, { from: bob });

        assert.equal(false, true, 'it was expected to be reverted')
      } catch (e) {
        expect(await onlineMarket.isAdmin(alice)).to.equal(false)
      }
    })
  })

  describe('isStoreOwner', () => {
    beforeEach( async () => {
      await onlineMarket.addAdmin(alice)
    })

    it("adds a store owner", async () => {
      expect(await onlineMarket.isStoreOwner(bob)).to.equal(false)

      await onlineMarket.addStoreOwner(bob, {from: alice})

      expect(await onlineMarket.isStoreOwner(bob)).to.equal(true)
    })

    it('does not add when the sender is not the owner', async () => {
      expect(await onlineMarket.isStoreOwner(bob)).to.equal(false)

      try {
        await onlineMarket.addStoreOwner(bob, { from: bob });

        assert.equal(false, true, 'it was expected to be reverted')
      } catch (e) {
        expect(await onlineMarket.isStoreOwner(bob)).to.equal(false)
      }
    })
  })

  describe('getStoreOwners', () => {
    beforeEach( async () => {
      await onlineMarket.addAdmin(alice)
      await onlineMarket.addStoreOwner(bob, {from: alice})
    })

    it("returns store owners' addresses", async () => {
      const owners = await onlineMarket.getStoreOwners()

      expect(owners).to.have.lengthOf(1)
      expect(owners[0]).to.equal(bob)
    })
  })

  describe('getRole', () => {
    const shopper = '0x1234567890123456789012345678901234567890'

    beforeEach( async () => {
      await onlineMarket.addAdmin(alice)
      await onlineMarket.addStoreOwner(bob, {from: alice})
    })

    it("returns a role", async () => {
      expect(await onlineMarket.getRole({from: alice})).to.equal('Admin')
      expect(await onlineMarket.getRole({from: bob})).to.equal('StoreOwner')
      expect(await onlineMarket.getRole({from: shopper})).to.equal('Shopper')
    })
  })

  describe('setStoreTitle', () => {
    beforeEach( async () => {
      await onlineMarket.addAdmin(alice)
      await onlineMarket.addStoreOwner(bob, {from: alice})
    })

    it("updates the store title", async () => {
      let result = await onlineMarket.getStore(bob)
      expect(result[0]).to.equal(bob)
      expect(result[1]).to.equal('')
      expect(result[2].toString(10)).to.equal('0')

      await onlineMarket.setStoreTitle('awesome store', {from: bob})
      result = await onlineMarket.getStore(bob)
      expect(result[0]).to.equal(bob)
      expect(result[1]).to.equal('awesome store')
      expect(result[2].toString(10)).to.equal('0')
    })

    it('does not add when a user is not a store owner', async () => {
      try {
        await onlineMarket.setStoreTitle('awesome store', {from: alice})

        assert.equal(false, true, 'it was expected to be reverted')
      } catch (e) {
        expect(true).to.equal(true)
      }
    })
  })

  describe('addItem', () => {
    beforeEach( async () => {
      await onlineMarket.addAdmin(alice)
      await onlineMarket.addStoreOwner(bob, {from: alice})
    })

    it("adds a new item", async () => {
      let itemId
      let storeOwner
      let eventEmitted = false

      const event = onlineMarket.ItemCreated()
      await event.watch((err, res) => {
        storeOwner = res.args.storeOwner
        itemId = res.args.id.toString(10)
        eventEmitted = true
      })

      await onlineMarket.addItem('good shoes', 1, {from: bob})

      expect(eventEmitted).to.equal(true)
      expect(storeOwner).to.equal(bob)

      const item = await onlineMarket.fetchItem.call(bob, itemId)
      expect(item[0].toString(10)).to.equal(itemId)
      expect(item[1]).to.equal('good shoes')
      expect(item[2].toString(10)).to.equal('1')
      expect(item[3]).to.equal('ForSale')

      const result = await onlineMarket.getStore(bob)
      expect(result[0]).to.equal(bob)
      expect(result[1]).to.equal('')
      expect(result[2].toString(10)).to.equal('1')
    })
  })

  describe('buyItem', () => {
    let shopper;
    let price;
    let itemId;

    beforeEach( async () => {
      shopper = web3.eth.accounts[3]
      price = web3.toWei(1, "ether")

      await onlineMarket.addAdmin(alice)
      await onlineMarket.addStoreOwner(bob, {from: alice})
      await onlineMarket.addItem('good shoes', price, {from: bob})
    })

    it("purchases an item", async () => {
      const shopperBalanceBefore = await web3.eth.getBalance(shopper).toNumber()
      const storeOwnerBalanceBefore = await web3.eth.getBalance(bob).toNumber()

      let storeOwner
      let eventEmitted = false

      const event = onlineMarket.ItemPurchased()
      await event.watch((err, res) => {
        storeOwner = res.args.storeOwner
        itemId = res.args.id.toString(10)
        eventEmitted = true
      })

      await onlineMarket.buyItem(bob, 0, {from: shopper, value: price})

      expect(eventEmitted).to.equal(true)
      const shopperBalanceAfter = await web3.eth.getBalance(shopper).toNumber()
      const storeOwnerBalanceAfter = await web3.eth.getBalance(bob).toNumber()

      expect(storeOwnerBalanceBefore + parseInt(price, 10)).to.equal(storeOwnerBalanceAfter);
      expect(shopperBalanceBefore - price).to.above(shopperBalanceAfter);

      const item = await onlineMarket.fetchItem(bob, itemId, {from: shopper})
      expect(item[0].toString(10)).to.equal(itemId.toString())
      expect(item[1]).to.equal('good shoes')
      expect(item[2].toString(10)).to.equal(price)
      expect(item[3]).to.equal('SoldByMe')
    })
  })
})
