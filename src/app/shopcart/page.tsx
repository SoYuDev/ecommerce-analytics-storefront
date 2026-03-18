import Header from '@/components/Header';
import Searchbar from '@/components/Searchbar';
import ShoppingCartContainer from '@/components/shoppingCart/ShoppingCartContainer';
import Footer from '@/components/Footer';
export default function CartPage() {
  return (
    <main>
      <Header></Header>
      <Searchbar></Searchbar>
      <ShoppingCartContainer></ShoppingCartContainer>
      <Footer></Footer>
    </main>
  );
}
