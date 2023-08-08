import Navbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';
import ClosedReceipts from '../../components/ClosedReceipts';

const ClosedTransactionsTable = () => {
  return (
    <div>
        <Navbar />
        <ClosedReceipts/>
        <Footer />
    </div>
  )
}

export default ClosedTransactionsTable