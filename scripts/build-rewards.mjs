import {readFileSync,writeFileSync} from 'node:fs';
import solc from 'solc';
const input={language:'Solidity',sources:{'DemoPaceRewards.sol':{content:readFileSync(new URL('../contracts/DemoPaceRewards.sol',import.meta.url),'utf8')}},settings:{optimizer:{enabled:true,runs:200},evmVersion:'paris',outputSelection:{'*':{'*':['abi','evm.bytecode.object','evm.deployedBytecode.object','evm.methodIdentifiers']}}}};
const output=JSON.parse(solc.compile(JSON.stringify(input)));
for(const error of output.errors||[])if(error.severity==='error')throw new Error(error.formattedMessage);
const c=output.contracts['DemoPaceRewards.sol'].DemoPaceRewards;
const artifact={name:'DemoPaceRewards',compiler:solc.version(),evmVersion:'paris',chainId:10143,abi:c.abi,bytecode:'0x'+c.evm.bytecode.object,runtimeBytecode:'0x'+c.evm.deployedBytecode.object,selectors:c.evm.methodIdentifiers};
const path=new URL('../dist/reward-contract.json',import.meta.url),content=JSON.stringify(artifact,null,2)+'\n';
if(process.argv.includes('--check')){if(readFileSync(path,'utf8')!==content)throw new Error('Reward artifact is stale; run npm run build:rewards');console.log('Reward artifact matches source');}else{writeFileSync(path,content);console.log('Built testnet reward artifact');}
