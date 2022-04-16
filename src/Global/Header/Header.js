import Logo from "./Logo/Logo";
import Bar from "./Bar/Bar";
import "./Header.css"

function Header(props) {
	return (
		<div id="Header">
			<div id="Logo"><Logo pageName={props.signed}/></div>
			<div id="Bar"><Bar {...props}/></div>
		</div>
	);
}

export default Header;