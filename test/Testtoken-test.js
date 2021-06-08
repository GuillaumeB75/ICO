
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { expect } = require('chai');

describe('Testtoken', async function () {
  let dev, owner, Testtoken, testtoken;
  const NAME = 'Testtoken';
  const SYMBOL = 'TET';
  const INIT_SUPPLY = ethers.utils.parseEther('10000000000');
  beforeEach(async function () {
    [dev, owner] = await ethers.getSigners();
    Testtoken = await ethers.getContractFactory('Testtoken');
    testtoken = await Testtoken.connect(dev).deploy(owner.address, INIT_SUPPLY);
    await testtoken.deployed();
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
});
