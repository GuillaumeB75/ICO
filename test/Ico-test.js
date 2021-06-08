/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { expect } = require('chai');

describe('Testtoken', async function () {
  let dev, owner, alice, Testtoken, testtoken, Ico, ico;
  const NAME = 'Testtoken';
  const SYMBOL = 'TET';
  const INIT_SUPPLY = ethers.utils.parseEther('10000000000');
  const ICO_START_TIME = 1623102077;
  const ICO_END_TIME = 1623102077;
  const RATE = 10 ** 9;
  beforeEach(async function () {
    [dev, owner, alice, ico] = await ethers.getSigners();
    Testtoken = await ethers.getContractFactory('Testtoken');
    testtoken = await Testtoken.connect(dev).deploy(owner.address, INIT_SUPPLY);
    await testtoken.deployed();

    Ico = await ethers.getContractFactory('Ico');
    ico = await Ico.connect(owner).deploy(testtoken.address, ICO_START_TIME, ICO_END_TIME, RATE);
    await ico.deployed();
    await testtoken.connect(owner).approve(ico.address, INIT_SUPPLY);
  });

  it(`Should have name ${NAME}`, async function () {
    expect(await testtoken.name()).to.equal(NAME);
  });
  it(`Should have name ${SYMBOL}`, async function () {
    expect(await testtoken.symbol()).to.equal(SYMBOL);
  });
  it(`Should have total supply ${INIT_SUPPLY.toString()}`, async function () {
    expect(await testtoken.totalSupply()).to.equal(INIT_SUPPLY);
  });
  it(`Should mint initial supply ${INIT_SUPPLY.toString()} to owner`, async function () {
    expect(await testtoken.balanceOf(owner.address)).to.equal(INIT_SUPPLY);
  });

  describe('ICO INIT-SUPPY', async function () {
    it('Should approve the Ico contract to transfer testtoken Owner funds.', async function () {
      expect(await testtoken.allowance(owner.address, ico.address)).to.be.equal(INIT_SUPPLY);
    });
  });
});
