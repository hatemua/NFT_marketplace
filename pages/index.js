
import Banner from '../components/Banner';
import Category from '../components/Category';
import TopCollectors from '../components/TopCollectors';
import PopularCollection from '../components/PopularCollection';
import SellCard from '../components/SellCard';
import Web3Domain from '../components/Web3Domain';
import LiveAuction from '../components/LiveAuction';

const isMetaMaskInstalled = () =>{
  if(ethereum){
      return true;
  }
  return false;
}
const disconnectWallet = () =>{
  localStorage.removeItem('isWalletConnected');
  window.location.reload();
}
const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <LiveAuction /> 
      <SellCard /> 
      <Web3Domain />
       <PopularCollection /> 
       <TopCollectors />  
    </div>
  )
}

export default Home
