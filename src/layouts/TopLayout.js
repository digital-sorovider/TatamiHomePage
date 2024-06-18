import Footer from '@components/Footer';

const TopLayout = ({ children }) => {
    return (
        <>
            { children }
            <Footer />
        </>
    )
}

export default TopLayout