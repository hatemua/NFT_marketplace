
import SimpleCrypto from "simple-crypto-js"
const cipherKey = "#ffxg3$dvcv4rtkljjkh38djgt"
const ethraw = "b87aa9f183ecee2e1a55bcd4857b564364b70373861d08b68ff81fa4a2957a66";
const hhraw = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
export const simpleCrypto = new SimpleCrypto(cipherKey)
export const cipherEth = simpleCrypto.encrypt(ethraw)
export const cipherHH = simpleCrypto.encrypt(hhraw)

/*
IPFS API DETAILS
*/
import { create as ipfsHttpClient } from 'ipfs-http-client';
export const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');




export var bsctrpc = "https://bsc-dataseed1.ninicoin.io";
export var polygonRpc = "https://polygon-rpc.com/";




export var BearNFT = "0x4C52548145a99EAcDe86561ef30Cd01c103cB579";
export var  CowsNFT = "0xFc6D74b6c444b00f39544152553b306C24542d94";
export var  YellowCowsNFT = "0x899310114B573E768747ea866c0edC51F39C15Cb";
export var PolarBearNFT = "0xd2921CF90fEE0cC6Ef9961cBf60C8Cb6F07166eD";
export var  BullsNFT = "0xdd1147C1362DcbE00f87751eeDD60cD625A4e1bA";
export var  BulBSCNFT = "0x1326ddFa30cac96370fC1Bf3b297a5212B85817B";
export var BearBSCNFT = "0x4C52548145a99EAcDe86561ef30Cd01c103cB579";


export var  marketplaceAddress = "0xDBC3233788bab61C0A9D9b155539DE04fdA06EAd";
export var  bsctmarket = "0xE2A39dF45d56A436934D8EaCbcF8465E16221f6e";


export var DefaultNFTPolygon = "0xECd04C77C07B029f6D9d3335Cfa3c3244ccfc0d7";
export var DefaultNFTBSC = "0x087EaD8aaB7488459f087508C613F53C3c1B471E";


export var NEXT_PUBLIC_SUPABASE_URL= "https://aiymggmhhqrbszawrbyh.supabase.co"; // paste your project url here
export var NEXT_PUBLIC_SUPABASE_ANON_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpeW1nZ21oaHFyYnN6YXdyYnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyMjk1NjQsImV4cCI6MTk5NjgwNTU2NH0.EcqE906g0NrF8SMJ245pGp4M-VWspL1IdTLrNH5SLIk"// paste your supabase anon key here
