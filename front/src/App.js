import Home from './pages/Home';
import TeamPage from './pages/TeamPage';
import NavBarLandingPage from './components/NavBarLandingPage';
import FooterLandingPage from './components/FooterLandingPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AnimateBackground from './components/AnimateBackground';
import PageNotFound from './pages/PageNotFound';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {

  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById('spinner_onload');

  if (spinner) {
    setTimeout(() => {
      document.querySelector(".container_onload").classList.add("fade_out");
      spinner.style.display = 'none';
      setLoading(false);
      document.querySelector(".body").classList.add("fade_in");
    }, 2000)
  }

  return (

    !loading && (
      <BrowserRouter>
        <NavBarLandingPage />
        <AnimateBackground />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/test' element={<Test />} />
          <Route path='/team' element={<TeamPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <FooterLandingPage />

      </BrowserRouter>

    )
  );
};

export default App;