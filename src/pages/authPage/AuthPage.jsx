import React, { useContext } from 'react';
import ModalContext from '../../context/Modal/ModalContext';
import { SIGNUP_MODAL, LOGIN_MODAL } from '../../context/Modal/ModalType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classes from './AuthPage.module.scss';

const AuthPage = () => {
	const modalContext = useContext(ModalContext);
	const { setModal } = modalContext;
	const [navBar, setNavBar] = useState(false);

	const openSignupModal = () => {
		setModal(SIGNUP_MODAL);
	};

	const openLoginModal = () => {
		setModal(LOGIN_MODAL);
	};

	console.log('I will render');

	return (
		<div className={classes.HomeContainer}>
			<div className={classes.Navbar}>
				<div className={classes.InnerNav}>
					<div className={classes.Left}>
						<div className={classes.Logo}>
							<span className={classes.FirstLogo}>1KbI</span>
							<span className={classes.SecondLogo}>deas.</span>
						</div>
					</div>

					<div>
						<FontAwesomeIcon icon={faBars} size='2x' color='orange' />
						<a className={classes.Signup} onClick={openSignupModal}>
							Signup
						</a>
						<a className={classes.Login} onClick={openLoginModal}>
							Login
						</a>
					</div>
				</div>
			</div>

			{/* <div className={classes.FirstLayer}>
				<div className={classes.FirstLayerContent}>
					<div className={classes.FirstLayerLeft}>
						<p className={classes.TopInfo}>
							The one-stop shop for all the self-help ideas you need
						</p>
						<p className={classes.BottomInfo}>Write and share your stories</p>
						<div className={classes.ButtonContainer}>
							<button className={classes.Join}>Join 1kbIdeas</button>
							<button className={classes.SignIn}> Sign in</button>
						</div>
						<div className={classes.Exploring}>
							<span className={classes.Explore}>Explore amazing topics</span>
							<img src='/src/images/arrow_down.svg' />
						</div>
					</div>
					<div className={classes.FirstLayerRight} />
				</div>
			</div>
			<div className={classes.SecondLayer}>
				<p className={classes.StartExploring}>Explore amazing topics</p>
				<p className={classes.Curated}>
					Curated stories based on your preference
				</p>
			</div> */}
		</div>
	);
};

export default AuthPage;
