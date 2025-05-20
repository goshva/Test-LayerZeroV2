const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('SimpleOFT', () => {
  let SimpleOFT, oft, owner, user, lzEndpoint;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const MockLzEndpoint = await ethers.getContractFactory('MockLzEndpoint');
    lzEndpoint = await MockLzEndpoint.deploy();
    SimpleOFT = await ethers.getContractFactory('SimpleOFT');
    oft = await SimpleOFT.deploy('SimpleOFT', 'OFT', lzEndpoint.address);
  });

  it('should mint tokens', async () => {
    await oft.mint(user.address, ethers.utils.parseEther('100'));
    expect(await oft.balanceOf(user.address)).to.equal(ethers.utils.parseEther('100'));
  });

  it('should send tokens cross-chain', async () => {
    await oft.mint(user.address, ethers.utils.parseEther('100'));
    const amount = ethers.utils.parseEther('10');
    const dstChainId = 10160; // Base
    const receiver = ethers.utils.hexZeroPad(user.address, 32);

    await expect(oft.connect(user).send(amount, dstChainId, receiver, { value: ethers.utils.parseEther('0.01') }))
      .to.emit(oft, 'Bridged')
      .withArgs(user.address, amount, dstChainId);

    expect(await oft.balanceOf(user.address)).to.equal(ethers.utils.parseEther('90'));
  });

  it('should revert on invalid amount', async () => {
    await expect(oft.connect(user).send(0, 10160, ethers.utils.hexZeroPad(user.address, 32)))
      .to.be.revertedWith('Invalid amount');
  });

  it('should revert on insufficient balance', async () => {
    const amount = ethers.utils.parseEther('100');
    await expect(oft.connect(user).send(amount, 10160, ethers.utils.hexZeroPad(user.address, 32)))
      .to.be.revertedWith('Insufficient balance');
  });

  it('should set new endpoint', async () => {
    const newEndpoint = ethers.Wallet.createRandom().address;
    await oft.setLzEndpoint(newEndpoint);
    expect(await oft.lzEndpoint()).to.equal(newEndpoint);
  });

  it('should revert on invalid endpoint', async () => {
    await expect(oft.setLzEndpoint(ethers.constants.AddressZero)).to.be.revertedWith('Invalid endpoint');
  });
});