/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const { expect } = require('chai');
describe('Testtoken2', function () {
  let Testtoken2, testtoken2, ICO2, ico2, dev, owner, alice, bob, eve;
  const NAME = 'testtoken2';
  const NAME_ICO2 = 'ICO2';
  const SYMBOL = 'TT';
  const INITIAL_SUPPLY = ethers.utils.parseEther('4000000000');
  this.beforeEach(async function () {
    [dev, owner, alice, bob, eve] = await ethers.getSigners();
    Testtoken2 = await ethers.getContractFactory('Testtoken2');
    testtoken2 = await Testtoken2.connect(dev).deploy(NAME, SYMBOL, INITIAL_SUPPLY);
    await testtoken2.deployed();
  });
  describe('Deployment', function () {
    it('Test deploy ownable event', async function () {
      await expect(testtoken2.deployTransaction)
        .to.emit(testtoken2, 'OwnershipTransferred')
        .withArgs(ethers.constants.AddressZero, dev.address);
    });
  });
  describe('Functions', function () {
    describe('owner', function () {
      it('Should return owner', async function () {
        expect(await testtoken2.owner()).to.equal(dev.address);
      });
    });
    describe('totalSupply', function () {
      it('Should return totalSupply', async function () {
        expect(await testtoken2.totalSupply()).to.equal(ethers.utils.parseEther('4000000000'));
      });
    });
    describe('balanceOf', function () {
      it('Should return balance of owner', async function () {
        expect(await testtoken2.connect(dev).balanceOf(dev.address)).to.equal(ethers.utils.parseEther('4000000000'));
      });
    });
  });
});
