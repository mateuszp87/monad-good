import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ganache from 'ganache';
import {createRewardsClient,encodeRewardCall} from '../dist/reward-client.js';
const artifact=JSON.parse(readFileSync(new URL('../dist/reward-contract.json',import.meta.url),'utf8'));
test('actual contract enforces course approval, claim ownership, duplicate protection and non-cash points',async t=>{
 const provider=ganache.provider({logging:{quiet:true},chain:{chainId:10143,hardfork:'shanghai'},wallet:{totalAccounts:3}});t.after(()=>provider.disconnect());const [owner,golfer,other]=await provider.request({method:'eth_accounts',params:[]}),receipts=[];
 const client=account=>createRewardsClient({provider,artifact,account,onPending:hash=>receipts.push(hash),sleep:async()=>{}}),course=client(owner),player=client(golfer),stranger=client(other),round='0x'+'1'.repeat(64);
 const deployment=await course.deploy(),address=deployment.contractAddress;
 assert.equal((await player.snapshot(address,round)).points,'0');
 await assert.rejects(()=>player.claim(address,round),/approval/i);
 await assert.rejects(()=>stranger.approve(address,round,golfer),/owner/i);
 // Attempt the forbidden operation directly too, so protection is tested in bytecode.
 await assert.rejects(()=>provider.request({method:'eth_estimateGas',params:[{from:other,to:address,data:encodeRewardCall(artifact,'approveRound(bytes32,address)',[round,golfer])}]}));
 await course.approve(address,round,golfer);assert.equal((await player.snapshot(address,round)).approved,true);
 const claim=await player.claim(address,round);assert.equal(claim.status,'0x1');const state=await player.snapshot(address,round);assert.equal(state.claimed,true);assert.equal(state.points,'100');assert.equal((await stranger.snapshot(address,round)).points,'0');
 await assert.rejects(()=>player.claim(address,round),/already claimed/i);
 await assert.rejects(()=>provider.request({method:'eth_estimateGas',params:[{from:golfer,to:address,data:encodeRewardCall(artifact,'claim(bytes32)',[round])}]}));
 await assert.rejects(()=>provider.request({method:'eth_estimateGas',params:[{from:owner,to:address,value:'0x1'}]}));
 assert.equal(receipts.length,3);assert.equal(await provider.request({method:'eth_getBalance',params:[address,'latest']}),'0x0');
});
test('wallet client refuses wrong chains and changed accounts before opening a transaction',async()=>{const account='0x'+'1'.repeat(40),calls=[],provider={request:async({method})=>{calls.push(method);return method==='eth_chainId'?'0x1':[];}};await assert.rejects(()=>createRewardsClient({provider,artifact,account}).deploy(),/Testnet only/);assert.ok(!calls.includes('eth_sendTransaction'));provider.request=async({method})=>{calls.push(method);return method==='eth_chainId'?'0x279f':[];};await assert.rejects(()=>createRewardsClient({provider,artifact,account}).deploy(),/account changed/);assert.ok(!calls.includes('eth_sendTransaction'));});
test('contract itself rejects deployment on another chain',async t=>{const provider=ganache.provider({logging:{quiet:true},chain:{chainId:1337}});t.after(()=>provider.disconnect());const [from]=await provider.request({method:'eth_accounts',params:[]});await assert.rejects(()=>provider.request({method:'eth_estimateGas',params:[{from,data:artifact.bytecode}]}));});
test('a pending or reverted receipt is never reported as a successful reward',async()=>{const account='0x'+'1'.repeat(40),hash='0x'+'a'.repeat(64);let status=null;const provider={request:async({method})=>method==='eth_chainId'?'0x279f':method==='eth_accounts'?[account]:status},client=createRewardsClient({provider,artifact,account,attempts:1,sleep:async()=>{}});await assert.rejects(()=>client.wait(hash),/still pending/);status={status:'0x0'};await assert.rejects(()=>client.wait(hash),/reverted/);await assert.rejects(()=>client.wait('not-a-hash'),/valid transaction hash/);});
