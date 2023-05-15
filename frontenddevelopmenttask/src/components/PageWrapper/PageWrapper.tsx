import '../../style/PageBackground.css';

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC <PageWrapperProps> = ({children}) => {
  return (
    <div className="App">
        {children}
    </div>
  );
};

export default PageWrapper;