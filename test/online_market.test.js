const OnlineMarket = artifacts.require('OnlineMarket')

contract('OnlineMarket', (accounts) => {
  const owner = accounts[0]
  const alice = accounts[1]
  const bob = accounts[2]
  const user1 = '0x1234567890123456789012345678901234567890'

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
    beforeEach( async () => {
      await onlineMarket.addAdmin(alice)
      await onlineMarket.addStoreOwner(bob, {from: alice})
    })

    it("returns a role", async () => {
      expect(await onlineMarket.getRole({from: alice})).to.equal('Admin')
      expect(await onlineMarket.getRole({from :bob})).to.equal('StoreOwner')
      expect(await onlineMarket.getRole({from: user1})).to.equal('Shopper')
    })
  })

  describe('setStoreTitle', () => {
    beforeEach( async () => {
      await onlineMarket.addAdmin(alice)
      await onlineMarket.addStoreOwner(bob, {from: alice})
    })

    it("updates the store title", async () => {
      expect(await onlineMarket.getStoreTitle({from: bob})).to.equal('')
      await onlineMarket.setStoreTitle('awesome store', {from: bob})
      expect(await onlineMarket.getStoreTitle({from: bob})).to.equal('awesome store')
    })
  })
})
