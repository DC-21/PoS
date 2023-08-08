import Navbar from '../../components/AdminNavbar';
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