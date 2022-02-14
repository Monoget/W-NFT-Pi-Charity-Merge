const SmartContract = artifacts.require("NumberPiTest");

module.exports = function (deployer) {
    deployer.deploy(SmartContract, "thepicharityclub", "Pi", "ipfs://QmSZQrz1jxjaqM4ZcWDUWymDuo276ivXMe3Su9pw3prABC/", "ipfs://QmXSzECKKoTSESFVsx1cwtEovBwWovGAUtwHRBijMJGjZB/hidden_pi_metadata.json");
};
