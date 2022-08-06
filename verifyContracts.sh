cd ./contracts
npx hardhat verify --network local 0x587e32dB64b9095607B3266D3Abf5748307fF621
npx hardhat verify --network local 0x500F35EC7A17EF2634E76fe7F588947DdE6E2c91 "0x587e32dB64b9095607B3266D3Abf5748307fF621" "0x0000000000000000000000000000000000000000"
npx hardhat verify --network local 0x22cf418C54ADd1795e98dADdF6B2A4f59D5418c6 "0x587e32dB64b9095607B3266D3Abf5748307fF621" "0x2a6593f35bce7cc7506acc61c4db41aeafcf19072e7ac26cbc169af1907c11ca"
npx hardhat verify --contract @ensdomains/ens-contracts/contracts/registry/ReverseRegistrar.sol:ReverseRegistrar --network local 0x125cBc0Cd0c80086cebAbBBE82B4108396a68d25 "0x587e32dB64b9095607B3266D3Abf5748307fF621" "0x500F35EC7A17EF2634E76fe7F588947DdE6E2c91"